/*
  Warnings:

  - The `repeat` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `type` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventRepeat" AS ENUM ('ONE_TIME', 'DAILY', 'WEEKDAYS', 'WEEKLY', 'MONTHLY', 'MONTHLY_SAME_DATE', 'YEARLY');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('DEFAULT', 'COUNTDOWN');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "type" "EventType" NOT NULL,
DROP COLUMN "repeat",
ADD COLUMN     "repeat" "EventRepeat" NOT NULL DEFAULT 'ONE_TIME';

-- DropEnum
DROP TYPE "Repeat";
