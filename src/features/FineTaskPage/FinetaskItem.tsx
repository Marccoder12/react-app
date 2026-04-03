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
    <div className="flex flex-col items-center justify-between bg-white-50 w-full h-32 rounded-2xl shadow shadow-gray-300 hover:transition-colors hover:bg-stone-200">
      <div className="p-4 h-full w-full">
        <h1 className="font-bold font-sans text-4xl text-ellipsis">{title}</h1>
      </div>
      <div className="h-full w-full border-t-4 border-blue-300 rounded-b-2xl flex justify-between">
        <div className="pl-4 w-[50%] border-r-2 border-blue-300">
          <span className="text-3xl font-bold">{currency}</span>
          <span className=" text-3xl font-semibold">{price.toString()}</span>
        </div>
        <div className=" w-[50%] pr-4 justify-end text-right border-l-2 border-blue-300">
          <span className=" text-3xl font-semibold">{dueDate}</span>
        </div>
      </div>
    </div>
  );
};
