export const PlanCardList = () => {
  return (
    <div className='w-[70%] h-[70%] flex items-center justify-center gap-6'>
      <PlanCard title='Free' price={0} />
      <PlanCard title='Student' price={1500} highlight={true} />
      <PlanCard title='Pro' price={3500} />
    </div>
  );
};

const PlanCard = ({
  title,
  price,
  highlight,
}: {
  title: string;
  price: number;
  highlight?: boolean;
}) => {
  return (
    <div
      className={`flex-1 bg-[#212121] h-full rounded-xl ${highlight === true ? "border-2 border-[#50A2FF]" : "border border-[#5f5f5f3b]"} p-4`}
    >
      <h2 className='pl-3 text-xl text-[#ccc]'>{title}</h2>
      <span className='inline-block pl-5 p-8 text-xl text-[#ccc] font-bold'>
        ₦
        <h3 className='inline text-xl text-[#ccc] font-bold'>
          {formatWithCommas(price)}
        </h3>
      </span>
    </div>
  );
};

export const formatWithCommas = (value: number | string): string => {
  const num = typeof value === "string" ? Number(value) : value;
  if (isNaN(num)) return "0";
  return Math.round(num).toLocaleString("en-NG");
};
