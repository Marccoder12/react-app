import { Link, NavLink } from "react-router-dom";

export const ViewOpt = () => {
  return (
    <div className="w-full border-b border-blue-300">
      <div className="w-96 flex items-center justify-around">
        <ViewRoute
          path="/home/dashboard/finetasks"
          title="FineTasks"
          selected={true}
        ></ViewRoute>
        <ViewRoute
          path="/home/dashboard/tasks"
          title="Tasks"
          selected={false}
        ></ViewRoute>
      </div>
    </div>
  );
};

const ViewRoute = ({
  path,
  title,
  selected,
}: {
  path: string;
  title: string;
  selected: boolean;
}) => {
  return (
    <NavLink to={path}>
      <div
        className={`items-center justify-between p-2 w-50 text-center font-mono font-bold font-stretch-90%
        ${
          selected
            ? "bg-white border-b-2 border-blue-400 text-stone-950 hover:bg-blue-200"
            : "hover:bg-blue-200 hover:transition-colors rounded-t bg-transparent text-stone-600 shadow-none"
        }`}
      >
        <span className="align-middle text-center">{title}</span>
      </div>
    </NavLink>
  );
};
