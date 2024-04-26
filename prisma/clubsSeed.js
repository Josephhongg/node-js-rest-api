import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Importing data
import { clubs } from "../data/clubs.js";

dotenv.config();

const createClubs = async () => {
    try {
        await prisma.club.deleteMany({}); // Delete all records in the clubs table

        const createMany = clubs.map(club => {
            return prisma.club.create({
                data: club
            });
        });

        await Promise.all(createMany); // insert records in the clubs table

        console.log("Clubs data successfully created");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const deleteClubs = async () => {
    try {
        await prisma.club.deleteMany({});
        console.log("Clubs data successfully deleted");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

switch (process.argv[2]) {
    case "-d": {
        await deleteClubs();
        break;
    }
    default: {
        await createClubs();
    }
}

process.exit();