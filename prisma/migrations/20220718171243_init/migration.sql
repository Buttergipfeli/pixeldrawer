-- CreateTable
CREATE TABLE
  "username" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" varchar(255) NOT NULL
  );

-- CreateTable
CREATE TABLE
  "color" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "color" varchar(255) NOT NULL
  );

-- CreateTable
CREATE TABLE
  "pixel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username_fk" INTEGER NOT NULL,
    "color_fk" INTEGER NOT NULL,
    CONSTRAINT "pixel_username_fk_fkey" FOREIGN KEY ("username_fk") REFERENCES "username" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pixel_color_fk_fkey" FOREIGN KEY ("color_fk") REFERENCES "color" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
  );