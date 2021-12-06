-- CreateTable
CREATE TABLE "Referral" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "givenName" TEXT NOT NULL,
    "surName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "addressLine" TEXT,
    "suburb" TEXT,
    "state" TEXT,
    "postCode" TEXT,
    "country" TEXT
);

-- SeedData
insert into Referral (id, createdAt, updatedAt, email, phone, givenName, surName) values (1, datetime('now'), datetime('now'), 'testing@brighte.com.au', '0456123123', 'John', 'Doe');
insert into Referral (id, createdAt, updatedAt, email, phone, givenName, surName) values (2, datetime('now'), datetime('now'), 'your.name@gmail.com', '0456234345', 'Awesome', 'Dev');
insert into Referral (id, createdAt, updatedAt, email, phone, givenName, surName) values (3, datetime('now'), datetime('now'), 'another.one@yourcompany.com', '0478456456', 'Coding', 'Hero');
