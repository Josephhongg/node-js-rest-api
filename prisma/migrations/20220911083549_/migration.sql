/*
  Warnings:

  - Added the required column `city` to the `Stadium` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stadium" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Stadium" ("capacity", "createdAt", "id", "name") SELECT "capacity", "createdAt", "id", "name" FROM "Stadium";
DROP TABLE "Stadium";
ALTER TABLE "new_Stadium" RENAME TO "Stadium";
CREATE UNIQUE INDEX "Stadium_name_key" ON "Stadium"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
