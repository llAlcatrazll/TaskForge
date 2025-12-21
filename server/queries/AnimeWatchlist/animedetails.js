import express from "express";
import fetch from "node-fetch";

const router = express.Router();
const ANILIST_URL = "https://graphql.anilist.co";

// GraphQL query to fetch anime details by ID
const ANIME_DETAILS_QUERY = `query ANIME_DETAILS($id: Int) {
  Media(id: $id, type: ANIME) {
    id
    title {
      romaji
      english
      native
    }
    description
    status
     coverImage{
        large
    }
        bannerImage
    format
    episodes
    duration
    status
    startDate {
      month
      day
      year
    }
    season
    averageScore
    meanScore
    popularity
    favourites
    studios {
      nodes {
        name
      }
    }
    source
    genres
  }
}`;

// Dynamic route to fetch anime details by ID
router.get("/:id", async (req, res) => {
  const animeId = parseInt(req.params.id, 10); // Extract the ID from the route parameter
  console.log("Received animeId:", animeId);
  if (isNaN(animeId)) {
    return res.status(400).json({ error: "Invalid anime ID" });
  }

  try {
    const response = await fetch(ANILIST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: ANIME_DETAILS_QUERY,
        variables: { id: animeId }, // Pass the anime ID as a variable
      }),
    });

    const data = await response.json();

    if (data.errors) {
      return res.status(404).json({ error: "Anime not found" });
    }

    res.json(data.data.Media); // Return the anime details
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch anime details" });
  }
});

export default router;
