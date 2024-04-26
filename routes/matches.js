import { Router } from "express";
const router = Router(); // Accessing the Router() object from express. It allows you to handle various requests

// Importing the CRUD functions
import {
  getMatch,
  getMatches,
  createMatch,
  updateMatch,
  deleteMatch,
} from "../controllers/matches.js";

router.route("/").get(getMatches).post(createMatch);
router.route("/:id").get(getMatch).put(updateMatch).delete(deleteMatch);

export default router;
