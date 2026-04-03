import { Outlet } from "react-router-dom";
import { FineTaskContent } from "../../FineTaskPage/FineTaskContent";

export const DashboardPanel = () => {
  return (
    <div className=" panel w-full h-11/12 overflow-hidden">
      <Outlet />
    </div>
  );
};
