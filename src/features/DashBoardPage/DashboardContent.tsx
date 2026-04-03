import { Outlet } from "react-router-dom";

import { ViewOpt } from "./components/ViewOpt";
import { DashboardPanel } from "./components/DashboardPanel";

export const DashBoardContent = () => {
  return (
    <>
      <ViewOpt></ViewOpt>
      <DashboardPanel />
    </>
  );
};
