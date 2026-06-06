import { EditContent } from "./EditContent";

export const FineTaskEditContent = () => {
    return (
              <div className="bg-white shadow border-2 border-stone-100 h-full flex-1 rounded-xl">
                <EditContent title="Buy Eggs" isEmpty={true} />
              </div>
    );
}