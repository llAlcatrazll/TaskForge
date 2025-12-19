import { useEffect, useState } from "react";
import Anime_Top10 from "./Anime_Top10";
// converted to reusable component with passable variables so no excess files

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

type Props = {
  activePage: string;
  setActivePage: (page: string) => void;
};

export default function AnimeWatchlist_HomePage({
  activePage,
  setActivePage,
}: Props) {
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

  return (
    <main className="bg-[#1E232F] flex-1 flex flex-col w-full px-4 py-2">
      <div className="w-full bg-gray-500 ">
        <div className="aspect-[16/7] w-full bg-red-400">wew</div>
      </div>
      <div className=" mt-5">
        <p className="font-bold text-2xl mb-1">Trending</p>
        <div className="bg-[--mediumlight-D-blue] h-[312px] px-4">
          <Anime_Top10
            anime={topTen}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      </div>
      <div className=" mt-4 mb-4">
        <p className="font-bold text-2xl mb-1">Random</p>
        <div className="bg-[--dark-D-blue] h-[312px] px-4">
          <Anime_Top10
            anime={randomTen}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      </div>
      <div className=" mt-4 mb-4">
        <p className="font-bold">Recent Episodes</p>
        <div className="bg-[--dark-D-blue] h-[250px]">hello</div>
      </div>
      wewe
    </main>
  );
}
