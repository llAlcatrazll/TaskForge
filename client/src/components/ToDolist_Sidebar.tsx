type Props = {
  activePage: string;
  setActivePage: (page: string) => void;
};
import { MdOutlineCheckBox } from "react-icons/md";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
export default function ToDolist_Sidebar({ activePage, setActivePage }: Props) {
  return (
    <div className="flex flex-col">
      <p className="mt-5 mb-6 font-semibold text-xl px-2 text-[--medium-gray]">
        Tools
      </p>
      <button
        className="w-full mb-5 mx-4 flex"
        onClick={() => setActivePage("to-do-list:tasks")}
      >
        <MdOutlineCheckBox size={25} color="var(--medium-gray)" />
        <p className="font-medium text-[--medium-gray] ml-1">Tasks</p>
      </button>
      <button
        className="w-full mb-5 mx-4 flex"
        onClick={() => setActivePage("to-do-list:calendar")}
      >
        <IoCalendarNumberSharp size={25} color="var(--medium-gray)" />
        <p className="font-medium text-[--medium-gray] ml-1">Calendar</p>
      </button>
      <button
        className="w-full mb-5 mx-4 flex"
        onClick={() => setActivePage("to-do-list:notes")}
      >
        <CgNotes size={25} color="var(--medium-gray)" />
        <p className="font-medium text-[--medium-gray] ml-1">Notes</p>
      </button>
    </div>
  );
}
