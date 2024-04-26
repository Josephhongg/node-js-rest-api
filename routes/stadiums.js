import { Router } from "express";
const router = Router(); // Accessing the Router() object from express. It allows you to handle various requests

// importing the CRUD functions
import {
  getStadium,
  getStadiums,
  createStadium,
  updateStadium,
  deleteStadium,
} from "../controllers/stadiums.js";

router.route("/").get(getStadiums).post(createStadium);
router.route("/:id").get(getStadium).put(updateStadium).delete(deleteStadium);

export default router;