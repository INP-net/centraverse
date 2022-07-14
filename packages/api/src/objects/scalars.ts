import { GraphQLYogaError } from '@graphql-yoga/node'
import { DateTimeResolver } from 'graphql-scalars'
import { builder } from '../builder.js'

export const DateTimeScalar = builder.addScalarType('DateTime', DateTimeResolver, {})

export const FileScalar = builder.scalarType('File', {
  serialize() {
    throw new GraphQLYogaError('File cannot be serialized')
  },
})
