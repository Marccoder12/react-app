import { ReactNode } from "react";
import { IconType } from "react-icons";
import { BiCheck, BiCross } from "react-icons/bi";
import { FaCross } from "react-icons/fa";
import { FiX, FiXCircle } from "react-icons/fi";

export const PlanCardList = () => {
  return (
    <div className='w-full relative h-[70%] flex items-center justify-center gap-6 p-10'>
      <PlanCard
        title='Free'
        price={0}
        children={
          <>
            <PlanOption
              featureName='Tasks Limit'
              flag={true}
              desc='unlimited'
            />
            <PlanOption
              featureName='Finetask Limit'
              flag={true}
              desc='5 finetasks'
            />
            <PlanOption
              featureName='FinetaskGroup'
              flag={false}
              desc='not available'
            />
          </>
        }
      />
      <PlanCard
        title='Student'
        price={1500}
        highlight={true}
        children={
          <>
            <PlanOption
              featureName='Tasks Limit'
              flag={true}
              desc='unlimited'
            />
            <PlanOption
              featureName='Finetask Limit'
              flag={true}
              desc='100 finetasks'
            />
            <PlanOption featureName='FinetaskGroup' flag={true} desc='4' />
          </>
        }
      />
      <PlanCard
        title='Pro'
        price={3500}
        children={
          <>
            <PlanOption
              featureName='Tasks Limit'
              flag={true}
              desc='unlimited'
            />
            <PlanOption
              featureName='Finetask Limit'
              flag={true}
              desc='unlimited'
            />
            <PlanOption featureName='FinetaskGroup' flag={true} desc='10' />
          </>
        }
      />
    </div>
  );
};

const PlanCard = ({
  title,
  price,
  highlight,
  children,
}: {
  title: string;
  price: number;
  highlight?: boolean;
  children?: ReactNode;
}) => {
  return (
    <div
      className={`flex flex-col bg-[#212121] flex-1 min-w-60 h-full rounded-xl ${highlight === true ? "border-2 border-[#50A2FF]" : "border border-[#5f5f5f3b]"} p-4`}
    >
      <div className='flex flex-col'>
        <h2 className='pl-3 text-2xl font-bold text-[#ccc]'>{title}</h2>
        <span className='inline-block pl-5 p-8 text-xl text-[#ccc] font-bold'>
          ₦
          <h3 className='inline text-xl text-[#ccc] font-bold'>
            {formatWithCommas(price)}
          </h3>
        </span>
      </div>
      <div className='flex grow h-full mb-8 flex-col overflow-x-hidden overflow-y-auto no-scrollbar'>
        {children}
      </div>
      <button className='items-center bg-[#3d66d6] content-end mb-4 p-3 rounded-xl font-bold text-xl text-[#e2e7ff]'>
        Pay
      </button>
    </div>
  );
};

const PlanOption = ({
  flag,
  featureName,
  desc,
}: {
  flag?: boolean;
  featureName: string;
  desc?: string;
}) => {
  return (
    <div className={`flex p-3 justify-between border-b border-b-[#a0a0a05b]`}>
      <h2 className='text-[#e4e4e4] text-xl font-semibold flex gap-2'>
        {flag ? (
          <BiCheck className='text-green-500 text-md self-end' />
        ) : (
          <FiXCircle className='block text-red-500 pb-0.5 self-end' />
        )}
        {featureName}
      </h2>
      <span className='self-end text-[#e4e4e4] text-md'>{desc}</span>
    </div>
  );
};

export const formatWithCommas = (value: number | string): string => {
  const num = typeof value === "string" ? Number(value) : value;
  if (isNaN(num)) return "0";
  return Math.round(num).toLocaleString("en-NG");
};
