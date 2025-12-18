import Anime_Top10 from "../subcomponents/AnimeWatchlist/Anime_Top10";
// converted to reusable component with passable variables so no excess files
import { useEffect, useState } from "react";

type Anime = {
  id: number;
  title: {
    romaji: string;
    english: string;
  };
  coverImage: {
    large: string;
  };
};

export default function AnimeWatchlist() {
  // flerx-1 take up available space

  const [topTen, setTopTen] = useState<Anime[]>([]);
  const [randomTen, setRandomTen] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/anime/top10")
      .then((res) => res.json())
      .then((data) => {
        setTopTen(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    fetch("http://localhost:5000/api/anime/random")
      .then((res) => res.json())
      .then((data) => {
        setRandomTen(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) return <p>Loading…</p>;

  const trendinten = [
    { id: 1, icon: "1" },
    { id: 2, icon: "2" },
    { id: 3, icon: "3" },
    { id: 4, icon: "4" },
    { id: 5, icon: "5" },
    { id: 6, icon: "6" },
    { id: 7, icon: "7" },
    { id: 8, icon: "8" },
    { id: 9, icon: "9" },
    { id: 10, icon: "10" },
  ];

  return (
    <div className=" flex flex-row w-full">
      {/* CENTER SCROLL */}
      <main className="bg-[#1E232F] flex-1 flex flex-col w-full p-4">
        <div className=" mt-5">
          <p className="font-bold">Trending</p>
          <div className="bg-[--dark-D-blue] h-[250px] px-4"></div>
        </div>
        <div className=" mt-5">
          <p className="font-bold text-2xl mb-1">Trending</p>
          <div className="bg-[--mediumlight-D-blue] h-[312px] px-4">
            <Anime_Top10 anime={topTen} />
          </div>
        </div>
        <div className=" mt-4 mb-4">
          <p className="font-bold text-2xl mb-1">Random</p>
          <div className="bg-[--dark-D-blue] h-[312px] px-4">
            <Anime_Top10 anime={randomTen} />
          </div>
        </div>
        <div className=" mt-4 mb-4">
          <p className="font-bold">Recent Episodes</p>
          <div className="bg-[--dark-D-blue] h-[250px]">hello</div>
        </div>
        wewe
      </main>
      <aside className="bg-slate-700 w-[230px] h-screen sticky top-0 p-4 flex flex-col">
        {/* RIGHT TOP 10 LIST */}
        <div className="mb-4 font-semibold">Top 10</div>
        <div className="flex flex-row ">
          <div className="">today</div>
          <div className="">week</div>
          <div className="">month</div>
        </div>
        <div className=" space-y-5 h-full">
          {trendinten.map((item) => (
            <div key={item.id} className="bg-slate-800 h-[65px] flex flex-row">
              {item.icon}
              <div className="bg-green-900 mx-3">Image</div>
              <div className="flex flex-col">
                <div>Title</div>
                <div>Subs, Dubbs</div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
