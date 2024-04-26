/*
  Warnings:

  - You are about to drop the column `clubID` on the `League` table. All the data in the column will be lost.
  - You are about to drop the column `leagueID` on the `Club` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_League" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "division" TEXT NOT NULL
);
INSERT INTO "new_League" ("division", "id", "name") SELECT "division", "id", "name" FROM "League";
DROP TABLE "League";
ALTER TABLE "new_League" RENAME TO "League";
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "dob" DATETIME NOT NULL,
    "position" TEXT NOT NULL,
    "clubID" INTEGER NOT NULL
);
INSERT INTO "new_Player" ("clubID", "country", "dob", "id", "name", "position") SELECT "clubID", "country", "dob", "id", "name", "position" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE TABLE "new_LeaguesOnclubs" (
    "clubID" INTEGER NOT NULL,
    "leagueID" INTEGER NOT NULL,

    PRIMARY KEY ("clubID", "leagueID"),
    CONSTRAINT "LeaguesOnclubs_leagueID_fkey" FOREIGN KEY ("leagueID") REFERENCES "League" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LeaguesOnclubs" ("clubID", "leagueID") SELECT "clubID", "leagueID" FROM "LeaguesOnclubs";
DROP TABLE "LeaguesOnclubs";
ALTER TABLE "new_LeaguesOnclubs" RENAME TO "LeaguesOnclubs";
CREATE TABLE "new_Match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clubOneID" INTEGER NOT NULL,
    "clubTwoID" INTEGER NOT NULL,
    "stadiumID" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Match_stadiumID_fkey" FOREIGN KEY ("stadiumID") REFERENCES "Stadium" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Match" ("clubOneID", "clubTwoID", "date", "id", "stadiumID") SELECT "clubOneID", "clubTwoID", "date", "id", "stadiumID" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
CREATE TABLE "new_Club" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "manager" TEXT NOT NULL
);
INSERT INTO "new_Club" ("country", "id", "manager", "name") SELECT "country", "id", "manager", "name" FROM "Club";
DROP TABLE "Club";
ALTER TABLE "new_Club" RENAME TO "Club";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
