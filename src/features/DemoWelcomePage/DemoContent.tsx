import { Link } from "react-router-dom";
const DemoContent = () => {
return (<div className="w-full h-full flex flex-col items-center justify-center gap-y-30">
    <span className="text-2xl font-bold">Welcome to Finetask Demo</span>
                <Link to="/auth/register" className="bg-blue-400 p-4 px-8 rounded-lg hover:bg-blue-500 cursor-pointer text-xl">Start</Link>
                </div>);
}

export default DemoContent;