import React from "react";
import { IconType } from "react-icons";
import { FiCode, FiGrid, FiHome, FiSettings, FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export const RouteSelect = () => {
  return (
    <div className="space-y-2">
      <Route path="/home/dashboard/finetasks" Icon={FiHome} title="DashBoard" />
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
      }) => `flex items-center justify-start gap-2 w-full rounded px-2 py-4 text-sm 
    transition-[box-shadow,background-color,color] ${
      isActive
        ? "bg-white text-stone-950 shadow"
        : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
    }`}
    >
      <Icon />
      {title}
    </NavLink>
  );
};
