import express from "express";
import fetch from "node-fetch";

const router = express.Router();
const ANILIST_URL = "https://graphql.anilist.co";

const RANDOM10 = `query ($page: Int) {
  Page(page: $page, perPage: 10) {
    media(type: ANIME, sort: POPULARITY_DESC) {
      id
      title {
        romaji
        english
        native
      }
      status
      coverImage {
        large
      }
    }
  }
}`;

router.get("/", async (req, res) => {
    try {
        const randomPage = Math.floor(Math.random() * 500) + 1;

        const response = await fetch(ANILIST_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: RANDOM10,
                variables: { page: randomPage },
            }),
        });

        const data = await response.json();
        res.json(data.data.Page.media);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch random anime" });
    }
});

export default router;
