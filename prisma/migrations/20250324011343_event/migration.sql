-- CreateEnum
CREATE TYPE "Repeat" AS ENUM ('ONE_TIME', 'DAILY', 'WEEKDAYS', 'WEEKLY', 'MONTHLY', 'MONTHLY_SAME_DATE', 'YEARLY');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "all_day" BOOLEAN NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3),
    "repeat" "Repeat" NOT NULL DEFAULT 'ONE_TIME',

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
