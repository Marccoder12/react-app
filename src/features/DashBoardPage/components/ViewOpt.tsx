import { Link, NavLink } from "react-router-dom";

export const ViewOpt = () => {
  return (
    <div className="w-full ">
      <div className="w-96 flex items-center justify-around">
        <ViewRoute
          path="/home/dashboard/finetasks"
          title="FineTasks"
        ></ViewRoute>
        <ViewRoute path="/home/dashboard/tasks" title="Tasks"></ViewRoute>
      </div>
    </div>
  );
};

const ViewRoute = ({ path, title }: { path: string; title: string }) => {
  return (
    <NavLink
      to={path}
      className={({
        isActive,
      }) => `items-center justify-between p-2 w-50 text-center font-mono font-bold font-stretch-90%
        ${
          isActive
            ? " border-b-4 border-blue-400 text-gray-200 hover:bg-[#272727]"
            : "hover:bg-[#3b3b3b8a] hover:transition-colors rounded-t bg-transparent text-gray-400 shadow-none"
        }`}
    >
      <div>
        <span className="align-middle text-center">{title}</span>
      </div>
    </NavLink>
  );
};
