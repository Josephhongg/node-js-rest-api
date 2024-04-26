/*
  Warnings:

  - You are about to drop the `LeaguesOnclubs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `clubID` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `clubOneID` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `clubTwoID` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `stadiumID` on the `Match` table. All the data in the column will be lost.
  - Added the required column `clubId` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clubOne` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clubTwo` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stadiumId` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leagueId` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "LeaguesOnclubs";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "clubId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Player_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("country", "id", "name", "position") SELECT "country", "id", "name", "position" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE TABLE "new_Stadium" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Stadium" ("capacity", "id", "name") SELECT "capacity", "id", "name" FROM "Stadium";
DROP TABLE "Stadium";
ALTER TABLE "new_Stadium" RENAME TO "Stadium";
CREATE TABLE "new_Match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clubOne" INTEGER NOT NULL,
    "clubTwo" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "stadiumId" INTEGER NOT NULL,
    CONSTRAINT "Match_stadiumId_fkey" FOREIGN KEY ("stadiumId") REFERENCES "Stadium" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Match" ("date", "id") SELECT "date", "id" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
CREATE TABLE "new_Club" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "manager" TEXT NOT NULL,
    "leagueId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Club_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Club" ("country", "id", "manager", "name") SELECT "country", "id", "manager", "name" FROM "Club";
DROP TABLE "Club";
ALTER TABLE "new_Club" RENAME TO "Club";
CREATE TABLE "new_League" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_League" ("division", "id", "name") SELECT "division", "id", "name" FROM "League";
DROP TABLE "League";
ALTER TABLE "new_League" RENAME TO "League";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
