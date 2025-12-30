import AnimeWatchlist_HomePage from "../subcomponents/AnimeWatchlist/AnimeWatchlist_HomePage";
import Anime_About_Page from "../subcomponents/AnimeWatchlist/Anime_About_Page";

type Props = {
  activePage: string;
  setActivePage: (page: string) => void;
  setSelectedAnimeId: (id: number) => void;
  selectedAnimeId: number | null; // Correctly added here
};

export default function AnimeWatchlist({
  activePage,
  setActivePage,
  setSelectedAnimeId,
  selectedAnimeId, // Destructure this prop
}: Props) {
  console.log("AnimeWatchlist activePage:", activePage); // Debug log
  console.log("AnimeWatchlist setActivePage:", setActivePage); // Debug log

  switch (activePage) {
    case "anime-watchlist":
      return (
        <AnimeWatchlist_HomePage
          activePage={activePage}
          setActivePage={setActivePage}
          setSelectedAnimeId={setSelectedAnimeId} // Pass it to Anime_Top10
        />
      );
    case "animewatchlist:aboutpage":
      console.log("anime about page");
      return (
        <Anime_About_Page
          animeId={selectedAnimeId}
          setActivePage={setActivePage}
        />
      ); // Pass selectedAnimeId here
    default:
      console.log("no matching case for active page", activePage);
      return null;
  }
}
