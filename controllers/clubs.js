/**
 * this file handles 
 * CRUD HTTP methods for 
 * clubs
 */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getClub = async (req, res) => {
  try {
    const { id } = req.params
    /**
     * returns club data
     * that matches the id number
     */
    const club = await prisma.club.findUnique({
      where: { id: Number(id) },
    });
    /**
     * if no club is
     * found, returns success set 
     * to false and error message
     */
    if (!club) {
      return res.status(200).json({
        success: false, 
        msg: `No club with id: ${id} found` 
      })
    };
    /**
     * returns a club's data
     * with the success set to true
     */
    return res.json({
      success: true, 
      data: club 
    });
  } catch (err) {
    return res.status(500).json({
      /**
       * returns an err
       * message if there 
       * is an error getting a 
       * clubs data
       */
      msg: err.message || "Something went wrong when getting a club",
    });
  }
};

const getClubs = async (req, res) => {
  try {
    /**
     * returns all clubs data
     * that includes players
     * and league
     */
    const clubs = await prisma.club.findMany({
      include: {
        players: true,
        league: true
      },
    });

    if (clubs.length === 0) {
      return res.status(200).json({ 
        /**
         * returns a message of
         * "no clubs found"
         */
        success: false,
        msg: "No clubs found" 
      })
    };
    /**
     * returns success set 
     * to true and club data
     */
    return res.json({ 
      success: true,
      data: clubs 
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message || "Something went wrong when getting clubs",
    });
  }
};

const createClub = async (req, res) => {
  try {
    const { name, country, manager, leagueId } = req.body // destructuring object

    /**
     * creates a new club 
     * with the data name, country,
     * manager and leagueId
     */
    await prisma.club.create({
      data: { name, country, manager, leagueId },
    });
    /**
     * newly created club data
     * will include players
     * that have a matching clubId
     */
    const newClubs = await prisma.club.findMany({
      include: {
        players: true,
      },
    });
    /**
     * returns success message
     * with the newly created
     * club data
     */
    return res.status(201).json({
      success: true,
      msg: 'Club successfully created',
      data: newClubs,
    });
  } catch (err) {
    /**
     * returns error
     * message
     */
    return res.status(500).json({
      msg: err.message || "Something went wrong when creating a club",
    });
  }
};

const updateClub = async (req, res) => {
  try {
    const { id } = req.params
    const { name, country, manager, leagueId } = req.body // destructuring object
    /**
     * returns the club
     * that matches the 
     * id number
     */
    let club = await prisma.club.findUnique({
      where: { id: Number(id) },
    });

    /**
     * if not club is found,
     * returns success set
     * to false and error
     * message
     */
    if (!club) {
      return res.status(200).json({
        success: false, 
        msg: `No club with the id: ${id} found` 
      })
    };

    /**
     * updates club data with 
     * the data fields name,
     * country, manager, leagueId
     */
    club = await prisma.club.update({
      where: { id: Number(id) },
      data: { name, country, manager, leagueId },
    });
    /**
     * returns success set to true
     * with message and club data
     */
    return res.json({
      success: true,
      msg: `Club with the id: ${id} successfully updated`,
      data: club,
    });
  } catch (err) {
    /**
     * returns error message
     */
    return res.status(500).json({
      msg: err.message || "Something went wrong while updating a club",
    });
  }
};

const deleteClub = async (req, res) => {
  try {
    const { id } = req.params
    /**
     * finds the club 
     * that matches the id 
     * number
     */
    const club = await prisma.club.findUnique({
      where: { id: Number(id) },
    });
    /**
     * if no club id
     * is found, returns success
     * set to false and a
     * error message
     */
    if (!club) {
      return res.status(200).json({ 
        success: false,
        msg: `No club with the id: ${id} found` 
      })
    };
    /**
     * deletes the 
     * club that matches the
     * id number
     */
    await prisma.club.delete({
      where: { id: Number(id) },
    });

    /**
     * returns success set
     * to true and message
     */
    return res.json({
      success: true,
      msg: `Club with the id: ${id} successfully deleted`,
    });
  } catch (err) {
    /**
     * returns error 
     * message
     */
    return res.status(500).json({
      msg: err.message || "Something went wrong while deleting a club",
    });
  }
};
/**
 * exporting
 * the CRUD functions
 */
export { 
  getClub, 
  getClubs, 
  createClub, 
  updateClub, 
  deleteClub 
}
