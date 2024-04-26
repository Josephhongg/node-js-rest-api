import { Router } from "express";
const router = Router(); // Accessing the Router() object from express. It allows you to handle various requests

// importing the CRUD functions

import {
  getPlayer,
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from "../controllers/players.js";

router.route("/").get(getPlayers).post(createPlayer);
router.route("/:id").get(getPlayer).put(updatePlayer).delete(deletePlayer);

export default router;
