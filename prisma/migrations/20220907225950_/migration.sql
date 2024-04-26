-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Club" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "country" TEXT,
    "manager" TEXT,
    "leagueId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Club_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Club" ("country", "createdAt", "id", "leagueId", "manager", "name") SELECT "country", "createdAt", "id", "leagueId", "manager", "name" FROM "Club";
DROP TABLE "Club";
ALTER TABLE "new_Club" RENAME TO "Club";
CREATE UNIQUE INDEX "Club_name_key" ON "Club"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
