-- AlterTable
ALTER TABLE
    "Announcement"
ALTER COLUMN
    "id"
SET
    DEFAULT nanoid('ann:');

-- AlterTable
ALTER TABLE
    "Answer"
ALTER COLUMN
    "id"
SET
    DEFAULT nanoid('answer:');

-- AlterTable
ALTER TABLE
    "Article"
ALTER COLUMN
    "id"
SET
    DEFAULT nanoid('a:');

-- AlterTable
ALTER TABLE
    "Bookmark"
ALTER COLUMN
    "id"
SET
    DEFAULT nanoid('bookmark:');

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
    DEFAULT nanoid('emailchange:'),
ALTER COLUMN
    "token"
SET
    DEFAULT nanoid('', 30);

-- AlterTable
ALTER TABLE
    "Event"
ALTER COLUMN
    "id"
SET
    DEFAULT nanoid('e:');

-- AlterTable
ALTER TABLE
    "EventManager"
ALTER COLUMN
    "id"
SET
    DEFAULT nanoid('em:');

-- AlterTable
ALTER TABLE
    "Form"
ALTER COLUMN
    "id"
SET
    DEFAULT nanoid('form:');

-- AlterTable
ALTER TABLE
    "FormJump"
ALTER COLUMN
    "id"
SET
    DEFAULT nanoid('formjump:');

-- AlterTable
ALTER TABLE
    "FormSection"
ALTER COLUMN
    "id"
SET
    DEFAULT nanoid('formsection:');

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
    "Page"
ALTER COLUMN
    "id"
SET
    DEFAULT nanoid('page:');

-- AlterTable
ALTER TABLE
    "PasswordReset"
ALTER COLUMN
    "id"
SET
    DEFAULT nanoid('passreset:');

-- AlterTable
ALTER TABLE
    "PaypalTransaction"
ALTER COLUMN
    "id"
SET
    DEFAULT nanoid('paypalpayment:');

-- AlterTable
ALTER TABLE
    "Promotion"
ALTER COLUMN
    "id"
SET
    DEFAULT nanoid('promo:');

-- AlterTable
ALTER TABLE
    "PromotionCode"
ALTER COLUMN
    "id"
SET
    DEFAULT nanoid('promocode:');

-- AlterTable
ALTER TABLE
    "Question"
ALTER COLUMN
    "id"
SET
    DEFAULT nanoid('question:');

-- AlterTable
ALTER TABLE
    "QuickSignup"
ALTER COLUMN
    "id"
SET
    DEFAULT nanoid('quicksignup:', 6);

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
ADD
    COLUMN "authorFullName" VARCHAR(255) NOT NULL DEFAULT '',
ADD
    COLUMN "internalBeneficiaryFullName" VARCHAR(255) NOT NULL DEFAULT '',
ALTER COLUMN
    "id"
SET
    DEFAULT nanoid('r:');

-- Add a trigger to keep these two columns up to date
CREATE
OR REPLACE FUNCTION update_registration_fuzzy_search_columns() RETURNS TRIGGER AS $$
DECLARE
    author_firstName text := '';

author_lastName text := '';

internalbeneficiary_firstName text := '';

internalbeneficiary_lastName text := '';

BEGIN
    author_firstName := (
        SELECT
            "firstName"
        FROM
            "User"
        WHERE
            "User"."id" = NEW."authorId"
    );

author_lastName := (
    SELECT
        "lastName"
    FROM
        "User"
    WHERE
        "User"."id" = NEW."authorId"
);

internalbeneficiary_firstName := (
    SELECT
        "firstName"
    FROM
        "User"
    WHERE
        "User"."id" = NEW."internalBeneficiaryId"
);

internalbeneficiary_lastName := (
    SELECT
        "lastName"
    FROM
        "User"
    WHERE
        "User"."id" = NEW."internalBeneficiaryId"
);

NEW."authorFullName" := author_firstName || ' ' || author_lastName;

NEW."internalBeneficiaryFullName" := internalbeneficiary_firstName || ' ' || internalbeneficiary_lastName;

RETURN NEW;

END $$ LANGUAGE plpgsql;

CREATE TRIGGER update_registration_fuzzy_search_columns_trigger before
INSERT
    OR
UPDATE
    ON "Registration" FOR EACH ROW EXECUTE PROCEDURE update_registration_fuzzy_search_columns();




-- AlterTable
ALTER TABLE
    "School"
ALTER COLUMN
    "id"
SET
    DEFAULT nanoid('school:'),
ALTER COLUMN
    "aliasMailDomains"
SET
    DEFAULT ARRAY [ ] :: VARCHAR(255) [ ];

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
    "Theme"
ALTER COLUMN
    "id"
SET
    DEFAULT nanoid('theme:');

-- AlterTable
ALTER TABLE
    "ThemeValue"
ALTER COLUMN
    "id"
SET
    DEFAULT nanoid('themeval:');

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
