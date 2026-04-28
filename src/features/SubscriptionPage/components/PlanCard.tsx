export const PlanCard = () => {
  return (
    <div className=" w-[50%] h-[70%] bg-stone-50 p-4 border-2 border-blue-300 rounded-xl">
      <header className="flex justify-center items-center w-full border-b border-stone-200">
        <span className="font-bold text-2xl text-stone-600">Subscription</span>
      </header>
      <div className="flex grow w-full h-11/12">
        {/* Features */}
        <div className="p-2 space-y-4 flex-2/6 rounded-bl-xl border-l border-b border-r border-stone-300">
          <header className="flex justify-center gap-2">
            <span>Features</span>
          </header>
          <ul className="space-y-9 h-11/12">
            <li>
              <span className="flex justify-center">Task Limit</span>
            </li>
            <li>
              <span className="flex justify-center">Task Limit</span>
            </li>
            <li>
              <span className="flex justify-center">Task Limit</span>
            </li>
            <li>
              <span className="flex justify-center">Task Limit</span>
            </li>
          </ul>
        </div>

        {/* Plan Options */}
        <div className="p-2 flex-1 border-r border-b border-stone-300 items-center">
          <header className="flex justify-center">
            <span>Basic</span>
          </header>
        </div>
        <div className="p-2 flex-1 border-r border-b border-stone-300 items-center">
          <header className="flex justify-center">
            <span>Pro</span>
          </header>
        </div>
        <div className=" p-2 flex-1 rounded-br-xl border-r border-b border-stone-300 items-center">
          <header className="flex justify-center">
            <span>Enterprise</span>
          </header>
        </div>
      </div>
    </div>
  );
};
