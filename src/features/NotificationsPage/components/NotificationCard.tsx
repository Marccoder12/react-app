export const NotificationCard = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => {
  return (
    <div className="shadow w-8/14 rounded-xl bg-stone-300 hover:bg-stone-400">
      {/* Header */}
      <div className="border-b p-2 font-semibold border-stone-200">
        <h2>{title}</h2>
      </div>
      <div className=" pl-4 p-2">
        <span>{message}</span>
      </div>
    </div>
  );
};
