import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Importing data
import { players } from "../data/players.js";

dotenv.config();

const createPlayers = async () => {
    try {
        await prisma.player.deleteMany({});

        const createMany = players.map(player => {
            return prisma.player.create({
                data: player
            });
        });

        await Promise.all(createMany); // Insert records in the players table

        console.log("Players data successfully created");
    } catch (err) {
        console.log(err);
        process.exit(1); // Exits the process with an error
    }
};

const deletePlayers = async () => {
    try {
        await prisma.player.deleteMany({});
        console.log("Players data successfully deleted");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

switch (process.argv[2]) {
    case "-d": {
        await deletePlayers();
        break;
    }
    default: {
        await createPlayers();
    }
}

process.exit();