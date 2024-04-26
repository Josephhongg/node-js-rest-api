/**
 * this file handles 
 * CRUD HTTP methods for 
 * players
 */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getPlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const player = await prisma.player.findUnique({
      where: { id: Number(id) },
    });

    if (!player) {
      return res.status(200).json({ 
        success: false,
        msg: `No player with the id: ${id} found` 
      })
    };

    return res.json({ 
      success: true,
      data: player 
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while getting a player",
    });
  }
};

const getPlayers = async (req, res) => {
  try {
    const players = await prisma.player.findMany();

    if (players.length === 0) {
      return res.status(200).json({ 
        success: false,
        msg: 'No player found' 
      })
    };

    return res.json({ 
      success: true,
      data: players 
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while getting players"
    })
  }
};

const createPlayer = async (req, res) => {
  try {
    const { name, nationality, position, clubId } = req.body; //destructuring object

    await prisma.player.create({
      data: { name, nationality, position, clubId },
    });

    const newPlayers = await prisma.player.findMany();

    return res.status(201).json({
      success: true,
      msg: 'Player successfully created',
      data: newPlayers,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while creating a player"
    });
  }
};

const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, nationality, position, clubId } = req.body;

    let player = await prisma.player.findUnique({
      where: { id: Number(id) },
    });

    if (!player) {
      return res.status(200).json({ 
        success: false,
        msg: `No player with the id: ${id} found` 
      })
    };

    player = await prisma.player.update({
      where: { id: Number(id) },
      data: { name, nationality, position, clubId },
    });

    return res.json({
      success: true,
      msg: `Player with the id: ${id} successfully updated`,
      data: player,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while updating a player"
    });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const player = await prisma.player.findUnique({
      where: { id: Number(id) },
    });

    if (!player) {
      return res.status(200).json({ 
        success: false,
        msg: `No player with the id: ${id} found` 
      })
    };

    await prisma.player.delete({
      where: { id: Number(id) },
    });

    return res.json({
      success: true,
      msg: `Player with the id: ${id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while deleting a player"
    });
  }
};

export { 
  getPlayer, 
  getPlayers, 
  createPlayer, 
  updatePlayer, 
  deletePlayer 
}
