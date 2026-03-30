import AccountToggle from "./components/AccountToggle";
import { Plan } from "./components/Plan";
import { RouteSelect } from "./components/RouteSelect";
export default function SideNav() {
  return (
    <div>
      <div
        className="overflow-y-scroll
     sticky top-4 h-[calc(100vh-32px-48px)]"
      >
        <AccountToggle />
        <RouteSelect />
      </div>
      <Plan />
    </div>
  );
}
