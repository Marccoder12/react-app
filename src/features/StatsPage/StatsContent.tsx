import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { BiSquare } from "react-icons/bi";
import { useFineTask } from "../FineTaskPage/context/FineTaskContext";
import { FTLoader } from "../FineTaskPage/components/FTLoader";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// Define props type (optional)
interface MyChartProps {
  labels: string[];
  dataPoints: number[];
}

const MyChart: React.FC<MyChartProps> = ({ labels, dataPoints }) => {
  // Chart data
  const data = {
    labels,
    datasets: [
      {
        label: "FineTasks",
        data: dataPoints,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0)",
        tension: 0.2, // smooth curve,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: "Finance Tracker",
        color: "#4bc0c0",
        size: 60,
        weight: "bold",
        family: "Arial-Black",
      },
    },
  };

  return (
    <div className='w-full h-full'>
      <Line
        style={{ width: "100%", height: "100%" }}
        data={data}
        options={options}
      />
    </div>
  );
};

export const StatsContent = () => {
  const { fineTasks, loading } = useFineTask();
  const labels = ["fail", "success", "success", "fail", "fail", "success"];
  const salesData = [150, 200, 180, 220, 300, 250];

  if (loading) {
    // {isLoading ? <BookLoader /> : <TaskList tasks={tasks} />}

    return (
      <div className='bg-[#272727] h-full w-full'>
        {/* <WalletLoader /> */}
        <FTLoader />
      </div>
    );
  }

  return (
    <div className='text-white w-full h-11/12 font-bold p-5'>
      <section className='w-full h-full flex flex-col p-5'>
        <div className='w-full h-8/12 bg-[#474747]'>
          <MyChart labels={labels} dataPoints={salesData} />
        </div>
        <div className='w-full h-full flex flex-row pt-2 gap-2'>
          <div className='w-full h-full bg-[#474747]'>
            <ul className='p-5 '>
              {fineTasks.map((fineTask) => {
                return <></>;
              })}
            </ul>
          </div>
          <div className='w-full h-full bg-[#474747]'></div>
        </div>
      </section>
    </div>
  );
};
