import { useEffect, useState } from "react";
import Anime_Top10 from "./Anime_Top10";
import Anime_Featured from "./Anime_Featured";
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
  bannerImage: string;
};
type FeaturedAnime = {
  id: number;
  title: {
    romaji: string;
    english: string;
  };
  coverImage: {
    large: string;
  };
  bannerImage: string;
  format: string;
  duration: string;
  startDate: {
    day: string;
    month: string;
    year: string;
  };
  description: string;
};

type Props = {
  activePage: string;
  setActivePage: (page: string) => void;
  setSelectedAnimeId: (id: number) => void;
};

export default function AnimeWatchlist_HomePage({
  activePage,
  setActivePage,
  setSelectedAnimeId,
}: Props) {
  const [topTen, setTopTen] = useState<Anime[]>([]);
  const [featured, setFeatured] = useState<FeaturedAnime[]>([]);
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
  useEffect(() => {
    fetch("http://localhost:5000/api/anime/featured")
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) return <p>Loading…</p>;

  return (
    <main className="bg-[#1E232F] flex-1 flex flex-col w-full px-4 py-2">
      <div className="w-ful ">
        <div className="aspect-[16/7] w-full ">
          <Anime_Featured
            anime={featured}
            activePage={activePage}
            setActivePage={setActivePage}
            setSelectedAnimeId={setSelectedAnimeId}
          />
        </div>
      </div>
      <div className=" mt-5">
        <p className="font-bold text-2xl mb-1">Trending</p>
        <div className="bg-[--mediumlight-D-blue] h-[312px] px-4">
          <Anime_Top10
            anime={topTen}
            activePage={activePage}
            setActivePage={setActivePage}
            setSelectedAnimeId={setSelectedAnimeId}
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
            setSelectedAnimeId={setSelectedAnimeId}
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
