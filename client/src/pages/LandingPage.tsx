import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import AnimeWatchlist from "../components/AnimeWatchlist";
import AppTimeout from "../components/AppTimeout";
import MoneyTracker from "../components/MoneyTracker";
import SteamTracker from "../components/SteamTracker";
import ToDolist from "../components/ToDolist";

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("anime-watchlist");
  const navigate = useNavigate();

  const goToLogin = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSetActivePage = (page: string) => {
    setActivePage(page);
  };

  let RenderedPage;
  switch (activePage) {
    case "anime-watchlist":
      RenderedPage = <AnimeWatchlist />;
      break;
    case "money-tracker":
      RenderedPage = <MoneyTracker />;
      break;
    case "app-timeout":
      RenderedPage = <AppTimeout />;
      break;
    case "steam-tracker":
      RenderedPage = <SteamTracker />;
      break;
    case "to-do-list":
      RenderedPage = <ToDolist />;
      break;
  }

  const Sidebar = useMemo(
    () => (
      <div className="h-full bg-[--dark-D-blue] flex flex-col w-[346.15px]">
        SIDEBAR - COLLAPSABLE
        <button onClick={toggleSidebar}>Hide Sidebar</button>
      </div>
    ),
    []
  );
  return (
    <div className="bg-[--medium-D-blue] h-screen text-white flex flex-row">
      {/* MAIN WRAPPER */}
      <div className="h-full w-[74px]">
        <button onClick={goToLogin}>Back</button>
        <button onClick={toggleSidebar} className="mb-[50px]">
          Show Sidebar
        </button>
        <div className="flex flex-col">
          <button onClick={() => handleSetActivePage("anime-watchlist")}>
            anime
          </button>
          <button onClick={() => handleSetActivePage("steam-tracker")}>
            steam
          </button>
          <button onClick={() => handleSetActivePage("app-timeout")}>
            app
          </button>
          <button onClick={() => handleSetActivePage("to-do-list")}>
            todo
          </button>
          <button onClick={() => handleSetActivePage("money-tracker")}>
            money
          </button>
        </div>
      </div>
      {/*  */}
      {!isOpen && Sidebar}
      {/*  */}
      <div className="flex-1 h-full ">
        {/* flex-1 take up remaining space =D */}
        <div className="h-[55px] text-black flex flex-row justify-between">
          <div className="flex bg-white relative text-white mb-1">
            <p className="absolute start-0 bottom-0 ">cookies</p>
          </div>
          <div className="text-white flex flex-row bg-blue-400">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </div>
        </div>
        {RenderedPage}
      </div>
    </div>
  );
}
