import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { builder } from '../builder.js'
import { prisma } from '../prisma.js'
import { DateTimeScalar } from './scalars.js'

/** Represents an article, published by a member of a club. */
export const ArticleType = builder.prismaObject('Article', {
  fields: (t) => ({
    id: t.exposeID('id'),
    authorId: t.exposeID('authorId', { nullable: true }),
    clubId: t.exposeID('clubId'),
    title: t.exposeString('title'),
    body: t.exposeString('body'),
    bodyHtml: t.string({
      resolve: async ({ body }) =>
        unified()
          .use(remarkParse)
          // Downlevel titles (h1 -> h3)
          .use(() => ({ children }) => {
            for (const child of children) {
              if (child.type === 'heading')
                child.depth = Math.min(child.depth + 2, 6) as 3 | 4 | 5 | 6
            }
          })
          .use(remarkRehype)
          .use(rehypeSanitize)
          .use(rehypeStringify)
          .process(body)
          .then(String),
    }),
    published: t.exposeBoolean('published'),
    createdAt: t.expose('createdAt', { type: DateTimeScalar }),
    publishedAt: t.expose('publishedAt', { type: DateTimeScalar }),
    author: t.relation('author', { nullable: true }),
    club: t.relation('club'),
  }),
})

/** Returns a list of articles from the clubs the user is in. */
builder.queryField('homepage', (t) =>
  t.prismaField({
    type: [ArticleType],
    args: {
      first: t.arg.int({ required: false }),
      after: t.arg.id({ required: false }),
    },
    async resolve(query, _, { first, after }, { user }) {
      first ??= 20
      if (!user) {
        return prisma.article.findMany({
          ...query,
          // Pagination
          cursor: after ? { id: after } : undefined,
          skip: after ? 1 : 0,
          take: first,
          // Only public articles
          where: { published: true, homepage: true },
          orderBy: { publishedAt: 'desc' },
        })
      }

      return prisma.article.findMany({
        ...query,
        // Pagination
        cursor: after ? { id: after } : undefined,
        skip: after ? 1 : 0,
        take: first,
        where: {
          published: true,
          OR: [
            { homepage: true },
            // Show articles from clubs whose user is a member
            { club: { members: { some: { memberId: user.id } } } },
          ],
        },
        orderBy: { publishedAt: 'desc' },
      })
    },
  })
)

/** Inserts a new article. */
builder.mutationField('createArticle', (t) =>
  t.prismaField({
    type: ArticleType,
    args: {
      clubId: t.arg.id(),
      title: t.arg.string(),
      body: t.arg.string(),
    },
    authScopes: (_, { clubId }, { user }) =>
      Boolean(
        user?.canEditClubs ||
          user?.clubs.some(({ clubId: id, canEditArticles }) => canEditArticles && clubId === id)
      ),
    resolve: (query, _, { clubId, body, title }, { user }) =>
      prisma.article.create({
        ...query,
        data: {
          clubId,
          authorId: user!.id,
          title,
          body,
        },
      }),
  })
)
