-- AlterTable
ALTER TABLE
	"Announcement"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('ann:');

-- AlterTable
ALTER TABLE
	"Article"
ADD
	COLUMN "search" tsvector NOT NULL DEFAULT '' :: tsvector,
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('a:');

-- AlterTable
ALTER TABLE
	"BarWeek"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('barweek:');

-- AlterTable
ALTER TABLE
	"Comment"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('comment:');

-- AlterTable
ALTER TABLE
	"Contribution"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('contribution:');

-- AlterTable
ALTER TABLE
	"ContributionOption"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('contributionoption:');

-- AlterTable
ALTER TABLE
	"Credential"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('credential:');

-- AlterTable
ALTER TABLE
	"Document"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('doc:');

-- AlterTable
ALTER TABLE
	"EmailChange"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('emailchange:');

-- AlterTable
ALTER TABLE
	"Event"
ADD
	COLUMN "search" tsvector NOT NULL DEFAULT '' :: tsvector,
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('e:');

-- AlterTable
ALTER TABLE
	"GodparentRequest"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('godparentreq:');

-- AlterTable
ALTER TABLE
	"Group"
ADD
	COLUMN "search" tsvector NOT NULL DEFAULT '' :: tsvector,
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('g:');

-- AlterTable
ALTER TABLE
	"Link"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('link:');

-- AlterTable
ALTER TABLE
	"LogEntry"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('log:');

-- AlterTable
ALTER TABLE
	"LydiaAccount"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('lydia:');

-- AlterTable
ALTER TABLE
	"LydiaTransaction"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('lydiapayment:');

-- AlterTable
ALTER TABLE
	"Major"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('major:');

-- AlterTable
ALTER TABLE
	"Minor"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('minor:');

-- AlterTable
ALTER TABLE
	"Notification"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('notif:');

-- AlterTable
ALTER TABLE
	"NotificationSubscription"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('notifsub:');

-- AlterTable
ALTER TABLE
	"PasswordReset"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('passreset:');

-- AlterTable
ALTER TABLE
	"Reaction"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('reac:');

-- AlterTable
ALTER TABLE
	"Registration"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('r:');

-- AlterTable
ALTER TABLE
	"School"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('school:');

-- AlterTable
ALTER TABLE
	"Service"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('service:');

-- AlterTable
ALTER TABLE
	"StudentAssociation"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('ae:');

-- AlterTable
ALTER TABLE
	"Subject"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('subj:');

-- AlterTable
ALTER TABLE
	"TeachingUnit"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('ue:');

-- AlterTable
ALTER TABLE
	"Ticket"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('t:');

-- AlterTable
ALTER TABLE
	"TicketGroup"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('tg:');

-- AlterTable
ALTER TABLE
	"User"
ADD
	COLUMN "search" tsvector NOT NULL DEFAULT '' :: tsvector,
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('u:');

-- AlterTable
ALTER TABLE
	"UserCandidate"
ALTER COLUMN
	"id"
SET
	DEFAULT nanoid('candidate:');

-- CreateIndex
CREATE INDEX "Article_search_idx" ON "Article" USING GIN ("search");

-- CreateIndex
CREATE INDEX "Event_search_idx" ON "Event" USING GIN ("search");

-- CreateIndex
CREATE INDEX "Group_search_idx" ON "Group" USING GIN ("search");

-- CreateIndex
CREATE INDEX "User_search_idx" ON "User" USING GIN ("search");

-- See ../../../src/fulltextsearch.sql
---------------------------------
-- Generated columns & indexes --
---------------------------------
-- We can't have nice things since prisma breaks generated columns, see https://github.com/prisma/prisma/issues/15654
-- So we're using triggers instead.
-- This also allows us to query fields on tother tables, sth generated columns can't do.
--
-- Group
CREATE
OR replace FUNCTION update_group_search() returns TRIGGER AS $$ BEGIN
	NEW."search" := setweight(to_tsvector('english', NEW."name"), 'A') || setweight(to_tsvector('english', NEW."description"), 'B') || setweight(to_tsvector('english', NEW."email"), 'B') || setweight(to_tsvector('english', NEW."website"), 'C') || setweight(to_tsvector('english', NEW."uid"), 'D');

RETURN NEW;

END $$ LANGUAGE plpgsql;

CREATE TRIGGER update_group_search_trigger before
INSERT
	OR
UPDATE
	ON "Group" FOR each ROW EXECUTE PROCEDURE update_group_search();

-- User
-- drop the one generated by prisma
CREATE
OR replace FUNCTION update_user_search() returns TRIGGER AS $$
DECLARE
	major_short_name text := '';

BEGIN
	major_short_name := (
		SELECT
			"shortName"
		FROM
			"Major"
		WHERE
			"Major"."id" = NEW."majorId"
	);

NEW."search" := setweight(to_tsvector('english', NEW."lastName"), 'A') || setweight(to_tsvector('english', NEW."firstName"), 'A') || setweight(to_tsvector('english', NEW."nickname"), 'B') || setweight(to_tsvector('english', NEW."email"), 'B') || setweight(to_tsvector('english', NEW."phone"), 'B') || setweight(to_tsvector('english', NEW."uid"), 'C') || setweight(
	to_tsvector('english', NEW."graduationYear" :: text),
	'D'
) || setweight(
	to_tsvector('english', major_short_name),
	'D'
) || setweight(to_tsvector('english', NEW."description"), 'D');

RETURN NEW;

END $$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_search_trigger before
INSERT
	OR
UPDATE
	ON "User" FOR each ROW EXECUTE PROCEDURE update_user_search();

-- Event
-- drop the one generated by prisma
CREATE
OR replace FUNCTION update_event_search() returns TRIGGER AS $$
DECLARE
	group_name text := '';

co_organizers_names text := '';

BEGIN
	group_name := (
		SELECT
			"name"
		FROM
			"Group"
		WHERE
			"Group"."id" = NEW."groupId"
	);

co_organizers_names := (
	SELECT
		COALESCE(string_agg("name", ' '), '')
	FROM
		"Group"
		JOIN "_coOrganizer" ON "A" = NEW."id"
	WHERE
		"_coOrganizer"."B" = NEW."groupId"
);

NEW."search" := setweight(to_tsvector('english', NEW."title"), 'A') || setweight(to_tsvector('english', NEW."description"), 'B') || setweight(to_tsvector('english', group_name), 'C') || setweight(
	to_tsvector('english', co_organizers_names),
	'C'
) || setweight(to_tsvector('english', NEW."location"), 'D');

RETURN NEW;

END $$ LANGUAGE plpgsql;

CREATE TRIGGER update_event_search_trigger before
INSERT
	OR
UPDATE
	ON "Event" FOR each ROW EXECUTE PROCEDURE update_event_search();

-- Article
-- drop the one generated by prisma
CREATE
OR replace FUNCTION update_article_search() returns TRIGGER AS $$
DECLARE
	group_name text := '';

BEGIN
	group_name := (
		SELECT
			"name"
		FROM
			"Group"
		WHERE
			"Group"."id" = NEW."groupId"
	);

NEW."search" := setweight(to_tsvector('english', NEW."title"), 'A') || setweight(to_tsvector('english', NEW."body"), 'B') || setweight(to_tsvector('english', group_name), 'C');

RETURN NEW;

END $$ LANGUAGE plpgsql;

CREATE TRIGGER update_article_search_trigger before
INSERT
	OR
UPDATE
	ON "Article" FOR each ROW EXECUTE PROCEDURE update_article_search();
