import { useTheme } from "../../../../context/ThemeContext";
import AccountToggle from "./components/AccountToggle";
import { Plan } from "./components/Plan";
import { RouteSelect } from "./components/RouteSelect";
export default function SideNav() {
  
  return (
    <div>
      <div
        className={`sticky top-4 h-[calc(100vh-32px-48px)] pt-4 bg-[#1f1f1f]`}
        //     className="overflow-y-scroll
        //  sticky top-4 h-[calc(100vh-32px-48px)]"
      >
        <AccountToggle />
        <RouteSelect />
        {/* <div className="bg-blue-300 h-[200px] w-full p-4 rounded">Ad</div> */}
      </div>
      <Plan />
    </div>
  );
}
