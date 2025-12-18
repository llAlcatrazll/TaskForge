import express from "express";
import fetch from "node-fetch";

const router = express.Router();
const ANILIST_URL = "https://graphql.anilist.co";

const TOP10TRENDING = `query TOP10TRENDING {
    Page(page: 1, perPage: 10) {
        media(type: ANIME, sort: TRENDING_DESC) {
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
