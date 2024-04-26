import { Router } from "express";

const router = Router();

import { notFound } from "../controllers/notFound.js";

router.route("/").get(notFound);

export default router;