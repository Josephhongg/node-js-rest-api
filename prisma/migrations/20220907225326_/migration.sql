-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_League" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "division" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_League" ("createdAt", "division", "id", "name") SELECT "createdAt", "division", "id", "name" FROM "League";
DROP TABLE "League";
ALTER TABLE "new_League" RENAME TO "League";
CREATE UNIQUE INDEX "League_name_key" ON "League"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
