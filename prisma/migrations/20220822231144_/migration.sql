-- CreateTable
CREATE TABLE "Club" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "manager" TEXT NOT NULL,
    "leagueID" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "LeaguesOnclubs" (
    "clubID" INTEGER NOT NULL,
    "leagueID" INTEGER NOT NULL,

    PRIMARY KEY ("clubID", "leagueID"),
    CONSTRAINT "LeaguesOnclubs_clubID_fkey" FOREIGN KEY ("clubID") REFERENCES "Club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LeaguesOnclubs_leagueID_fkey" FOREIGN KEY ("leagueID") REFERENCES "League" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "League" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "clubID" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "dob" DATETIME NOT NULL,
    "position" TEXT NOT NULL,
    "clubID" INTEGER NOT NULL,
    CONSTRAINT "Player_clubID_fkey" FOREIGN KEY ("clubID") REFERENCES "Club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stadium" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clubOneID" INTEGER NOT NULL,
    "clubTwoID" INTEGER NOT NULL,
    "stadiumID" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Match_stadiumID_fkey" FOREIGN KEY ("stadiumID") REFERENCES "Stadium" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_clubOneID_fkey" FOREIGN KEY ("clubOneID") REFERENCES "Club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_clubTwoID_fkey" FOREIGN KEY ("clubTwoID") REFERENCES "Club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
