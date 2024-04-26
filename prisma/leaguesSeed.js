import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { leagues } from "../data/leagues.js";

dotenv.config();

const createLeagues = async () => {
    try {
        await prisma.league.deleteMany({}); // Delete all records in the leagues table

        const createMany = leagues.map(league => {
            return prisma.league.create({
                data: league
            });
        });

        await Promise.all(createMany); // Inserts records in the leagues table

        console.log("Leagues data successfully created");
    } catch (err) {
        console.log(err);
        process.exit(1); // Exit the process with an error
    }
};

const deleteLeagues = async () => {
    try {
        await prisma.league.deleteMany({});
        console.log("Leagues data successfully deleted");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

switch (process.argv[2]) {
    case "-d": {
        await deleteLeagues();
        break;
    }
    default: {
        await createLeagues();
    }
}

process.exit();