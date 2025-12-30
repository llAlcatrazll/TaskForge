import express from "express";
import fetch from "node-fetch";

const router = express.Router();
const ANILIST_URL = "https://graphql.anilist.co";

// SPECIFICALLY EXCLUDE ONE PIECE - id_not:21 just because i dont to see it evertime i open this app
const TOP10TRENDING = `query TOP10TRENDING {
    Page(page: 1, perPage: 10) {
    media(
      type: ANIME
      status: RELEASING
      sort: TRENDING_DESC
      id_not: 21
    
    ) {
      id
      title {
        romaji
        english
        native
      }
      status
      bannerImage
      coverImage {
        large
      }
      format
      duration
      startDate {
        day
        month
        year
      }
      description
    }
  }
}`;

router.get("/", async (req, res) => {
  try {
    const response = await fetch(ANILIST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: TOP10TRENDING }),
    });

    const data = await response.json();
    res.json(data.data.Page.media);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch anime" });
  }
});

export default router;
