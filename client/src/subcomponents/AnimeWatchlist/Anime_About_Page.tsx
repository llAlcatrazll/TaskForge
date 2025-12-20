import { parse } from "graphql";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
export default function Anime_About_Page({
  animeId,
}: {
  animeId: number | null;
}) {
  const [animeDetails, setAnimeDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Placeholder ID for now
  // const animeId = 204293; // Replace this with a dynamic value later
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
  /*    <div className="p-4">
      <button onClick={() => console.log("Go back")}>Back</button>
      <div className="mt-4">
         <img
          src={animeDetails.coverImage.large}
          alt={animeDetails.title.english}
        /> 
        <h1 className="text-2xl font-bold">
          {animeDetails.title.english || animeDetails.title.romaji}
        </h1>
        <p className="mt-2">{animeDetails.description}</p>
        <p className="mt-2">Status: {animeDetails.status}</p>
        <p className="mt-2">Genres: {animeDetails.genres?.join(", ")}</p>
      </div>
    </div> */
  return (
    // --anime-L-blue: #151F2E;
    // --anime-D-blue: #0B1622;
    <div className="flex flex-col w-full">
      {/* TOP IMAGE DESCRIPTION PART */}
      <div className="bg-[--anime-L-blue] aspect-[14/5] relative mb-5">
        <div className="absolute w-full h-[55%]  box-border">
          <img src={animeDetails.bannerImage} className="w-full opacity-50" />
        </div>
        {/* <button
          className="absolute z-100"
          onClick={() => console.log("Go back")}
        >
          Back
        </button> */}
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
      <div className=" flex flex-col items-center">
        {/* HARDCODE WIDTH FOR FIXED CENTER LAYOUT */}
        <div className="bg-[--anime-L-blue] mb-5 h-[200px] rounded-2 w-[1100px]">
          anime details tab
        </div>
        <div className="bg-[--anime-L-blue]">anime details tab</div>
      </div>
    </div>
  );
}
