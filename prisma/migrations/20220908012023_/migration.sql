-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clubOne" INTEGER NOT NULL,
    "clubTwo" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "stadiumId" INTEGER NOT NULL,
    CONSTRAINT "Match_stadiumId_fkey" FOREIGN KEY ("stadiumId") REFERENCES "Stadium" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Match" ("clubOne", "clubTwo", "date", "id", "stadiumId") SELECT "clubOne", "clubTwo", "date", "id", "stadiumId" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
