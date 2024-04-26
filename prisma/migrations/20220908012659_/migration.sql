/*
  Warnings:

  - You are about to drop the column `clubOne` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `clubTwo` on the `Match` table. All the data in the column will be lost.
  - Added the required column `clubOneId` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clubTwoId` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clubOneId" INTEGER NOT NULL,
    "clubTwoId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "stadiumId" INTEGER NOT NULL,
    CONSTRAINT "Match_stadiumId_fkey" FOREIGN KEY ("stadiumId") REFERENCES "Stadium" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Match" ("date", "id", "stadiumId") SELECT "date", "id", "stadiumId" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
