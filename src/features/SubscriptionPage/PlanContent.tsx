import { PlanCardList } from "./components/PlanCardList";

export const PlanContent = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <h1 className='text-[#a8a8a8b9] text-[30px] font-bold'>
        Choose Your Plan
      </h1>
      <h2 className='text-[#c5c5c544] text-[20px] pb-2'>
        Upgrade anytime.cancel anytime
      </h2>
      <PlanCardList />
    </div>
  );
};
