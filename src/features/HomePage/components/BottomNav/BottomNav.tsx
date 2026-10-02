import { useTheme } from "../../../../context/ThemeContext";
import AccountToggle from "../SideNav/components/AccountToggle";
import { Plan } from "../SideNav/components/Plan";
import { RouteSelect } from "../SideNav/components/RouteSelect";
export default function BottomNav() {
  return (
    <div className='hidden not-md:flex not-md:w-full'>
      <div
        className={`sticky top-4 pt-4 bg-[#1f1f1f]  not-md:w-full not-md:flex not-md:flex-row`}
        //     className="overflow-y-scroll
        //  sticky top-4 h-[calc(100vh-32px-48px)]"
      >
        {/* <AccountToggle /> */}
        <RouteSelect />
        {/* <div className="bg-blue-300 h-[200px] w-full p-4 rounded">Ad</div> */}
      </div>
      {/* <Plan /> */}
    </div>
  );
}
