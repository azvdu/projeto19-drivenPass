/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `credentials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,title]` on the table `networks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "credentials_userId_title_key" ON "credentials"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "networks_userId_title_key" ON "networks"("userId", "title");
