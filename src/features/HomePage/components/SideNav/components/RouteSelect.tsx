import React from "react";
import { IconType } from "react-icons";
import { FiCode, FiGrid, FiHome, FiSettings, FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export const RouteSelect = () => {
  return (
    <div className="space-y-2">
      <Route path="/home/dashboard" Icon={FiHome} title="DashBoard" />
      <Route path="/home/stats" Icon={FiGrid} title="Stats" />
      <Route path="/home/settings" Icon={FiSettings} title="Settings" />
      {/* <Route path="/home/user" Icon={FiUser} title="User" /> */}
    </div>
  );
};

const Route = ({
  Icon,
  title,
  path,
}: {
  Icon: IconType;
  title: string;
  path: string;
}) => {
  return (
    <NavLink
      to={path}
      end={false}
      className={({
        isActive,
      }) => `flex items-center justify-start gap-2 w-full px-2 py-4 text-sm 
    transition-[box-shadow,background-color,color] ${
      isActive
        ? "bg-[#525252] text-stone-50 pl-7.5 shadow border-l-4 border-gray-300 hover:bg-[#363636a4] transition-all"
        : "hover:border-l-2 hover:border-gray-300 text-gray-200 shadow-none hover:pl-7.5 hover:bg-[#363636ab] transition-all"
    }`}
    >
      <Icon />
      {title}
    </NavLink>
  );
};
