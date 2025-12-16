import { MdPerson } from "react-icons/md";
import { FaEllipsisH } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
export default function SideBar_Menus() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="bg-[--light-D-blue] w-[40px] h-[40px] rounded-full items-center justify-center flex mb-2">
        <FaEllipsisH size={18} color="var(--medium-gray)" />
      </div>
      <div className="bg-[--light-D-blue] w-[40px] h-[40px] rounded-full items-center justify-center flex mb-2">
        <MdPerson size={23} color="var(--medium-gray)" />
      </div>
      <div className="bg-[--light-D-blue] w-[40px] h-[40px] rounded-full items-center justify-center flex mb-2">
        <IoMdNotifications size={23} color="var(--medium-gray)" />
      </div>
    </div>
  );
}
