/*
  Warnings:

  - You are about to drop the `Picture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShopItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShopItemAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShopItemOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShopPayment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PictureToShopItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LydiaTransaction" DROP CONSTRAINT "LydiaTransaction_shopPaymentId_fkey";

-- DropForeignKey
ALTER TABLE "ShopItem" DROP CONSTRAINT "ShopItem_groupId_fkey";

-- DropForeignKey
ALTER TABLE "ShopItem" DROP CONSTRAINT "ShopItem_lydiaAccountId_fkey";

-- DropForeignKey
ALTER TABLE "ShopItemAnswer" DROP CONSTRAINT "ShopItemAnswer_shopPaymentId_fkey";

-- DropForeignKey
ALTER TABLE "ShopItemOption" DROP CONSTRAINT "ShopItemOption_shopItemId_fkey";

-- DropForeignKey
ALTER TABLE "ShopPayment" DROP CONSTRAINT "ShopPayment_shopItemId_fkey";

-- DropForeignKey
ALTER TABLE "ShopPayment" DROP CONSTRAINT "ShopPayment_userId_fkey";

-- DropForeignKey
ALTER TABLE "_PictureToShopItem" DROP CONSTRAINT "_PictureToShopItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_PictureToShopItem" DROP CONSTRAINT "_PictureToShopItem_B_fkey";

-- AlterTable
ALTER TABLE "Announcement" ALTER COLUMN "id" SET DEFAULT nanoid('ann:');

-- AlterTable
ALTER TABLE "Answer" ALTER COLUMN "id" SET DEFAULT nanoid('answer:');

-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "id" SET DEFAULT nanoid('a:');

-- AlterTable
ALTER TABLE "Bookmark" ALTER COLUMN "id" SET DEFAULT nanoid('bookmark:');

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "id" SET DEFAULT nanoid('comment:');

-- AlterTable
ALTER TABLE "Contribution" ALTER COLUMN "id" SET DEFAULT nanoid('contribution:');

-- AlterTable
ALTER TABLE "ContributionOption" ALTER COLUMN "id" SET DEFAULT nanoid('contributionoption:');

-- AlterTable
ALTER TABLE "Credential" ALTER COLUMN "id" SET DEFAULT nanoid('credential:');

-- AlterTable
ALTER TABLE "Document" ALTER COLUMN "id" SET DEFAULT nanoid('doc:');

-- AlterTable
ALTER TABLE "EmailChange" ALTER COLUMN "id" SET DEFAULT nanoid('emailchange:'),
ALTER COLUMN "token" SET DEFAULT nanoid('', 30);

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "id" SET DEFAULT nanoid('e:');

-- AlterTable
ALTER TABLE "EventManager" ALTER COLUMN "id" SET DEFAULT nanoid('em:');

-- AlterTable
ALTER TABLE "Form" ALTER COLUMN "id" SET DEFAULT nanoid('form:');

-- AlterTable
ALTER TABLE "FormJump" ALTER COLUMN "id" SET DEFAULT nanoid('formjump:');

-- AlterTable
ALTER TABLE "FormSection" ALTER COLUMN "id" SET DEFAULT nanoid('formsection:');

-- AlterTable
ALTER TABLE "GodparentRequest" ALTER COLUMN "id" SET DEFAULT nanoid('godparentreq:');

-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "id" SET DEFAULT nanoid('g:');

-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "id" SET DEFAULT nanoid('link:');

-- AlterTable
ALTER TABLE "LogEntry" ALTER COLUMN "id" SET DEFAULT nanoid('log:');

-- AlterTable
ALTER TABLE "LydiaAccount" ALTER COLUMN "id" SET DEFAULT nanoid('lydia:');

-- AlterTable
ALTER TABLE "LydiaTransaction" ALTER COLUMN "id" SET DEFAULT nanoid('lydiapayment:');

-- AlterTable
ALTER TABLE "Major" ALTER COLUMN "id" SET DEFAULT nanoid('major:');

-- AlterTable
ALTER TABLE "Minor" ALTER COLUMN "id" SET DEFAULT nanoid('minor:');

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "id" SET DEFAULT nanoid('notif:');

-- AlterTable
ALTER TABLE "NotificationSubscription" ALTER COLUMN "id" SET DEFAULT nanoid('notifsub:');

-- AlterTable
ALTER TABLE "Page" ALTER COLUMN "id" SET DEFAULT nanoid('page:');

-- AlterTable
ALTER TABLE "PasswordReset" ALTER COLUMN "id" SET DEFAULT nanoid('passreset:');

-- AlterTable
ALTER TABLE "PaypalTransaction" ALTER COLUMN "id" SET DEFAULT nanoid('paypalpayment:');

-- AlterTable
ALTER TABLE "Promotion" ALTER COLUMN "id" SET DEFAULT nanoid('promo:');

-- AlterTable
ALTER TABLE "PromotionCode" ALTER COLUMN "id" SET DEFAULT nanoid('promocode:');

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "id" SET DEFAULT nanoid('question:');

-- AlterTable
ALTER TABLE "QuickSignup" ALTER COLUMN "id" SET DEFAULT nanoid('quicksignup:', 6);

-- AlterTable
ALTER TABLE "Reaction" ALTER COLUMN "id" SET DEFAULT nanoid('reac:');

-- AlterTable
ALTER TABLE "Registration" ALTER COLUMN "id" SET DEFAULT nanoid('r:');

-- AlterTable
ALTER TABLE "School" ALTER COLUMN "id" SET DEFAULT nanoid('school:'),
ALTER COLUMN "aliasMailDomains" SET DEFAULT ARRAY[]::VARCHAR(255)[];

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "id" SET DEFAULT nanoid('service:');

-- AlterTable
ALTER TABLE "StudentAssociation" ALTER COLUMN "id" SET DEFAULT nanoid('ae:');

-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "id" SET DEFAULT nanoid('subj:');

-- AlterTable
ALTER TABLE "TeachingUnit" ALTER COLUMN "id" SET DEFAULT nanoid('ue:');

-- AlterTable
ALTER TABLE "Theme" ALTER COLUMN "id" SET DEFAULT nanoid('theme:');

-- AlterTable
ALTER TABLE "ThemeValue" ALTER COLUMN "id" SET DEFAULT nanoid('themeval:');

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "id" SET DEFAULT nanoid('t:');

-- AlterTable
ALTER TABLE "TicketGroup" ALTER COLUMN "id" SET DEFAULT nanoid('tg:');

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT nanoid('u:');

-- AlterTable
ALTER TABLE "UserCandidate" ALTER COLUMN "id" SET DEFAULT nanoid('candidate:');

-- DropTable
DROP TABLE "Picture";

-- DropTable
DROP TABLE "ShopItem";

-- DropTable
DROP TABLE "ShopItemAnswer";

-- DropTable
DROP TABLE "ShopItemOption";

-- DropTable
DROP TABLE "ShopPayment";

-- DropTable
DROP TABLE "_PictureToShopItem";