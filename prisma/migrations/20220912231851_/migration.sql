/*
  Warnings:

  - You are about to drop the column `country` on the `Player` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stadium" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "capacity" INTEGER,
    "city" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Stadium" ("capacity", "city", "createdAt", "id", "name") SELECT "capacity", "city", "createdAt", "id", "name" FROM "Stadium";
DROP TABLE "Stadium";
ALTER TABLE "new_Stadium" RENAME TO "Stadium";
CREATE UNIQUE INDEX "Stadium_name_key" ON "Stadium"("name");
CREATE TABLE "new_Match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clubOneId" INTEGER NOT NULL,
    "clubTwoId" INTEGER NOT NULL,
    "date" TEXT,
    "stadiumId" INTEGER NOT NULL,
    CONSTRAINT "Match_stadiumId_fkey" FOREIGN KEY ("stadiumId") REFERENCES "Stadium" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Match" ("clubOneId", "clubTwoId", "date", "id", "stadiumId") SELECT "clubOneId", "clubTwoId", "date", "id", "stadiumId" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "nationality" TEXT,
    "position" TEXT,
    "clubId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Player_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("clubId", "createdAt", "id", "name", "position") SELECT "clubId", "createdAt", "id", "name", "position" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_name_key" ON "Player"("name");
CREATE TABLE "new_Club" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "country" TEXT,
    "manager" TEXT,
    "leagueId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Club_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Club" ("country", "createdAt", "id", "leagueId", "manager", "name") SELECT "country", "createdAt", "id", "leagueId", "manager", "name" FROM "Club";
DROP TABLE "Club";
ALTER TABLE "new_Club" RENAME TO "Club";
CREATE UNIQUE INDEX "Club_name_key" ON "Club"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
