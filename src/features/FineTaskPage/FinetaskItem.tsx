export const FineTaskItem = ({
  title,
  price,
  currency,
  dueDate,
  taskId,
}: {
  title: string;
  price: Number;
  currency: "N" | "$" | string;
  dueDate: string;
  taskId: string;
}) => {
  return (
    <div className="flex flex-col transition-all border-white bg-white items-center justify-between bg-white-50 w-full h-32 rounded-2xl shadow shadow-gray-300 hover:bg-stone-50 cursor-pointer hover:border-blue-400 hover:transition-all hover:border-4">
      <div className="bg-blue-200 rounded-t-xl p-4 h-full w-full">
        <h1 className="text-blue-800 font-bold font-sans text-4xl text-ellipsis">
          {title}
        </h1>
      </div>
      <div className="h-full w-full border-t-4 border-blue-300 rounded-b-2xl flex justify-between">
        <div className="pl-4 w-[50%] border-r-2 border-blue-300">
          <span className="text-3xl font-bold">{currency}</span>
          <span className=" text-3xl font-semibold">{price.toString()}</span>
        </div>
        <div className=" w-[50%] pr-4 pt-2 justify-end text-right border-l-2 border-blue-300">
          <span className="text-stone-400 text-2xl font-semibold">
            {dueDate}
          </span>
        </div>
      </div>
    </div>
  );
};
