/**
 * this file handles 
 * CRUD HTTP methods for 
 * leagues
 */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getLeague = async (req, res) => {
  try {
    const { id } = req.params

    const league = await prisma.league.findUnique({
      where: { id: Number(id) },
    });

    if (!league) {
      return res.status(200).json({ 
        success: false,
        msg: `No league with the id: ${id} found`
      });
    };

    return res.json({ 
      success: true,
      data: league
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while getting a league"
    });
  }
};

const getLeagues = async (req, res) => {
  try {
    const leagues = await prisma.league.findMany({
      include: {
        clubs: true,
      },
    });

    if (leagues.length === 0) {
      return res.status(200).json({ 
        success: false,
        msg: 'No leagues found' 
      })
    };

    return res.json({ 
      success: true,
      data: leagues 
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while getting leagues"
    });
  }
};

const createLeague = async (req, res) => {
  try {
    const { name, division, currentChampion } = req.body

    await prisma.league.create({
      data: { name, division, currentChampion },
    });

    const newLeagues = await prisma.league.findMany({
      include: {
        clubs: true,
      },
    });

    return res.status(201).json({
      success: true,
      msg: 'League successfully created',
      data: newLeagues,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while creating a league",
    });
  }
};

const updateLeague = async (req, res) => {
  try {
    const { id } = req.params
    const { name, division, currentChampion } = req.body

    let league = await prisma.league.findUnique({
      where: { id: Number(id) },
    });

    if (!league) {
      return res.status(200).json({ 
        success: false,
        msg: `No league with the id: ${id}` 
      })
    };

    league = await prisma.league.update({
      where: { id: Number(id) },
      data: { name, division, currentChampion },
    });

    return res.json({
      success: true,
      msg: `League with the id: ${id} successfully updated`,
      data: league,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while updating a league",
    });
  }
};

const deleteLeague = async (req, res) => {
  try {
    const { id } = req.params

    const league = await prisma.league.findUnique({
      where: { id: Number(id) },
    });

    if (!league) {
      return res.status(200).json({ 
        success: false,
        msg: `No league with the id: ${id} found` 
      })
    };

    await prisma.league.delete({
      where: { id: Number(id) },
    });

    return res.json({
      success: true,
      msg: `League with the id: ${id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while deleting a league",
    });
  }
};

export { 
  getLeague, 
  getLeagues, 
  createLeague, 
  updateLeague, 
  deleteLeague 
};