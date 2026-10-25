import { FiBell } from "react-icons/fi";
import { useAuth } from "../../../context/AuthContext";
import { data, Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { Toggle } from "../../../components/SmallComps";
import { useEffect, useState } from "react";
const date = new Date();
export const Topbar = ({ name }: { name: string }) => {
  const date = useNow();
  const dayName = date.toLocaleDateString("en-GB", { weekday: "long" });
  const month = date.toLocaleDateString("en-GB", { month: "short" });

  const handleTimeName = () => {
    let hr = date.getHours();
    if (hr < 5) {
      return "Good Night";
    }
    if (hr < 12) {
      return "Good Morning";
    } else if (hr < 17) {
      return "Good Afternoon";
    } else if (hr < 21) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
    return "";
  };

  const handleMonthName = () => {
    let name = "";
    switch (date.getMonth()) {
      case 0:
        name = "Jan";
        break;
      case 1:
        name = "Feb";
        break;
      case 2:
        name = "Mar";
        break;
      case 3:
        name = "Apr";
        break;
      case 4:
        name = "May";
        break;
      case 5:
        name = "Jun";
        break;
      case 6:
        name = "Jul";
        break;
      case 7:
        name = "Aug";
        break;
      case 8:
        name = "Sept";
        break;
      case 9:
        name = "Oct";
        break;
      case 10:
        name = "Nov";
        break;
      case 11:
        name = "";
        break;
    }
    return name;
  };

  const handleDayName = () => {
    let name = "";
    switch (date.getDay()) {
      case 0:
        name = `Sunday`;
        break;
      case 1:
        name = `Monday`;
        break;
      case 2:
        name = `Tuesday`;
        break;
      case 3:
        name = `Wednesday`;
        break;
      case 4:
        name = `Thursday`;
        break;
      case 5:
        name = `Friday`;
        break;
      case 6:
        name = `Saturday`;
        break;
    }
    return name;
  };
  return (
    <div className='w-full border-b px-4 mt-2 pb-4 border-stone-200'>
      <div className='flex items-center justify-between p-0.5'>
        <div>
          <span className='text-sm pb-2 font-bold block text-gray-200'>
            {handleTimeName()} {name}
          </span>
          <span className='text-[16px] block text-stone-500'>
            Today is:{" "}
            <span className='text-md font-semibold text-[#d8d8d8]'>
              {dayName} {month} {date.getFullYear()}
            </span>
          </span>
        </div>
        <TopBarTime />
        <Link
          to={"/home/notification"}
          className='flex text-sm items-center gap-2 shadow transition-colors hover:bg-[#383838a8] hover:text-blue-700 px-3 py-1.5 rounded'
        >
          <FiBell className='text-lg text-gray-300' />
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

const useNow = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let timeout: number;

    const schedule = () => {
      // ms until the next minute boundary, so the clock flips exactly on :00
      const delay = 60000 - (Date.now() % 60000);
      timeout = window.setTimeout(() => {
        setNow(new Date());
        schedule();
      }, delay);
    };

    schedule();
    return () => window.clearTimeout(timeout);
  }, []);

  return now;
};
const TopBarTime = () => {
  const now = useNow();

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }); // e.g. "12:05 AM"

  return (
    <div>
      <span className='text-white font-semibold text-2xl'>{time}</span>
    </div>
  );
};
