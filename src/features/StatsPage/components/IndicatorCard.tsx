import { BiSquare } from "react-icons/bi";

export const successCard = () => {
  return;
  <div className='w-full flex flex-row gap-2 items-center'>
    <BiSquare className='text-red-200' />
    <span className='text-white text-xl'>Failed</span>
  </div>;
};
export const FailedCard = ({
  flag,
  name,
  amount,
}: {
  flag: boolean;
  name: string;
  amount: string;
}) => {
  return (
    <div className='w-full flex flex-row gap-2 items-center'>
      {flag ? (
        <BiSquare className='text-red-200' />
      ) : (
        <BiSquare className='text-green-200' />
      )}
      <span className='text-white text-xl'>Failed</span>
    </div>
  );
};
