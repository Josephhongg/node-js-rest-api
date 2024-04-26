import { Router } from "express";
const router = Router(); // Accessing the Router() object from express. It allows you to handle various requests

// Importing the CRUD functions
import {
  getLeague,
  getLeagues,
  createLeague,
  updateLeague,
  deleteLeague,
} from "../controllers/leagues.js";

router.route("/").get(getLeagues).post(createLeague);
router.route("/:id").get(getLeague).put(updateLeague).delete(deleteLeague);

export default router;
