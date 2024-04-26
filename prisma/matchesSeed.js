import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Importing data
import { matches } from "../data/matches.js";

dotenv.config();

const createMatches = async () => {
    try {
        await prisma.match.deleteMany({}); // Delete all records in the matches table

        const createMany = matches.map(match => {
            return prisma.match.create({
                data: match
            });
        });

        await Promise.all(createMany); // Insert records in the matches table

        console.log("Matches data successfully created");
    } catch (err) {
        console.log(err);
        process.exit(1); // Exit the process with an error
    }
};

const deleteMatches = async () => {
    try {
        await prisma.match.deleteMany({});
        console.log("Matches data successfully deleted");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

switch (process.argv[2]) {
    case "-d": {
        await deleteMatches();
        break;
    }
    default: {
        await createMatches();
    }
}

process.exit();