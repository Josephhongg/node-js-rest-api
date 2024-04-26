import { Router } from "express";
const router = Router(); // Accessing the Router() object from express. It allows you to handle various requests

// Importing the CRUD functions
import {
  getClub,
  getClubs,
  createClub,
  updateClub,
  deleteClub,
} from "../controllers/clubs.js";

router.route("/").get(getClubs).post(createClub);
router.route("/:id").get(getClub).put(updateClub).delete(deleteClub);

export default router;
