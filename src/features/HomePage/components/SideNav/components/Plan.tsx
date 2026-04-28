import { Link } from "react-router-dom";

export const Plan = () => {
  return (
    <div
      className=" flex sticky top-[calc(100%-48px-16px)]
    flex-col h-12 border-t px-2 border-stone-300 justify-end text-xs"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold">Basic</p>
          <p className="text-stone-500">Pay as you Go</p>
        </div>
        <Link
          to={"/subscription"}
          className="px-2 py-1.5 font-medium bg-blue-400 hover:bg-blue-300 transition-colors rounded"
        >
          Upgrade
        </Link>
      </div>
    </div>
  );
};
