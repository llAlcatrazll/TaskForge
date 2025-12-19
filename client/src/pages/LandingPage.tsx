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
import SideBar_Menus from "../components/SideBar_Menus";
import SideBar_Profile from "../components/SideBar_Profile";
import { FaSteam } from "react-icons/fa";
import { TbChecklist } from "react-icons/tb";
import { VscLayoutSidebarLeft, VscLayoutSidebarLeftOff } from "react-icons/vsc";
import { SiCrunchyroll, SiPointy } from "react-icons/si";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import Anime_About_Page from "../subcomponents/AnimeWatchlist/Anime_About_Page";
// import Anime_About_Page from "../subcomponents/AnimeWatchlist/Anime_About_Page";
export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("anime-watchlist");
  // const [activeSidebar, setActiveSidebar] = useState("animewatchlist_sidebar");
  // const navigate = useNavigate();

  // const goToLogin = useCallback(() => {
  //   navigate("/");
  // }, [navigate]);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSetActivePage = (page: string) => {
    console.log("Set active page to:", page);
    setActivePage(page);
  };

  let RenderedPage;
  switch (activePage) {
    case "anime-watchlist":
      // RenderedPage = <Anime_About_Page />;
      RenderedPage = (
        <AnimeWatchlist
          activePage={activePage}
          setActivePage={(page) => {
            console.log("LandingPage setActivePage:", page); // Debug log
            setActivePage(page);
          }}
        />
      );
      break;
    // DONT FORGET TO ADD CASE FOR SUBPAGES IDIOT!!!!
    case "animewatchlist:aboutpage":
      RenderedPage = <Anime_About_Page />;
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
    case "animewatchlist:aboutpage":
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
      <div className="h-full bg-[--dark-D-blue] flex flex-col w-auto transition-all duration-500 ease-in-out">
        {RenderedSidebar}
      </div>
    ),
    [toggleSidebar, activePage]
  );

  return (
    <div className="bg-[--medium-D-blue] h-screen text-white flex flex-row">
      {/* MAIN WRAPPER */}
      <div className="h-full w-[60px] flex flex-col justify-between">
        {/* SIDEBAR */}
        <div>
          {" "}
          {isOpen ? (
            <button onClick={toggleSidebar} className="mb-10 flex mt-2 mx-auto">
              <VscLayoutSidebarLeftOff size={25} color="var(--medium-gray)" />
            </button>
          ) : (
            <button onClick={toggleSidebar} className="mb-10 flex mt-2 mx-auto">
              <VscLayoutSidebarLeft size={25} color="var(--medium-gray)" />
            </button>
          )}
          <div className="flex flex-col">
            {/* ANIME WATCH LIST BUTTON */}
            <button
              onClick={() => handleSetActivePage("anime-watchlist")}
              className="flex mx-auto mb-6"
            >
              <SiCrunchyroll size={27} color="var(--medium-gray)" />
            </button>
            <button
              onClick={() => handleSetActivePage("steam-tracker")}
              className="flex mx-auto mb-6"
            >
              <FaSteam size={27} color="var(--medium-gray)" />
            </button>
            <button
              onClick={() => handleSetActivePage("app-timeout")}
              className="flex mx-auto mb-6"
            >
              <SiPointy size={27} color="var(--medium-gray)" />
            </button>
            <button
              onClick={() => handleSetActivePage("to-do-list:calendar")}
              className="flex mx-auto mb-6"
            >
              <TbChecklist size={27} color="var(--medium-gray)" />
            </button>
            <button
              onClick={() => handleSetActivePage("money-tracker")}
              className="flex mx-auto mb-6"
            >
              <RiMoneyDollarCircleFill size={27} color="var(--medium-gray)" />
            </button>
          </div>
        </div>
        <div className="mt-auto flex flex-col">
          <div>
            <SideBar_Menus />
          </div>
          <div>
            <SideBar_Profile />
          </div>
        </div>
      </div>
      {!isOpen && Sidebar}
      <div className="flex-1 h-full overflow-hidden min-w-0">
        {/* flex-1 take up remaining space =D */}
        <div className=" overflow-y-scroll overflow-x-hidden h-full  flex flex-1 min-w-0">
          {/* PAGE CHANGE */}
          {RenderedPage}
        </div>
      </div>
    </div>
  );
}
