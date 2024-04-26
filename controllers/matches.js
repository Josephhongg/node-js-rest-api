/**
 * this file handles 
 * CRUD HTTP methods for 
 * matches
 */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getMatch = async (req, res) => {
  try {
    const { id } = req.params;

    const match = await prisma.match.findUnique({
      where: { id: Number(id) },
    });

    if (!match) {
      return res.status(200).json({ 
        success: false,
        msg: `No match with the id: ${id} found` 
      })
    };

    return res.json({ 
      success: true,
      data: match 
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while getting a match",
    });
  }
};

const getMatches = async (req, res) => {
  try {
    const matches = await prisma.match.findMany();

    if (matches.length === 0) {
      return res.status(200).json({ 
        success: false,
        msg: 'No matches found' 
      })
    };

    return res.json({
      success: true, 
      data: matches 
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while getting matches",
    });
  }
};

const createMatch = async (req, res) => {
  try {
    const { clubOneId, clubTwoId, date, stadiumId} = req.body;

    await prisma.match.create({
      data: { clubOneId, clubTwoId, date, stadiumId },
    });

    const newMatches = await prisma.match.findMany();

    return res.status(201).json({
      success: true,
      msg: 'Match successfully created',
      data: newMatches,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while creating a match",
    });
  }
};

const updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { clubOneId, clubTwoId, date, stadiumId } = req.body;

    let match = await prisma.match.findUnique({
      where: { id: Number(id) },
    });

    if (!match) {
      return res.status(200).json({ 
        success: false,
        msg: `No match with the id: ${id} found` 
      })
    };

    match = await prisma.match.update({
      where: { id: Number(id) },
      data: { clubOneId, clubTwoId, date, stadiumId },
    });

    return res.json({
      success: true,
      msg: `Match with the id: ${id} successfully updated`,
      data: match,
    });
  } catch (err) {
    return res.status(500).json({
      msg: msg.message || "Something went wrong while updating a match"
    });
  }
};

const deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;

    const match = await prisma.match.findUnique({
      where: { id: Number(id) },
    });

    if (!match) {
      return res
        .status(200)
        .json({ 
          success: false,
          msg: `No match with the id: ${id} found` 
        })
    };

    await prisma.match.delete({
      where: { id: Number(id) },
    });

    return res.json({
      success: true,
      msg: `Match with the id: ${id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong while deleting a match",
    });
  }
};

export { 
  getMatch, 
  getMatches, 
  createMatch, 
  updateMatch, 
  deleteMatch 
};
