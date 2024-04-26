/**
 * this file handles 
 * CRUD HTTP methods for 
 * stadiums
 */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getStadium = async (req, res) => {
  try {
    const { id } = req.params;

    const stadium = await prisma.stadium.findUnique({
      where: { id: Number(id) },
    });

    if (!stadium) {
      return res.status(200).json({ 
        success: false,
        msg: `No stadium with the id: ${id} found` 
      })
    };

    return res.json({ 
      success: true,
      data: stadium 
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while getting a stadium",
    });
  }
};

const getStadiums = async (req, res) => {
  try {
    const stadiums = await prisma.stadium.findMany({
      include: {
        matches: true,
      },
    });

    if (stadiums.length === 0) {
      return res.status(200).json({ 
        success: false,
        msg: 'No stadiums found' 
      })
    };

    return res.json({ 
      success: true,
      data: stadiums 
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while getting stadiums",
    });
  }
};

const createStadium = async (req, res) => {
  try {
    const { name, capacity, city } = req.body; // destructuring object

    await prisma.stadium.create({
      data: { name, capacity, city },
    });

    const newStadiums = await prisma.stadium.findMany({
      include: {
        matches: true,
      },
    });

    return res.status(201).json({
      success: true,
      msg: 'Stadium successfully created',
      data: newStadiums,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while creating a stadium",
    });
  }
};

const updateStadium = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, capacity, city } = req.body;

    let stadium = await prisma.stadium.findUnique({
      where: { id: Number(id) },
    });

    if (!stadium) {
      return res.status(200).json({ 
        success: false,
        msg: `No stadium with the id: ${id} found` 
      })
    };

    stadium = await prisma.stadium.update({
      where: { id: Number(id) },
      data: { name, capacity, city },
    });

    res.json({
      success: true,
      msg: `Stadium with the id: ${id} successfully updated`,
      data: stadium,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while updating a stadium",
    });
  }
};

const deleteStadium = async (req, res) => {
  try {
    const { id } = req.params;

    const stadium = await prisma.stadium.findUnique({
      where: { id: Number(id) },
    });

    if (!stadium) {
      return res.status(200).json({ 
        success: false,
        msg: `No stadium with the id: ${id} found` 
      })
    };

    await prisma.stadium.delete({
      where: { id: Number(id) },
    });

    return res.json({
      success: true,
      msg: `Stadium with the id: ${id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while deleting a stadium",
    });
  }
};

export { 
  getStadium, 
  getStadiums, 
  createStadium, 
  updateStadium, 
  deleteStadium 
};