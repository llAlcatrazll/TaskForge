import { useState, useMemo, useCallback, type JSX } from "react";
import { useNavigate } from "react-router-dom";

import AnimeWatchlist from "../components/AnimeWatchlist";
import AppTimeout from "../components/AppTimeout";
import MoneyTracker from "../components/MoneyTracker";
import SteamTracker from "../components/SteamTracker";
import ToDolist from "../components/ToDolist";
import ToDolist_Sidebar from "../components/ToDolist_Sidebar";
import SteamTracker_Sidebar from "../components/SteamTracker_Sidebar";
import AnimeWatchlist_Sidebar from "../components/AnimeWatchlist_Sidebar";
import AppTimeout_Sidebar from "../components/AppTimeout_Sidebar";
import MoneyTracker_Sidebar from "../components/MoneyTracker_Sidebar";

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("anime-watchlist");
  const [activeSidebar, setActiveSidebar] = useState("animewatchlist_sidebar");
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
    case "to-do-list:calendar":
    case "to-do-list:tasks":
    case "to-do-list:notes":
      RenderedPage = <ToDolist activePage={activePage} />;
      break;

    default:
      RenderedPage = null;
  }

  let RenderedSidebar: JSX.Element | null;
  switch (activePage) {
    case "anime-watchlist":
      RenderedSidebar = <AnimeWatchlist_Sidebar />;
      break;
    case "money-tracker":
      RenderedSidebar = <MoneyTracker_Sidebar />;
      break;
    case "app-timeout":
      RenderedSidebar = <AppTimeout_Sidebar />;
      break;
    case "steam-tracker":
      RenderedSidebar = <SteamTracker_Sidebar />;
      break;
    // CASE STACKING -- for double sidebar manipulation with props
    case "to-do-list":
    case "to-do-list:calendar":
    case "to-do-list:tasks":
    case "to-do-list:notes":
      RenderedSidebar = (
        <ToDolist_Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
        />
      );
      break;
  }

  const Sidebar = useMemo(
    () => (
      <div className="h-full bg-[--dark-D-blue] flex flex-col w-[346.15px]">
        SIDEBAR - COLLAPSABLE
        <button onClick={toggleSidebar}>Hide Sidebar</button>
        {/* <ToDolist_Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
        /> */}
        {RenderedSidebar}
      </div>
    ),
    [toggleSidebar, activePage]
  );
  const headerItems = [
    { id: 1, icon: "1" },
    { id: 2, icon: "2" },
    { id: 3, icon: "3" },
  ];
  return (
    <div className="bg-[--medium-D-blue] h-screen text-white flex flex-row">
      {/* MAIN WRAPPER */}
      <div className="h-full w-[74px]">
        {/* SIDEBAR */}
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
          <button onClick={() => handleSetActivePage("to-do-list:calendar")}>
            todo
          </button>
          <button onClick={() => handleSetActivePage("money-tracker")}>
            money
          </button>
        </div>
      </div>
      {!isOpen && Sidebar}
      <div className="flex-1 h-full overflow-x-hidden overflow-y-hidden">
        {/* flex-1 take up remaining space =D */}
        <div className="h-[55px] text-black flex flex-row justify-between">
          <div className="flex bg-white relative text-white mb-1">
            <p className="absolute start-0 bottom-0 ">cookies</p>
          </div>
          <div className="text-white flex flex-row">
            {/* THREE BUTTONS */}
            {headerItems.map((item) => (
              <div
                key={item.id}
                className="aspect-square rounded-full mb-2 bg-[--light-D-blue] h-[38px]  mt-4 mr-2"
              >
                {item.icon}
              </div>
            ))}
            <div className="aspect-square bg-[--light-D-blue] w-[150px] rounded-full mt-2 mr-6 flex items-center justify-end pr-1">
              {/* PROFILE */}
              <div className="mr-2">
                <p>Username</p>
              </div>
              <div className="bg-black aspect-square w-[41px] align-content-end rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="  h-full overflow-scroll flex flex-1">
          {/* PAGE CHANGE */}
          {RenderedPage}
        </div>
      </div>
    </div>
  );
}
