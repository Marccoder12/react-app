import { FiBell } from "react-icons/fi";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { Toggle } from "../../../components/SmallComps";
const date = new Date();
export const Topbar = ({ name }: { name: string }) => {
  const { signOut } = useAuth();
  // const { darkMode, useChangeTheme } = useTheme();
  let date = new Date();
const handleTimeName = () => {
  let hr = date.getHours();
  if(hr < 12){
  return "Good Morning";
}else if(hr < 17){
  return "Good Afternoon";
}else if(hr < 21){
  return "Good Evening";
}else{
  return "Good Night";
}
return "";
}
  const handleDayName = () => {
    let name = "";
    switch (date.getDay()) {
      case 0:
        name = "Sunday";
        break;
      case 1:
        name = "Monday";
        break;
      case 2:
        name = "Tuesday";
        break;
      case 3:
        name = "Wednesday";
        break;
      case 4:
        name = "Thursday";
        break;
      case 5:
        name = "Friday";
        break;
      case 6:
        name = "Saturday";
        break;
      }
      console.log(date.getDay())
      console.log(name);
      return name;
  }
  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block text-gray-200">{handleTimeName()} {name}</span>
          <span className="text-[16px] block text-stone-500">Today is: <span className="text-md font-semibold text-[#d8d8d8]">{handleDayName()}</span></span>
        </div>
        <Link
          to={"/home/notification"}
          className="flex text-sm items-center gap-2 shadow transition-colors hover:bg-violet-100 hover:text-blue-700 px-3 py-1.5 rounded"
        >
          <FiBell className="text-lg text-gray-300" />
        </Link>
        {/* <button
          onClick={signOut}
          className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-blue-700 px-3 py-1.5 rounded"
        >
          <FiLogOut />
          <span>Sign Out</span>
        </button> */}
        {/* <Toggle name="DarkMode" onToggle={useChangeTheme} /> */}
      </div>
    </div>
  );
};
