import React from "react";
import { IconType } from "react-icons";
import { FiCode, FiGrid, FiHome, FiSettings, FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export const RouteSelect = () => {
  return (
    <div className="space-y-4">
      <Route
        path="/home/dashboard"
        Icon={FiHome}
        selected={true}
        title="DashBoard"
      />
      <Route path="/home/Stats" Icon={FiGrid} selected={false} title="Stats" />
      <Route
        path="/home/Settings"
        Icon={FiSettings}
        selected={false}
        title="Settings"
      />
      <Route path="/home/User" Icon={FiUser} selected={false} title="User" />
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
  path,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
  path: string;
}) => {
  return (
    <NavLink to={path} end={false} className={({ isActive }) => `flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm 
    transition-[box-shadow,background-color,color] ${
      selected
      ? "bg-white text-stone-950 shadow"
      : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
      }`
    }>
        <Icon />
        {title}
      </NavLink>
  );
};
