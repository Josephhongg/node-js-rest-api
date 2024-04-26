import dotenv from "dotenv";
import express, { urlencoded, json } from "express";
import { rateLimit } from "express-rate-limit";
import cors from "cors";

// Routes
import clubs from "./routes/clubs.js";
import leagues from "./routes/leagues.js";
import matches from "./routes/matches.js";
import players from "./routes/players.js";
import stadiums from "./routes/stadiums.js";
import notFound from "./routes/notFound.js";

dotenv.config();

const app = express();

// Rate limit
const limit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
  message: "You have exceeded the number of requests per minute: 50. Please try again later."
});

const BASE_URL = "api";

const PORT = process.env.PORT;

app.use(urlencoded({ extended: false }));

app.use(json());

app.use(limit);

app.use(cors());

app.use(`/${BASE_URL}/v1/clubs`, clubs);
app.use(`/${BASE_URL}/v1/leagues`, leagues);
app.use(`/${BASE_URL}/v1/matches`, matches);
app.use(`/${BASE_URL}/v1/players`, players);
app.use(`/${BASE_URL}/v1/stadiums`, stadiums);
app.use("*", notFound); // if request doesn't return any api data

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});
