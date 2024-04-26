import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Importing data
import { stadiums } from "../data/stadiums.js";

dotenv.config();

const createStadiums = async () => {
    try {
        await prisma.stadium.deleteMany({}); // Delete all records in the stadiums table

        const createMany = stadiums.map(stadium => {
            return prisma.stadium.create({
                data: stadium
            });
        });

        await Promise.all(createMany); // Insert records in the stadiums table
        console.log("Stadiums data successfully created");
    } catch (err) {
        console.log(err);
        process.exit(1); // Exit the process with an error
    }
};

const deleteStadiums = async () => {
    try {
        await prisma.stadium.deleteMany({});
        console.log("Stadiums data successfully deleted");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

switch (process.argv[2]) {
    case "-d": {
        await deleteStadiums();
        break;
    }
    default: {
        await createStadiums();
    }
}

process.exit();