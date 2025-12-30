import express from "express";
import cors from "cors";
import top10AnimeRoute from "./queries/AnimeWatchlist/trending.js"; // import the router
import randomAnimeRoute from "./queries/AnimeWatchlist/random.js";
import animedetails from "./queries/AnimeWatchlist/animedetails.js";
import featuredAnimeRoute from "./queries/AnimeWatchlist/featured.js"

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount the routers
app.use("/api/anime/top10", top10AnimeRoute);
app.use("/api/anime/random", randomAnimeRoute);
app.use("/api/anime/featured", featuredAnimeRoute);
app.use("/api/anime", animedetails); // Updated to handle dynamic IDs

app.listen(port, () => {
    console.log(`Server running → http://localhost:${port}`);
});
