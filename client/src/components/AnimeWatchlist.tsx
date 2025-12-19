import AnimeWatchlist_HomePage from "../subcomponents/AnimeWatchlist/AnimeWatchlist_HomePage";
import Anime_About_Page from "../subcomponents/AnimeWatchlist/Anime_About_Page";

type Props = {
  activePage: string;
  setActivePage: (page: string) => void;
};

export default function AnimeWatchlist({ activePage, setActivePage }: Props) {
  console.log("AnimeWatchlist activePage:", activePage); // Debug log
  console.log("AnimeWatchlist setActivePage:", setActivePage); // Debug log

  // flerx-1 take up available space
  switch (activePage) {
    case "anime-watchlist":
      return (
        <AnimeWatchlist_HomePage
          activePage={activePage}
          setActivePage={setActivePage}
        />
      );
    case "animewatchlist:aboutpage":
      console.log("anime about page");
      return <Anime_About_Page />;
    default:
      console.log("no matching cae for active page", activePage);
      return null;
  }
}
