import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import Anime_Details from "./Anime_About_Page_Components/Anime_Details";
import Anime_Staff from "./Anime_About_Page_Components/Anime_Staff";

export default function Anime_About_Page({
  animeId,
}: {
  animeId: number | null;
}) {
  const [animeDetails, setAnimeDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/anime/${animeId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch anime details");
        }
        const data = await response.json();
        setAnimeDetails(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [animeId]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4">Error: {error}</div>;
  }

  if (!animeDetails) {
    return <div className="p-4">No anime details found.</div>;
  }
  return (
    // --anime-L-blue: #151F2E;
    // --anime-D-blue: #0B1622;
    <div className="flex flex-col w-full">
      {/* TOP IMAGE DESCRIPTION PART */}
      <div className="bg-[--anime-L-blue] aspect-[14/5] relative mb-5">
        <div className="absolute w-full h-[55%]  box-border">
          <img src={animeDetails.bannerImage} className="w-full opacity-50" />
        </div>
        <button
          className="absolute z-100 bg-[--anime-L-blue] px-4 py-3 mt-3 ml-3 rounded-lg font-bold"
          onClick={() => console.log("Go back")}
        >
          Back
        </button>

        <div className="absolute z-50 w-full h-full flex  items-end">
          {/* ITEMS END BOTTOM OF DIV */}
          <div className=" ml-[100px] aspect-[12/16] h-[350px] flex flex-col">
            {/* LEFT ABSOLUTE DIV */}
            <div className="  w-50% px-10">
              {/* COVER IMAGE */}
              <img
                loading="lazy"
                decoding="async"
                src={animeDetails.coverImage.large}
                className="h-[260px] object-cover scale-110"
              />
            </div>
            <div className="mt-2 h-full pb-2 flex items-end justify-center px-7">
              <select
                name=""
                id=""
                className="bg-[--bright-B-action] w-full pl-2 h-[43px] rounded-lg  text-bold"
              >
                <option value="">Add to list</option>
              </select>
              <button className="aspect-square h-[43px] justify-center items-center px-3   rounded-lg ml-2 bg-[--anime-HEART-red] stroke-4">
                <FaRegHeart className="" />
              </button>
            </div>
          </div>
          <div className="w-[750px] aspect-[16/4] flex flex-col">
            <p className="font-bold text-xl ">{animeDetails.title.english}</p>
            <p className="pl-6 text-base text-[--anime-FONT-blue] line-clamp-4">
              {animeDetails.description}
            </p>
          </div>
        </div>
      </div>
      {/* BELOW DESCRIPTION PART*/}
      <div className=" flex flex-row  justify-center gap-5 pl-10">
        {/* HARDCODE WIDTH FOR FIXED CENTER LAYOUT */}
        <div className="w-[26%] bg-[--anime-L-blue]">
          {/* MAP VOICE ACTORS AND STAFF */}
          <Anime_Staff />
        </div>
        <div className="w-[60%]">
          <div className="bg-[--anime-L-blue] mb-5 h-[310px] rounded-2 w-full">
            {/* MAP ANIME DEPTH DETAILS */}

            <Anime_Details
              // JUST BASED ON ANILIST
              details={{
                format: animeDetails.format,
                episodes: animeDetails.episodes,
                duration: animeDetails.duration,
                status: animeDetails.status,
                month: animeDetails.month,
                day: animeDetails.day,
                year: animeDetails.year,
                season: animeDetails.season,
                averageScore: animeDetails.averageScore,
                meanScore: animeDetails.meanScore,
                popularity: animeDetails.popularity,
                favourites: animeDetails.favourites,
                source: animeDetails.source,
                genres: animeDetails.genres,
              }}
            />
          </div>
          <div className="bg-[--anime-L-blue]">anime details tab</div>
        </div>
      </div>
    </div>
  );
}
