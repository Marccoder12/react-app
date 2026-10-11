// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   BarElement,
//   ChartData,
// } from "chart.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Line } from "react-chartjs-2";
import { BiSquare } from "react-icons/bi";
import { useFineTask } from "../../context/FineTaskContext";
import { FTLoader } from "../FineTaskPage/components/FTLoader";
import { FiBox } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useStats } from "../../context/StatsContext";
import { useEffect, useMemo, useRef, useState } from "react";

// Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// );

type TaskStatus =
  | "created"
  | "updated"
  | "deleted"
  | "resolved"
  | "pending"
  | "failed";
const pointColors: Record<TaskStatus, string> = {
  created: "#22C55E",
  updated: "#3b82F6",
  deleted: "#EF4444",
  resolved: "#34fdba",
  pending: "#F59E0B",
  failed: "#f50931",
};
// Define props type (optional)
interface MyChartProps {
  labels: string[];
  dataPoints: number[];
  statuses: TaskStatus[]; // same length as dataPoints
}

// const data = [
//   { day: "1", changes: 3 },
//   { day: "2", changes: 38 },
//   { day: "3", changes: 20 },
//   { day: "4", changes: 7 },
//   { day: "5", changes: 4 },
//   { day: "5", changes: 80 },
//   { day: "5", changes: 20 },
//   { day: "5", changes: 4 },
//   { day: "5", changes: 25 },
//   { day: "5", changes: 4 },
// ];

import { StatsEntry } from "../../Utils/types"; // adjust path

export interface DailyStat {
  date: string; // "2026-10-07"
  label: string; // "Oct 7"
  count: number; // bar height
  topStatus: string | null; // most common status that day
}

// Edit the keys to match the statuses in your database
export const STATUS_COLORS: Record<string, string> = {
  created: "#22c55e",
  updated: "#3b82f6",
  deleted: "#ef4444",
  resolved: "#34fdba",
  pending: "#eab308",
  failed: "#ef4444",
};
export const DEFAULT_COLOR = "#9ca3af";

// Local-day key (YYYY-MM-DD), so it lines up with a local-time date range
const dayKey = (d: Date) => d.toLocaleDateString("en-CA");

export const buildDailyStats = (
  stats: StatsEntry[],
  start: Date,
  end: Date,
): DailyStat[] => {
  // date -> status -> count
  const byDay = new Map<string, Map<string, number>>();

  for (const s of stats) {
    const key = dayKey(new Date(s.created_at));
    const statusCounts = byDay.get(key) ?? new Map<string, number>();
    statusCounts.set(s.status, (statusCounts.get(s.status) ?? 0) + 1);
    byDay.set(key, statusCounts);
  }

  // One entry per day in the range, including days with no stats
  const result: DailyStat[] = [];
  const cursor = new Date(start);
  cursor.setHours(0, 0, 0, 0);
  const last = new Date(end);
  last.setHours(0, 0, 0, 0);

  while (cursor <= last) {
    const key = dayKey(cursor);
    const statusCounts = byDay.get(key);

    let topStatus: string | null = null;
    let count = 0;
    let topCount = 0;

    if (statusCounts) {
      for (const [status, n] of statusCounts) {
        count += n;
        if (n > topCount) {
          topCount = n;
          topStatus = status;
        }
      }
    }

    result.push({
      date: key,
      label: cursor.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      }),
      count,
      topStatus,
    });

    cursor.setDate(cursor.getDate() + 1);
  }

  return result;
};

export function SimpleBarChart({ start, end }: { start: Date; end: Date }) {
  const { fetchStats, statsLoading, stats } = useStats();

  const data = useMemo(
    () => buildDailyStats(stats ?? [], start, end),
    [stats, start, end],
  );

  useEffect(() => {
    fetchStats({ start: start, end: end });
    console.log(stats);
  }, [start, end]);

  if (!stats || statsLoading) {
    return (
      <div>
        <FTLoader />
      </div>
    );
  }
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey='label' />
          <YAxis allowDecimals={false} />
          <Tooltip
            formatter={(value, _name, item) => [
              value,
              item.payload.topStatus ?? "none",
            ]}
          />
          <Bar dataKey='count'>
            {data.map((d) => (
              <Cell
                key={d.date}
                fill={
                  d.topStatus
                    ? (STATUS_COLORS[d.topStatus] ?? DEFAULT_COLOR)
                    : DEFAULT_COLOR
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export const StatsContent = () => {
  const { fineTasks, loading } = useFineTask();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const labels = ["fail", "success", "success", "fail", "fail", "success"];
  const salesData = [150, 200, 180, 220, 400, 250];
  const statusData: TaskStatus[] = [
    "created",
    "deleted",
    "created",
    "resolved",
    "updated",
    "created",
  ];

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
      <header className='w-full flex justify-between'>
        {/* INDICATORS */}
        <ul className='flex gap-8 not-md:flex-col'>
          <li className='flex items-center gap-1'>
            <div className='border border-[#3b3b3b] p-1 rounded-md'>
              <FiBox className='inline text-xl text-[#22C55E]' />
              <span>CREATED</span>
            </div>
            <div className='border border-[#3b3b3b] p-1 rounded-md'>
              <FiBox className='inline text-xl text-[#3b82F6]' />
              <span>UPDATED</span>
            </div>
            <div className='border border-[#3b3b3b] p-1 rounded-md'>
              <FiBox className='inline text-xl text-[#EF4444]' />
              <span>DELETED</span>
            </div>
          </li>
          <li className='flex items-center gap-1'>
            <div className='border border-[#3b3b3b] p-1 rounded-md'>
              <FiBox className='inline text-xl text-[#34fdba]' />
              <span>RESOLVED</span>
            </div>
            <div className='border border-[#3b3b3b] p-1 rounded-md'>
              <FiBox className='inline text-xl text-[#F59E0B]' />
              <span>PENDING</span>
            </div>
            <div className='border border-[#3b3b3b] p-1 rounded-md'>
              <FiBox className='inline text-xl text-[#f50931]' />
              <span>FAILED</span>
            </div>
          </li>
        </ul>
        {/* TIME SELECTOR */}
        <select>
          <option>7 days</option>
          <option>28 days</option>
          <option>this Month</option>
          <option>4 months</option>
          <option>This Year</option>
        </select>

        {/* <label htmlFor='start-date'>Start Date:</label>
        <input
          type='datetime-local'
          id='start-date'
          value={startDate?.toISOString()}
          onChange={(e) => {
            setStartDate(new Date(e.target.value));
            console.log("Start Date: ", new Date(e.target.value).toISOString());
          }}
        />
        <label htmlFor='end-date'>End Date:</label>
        <input
          type='datetime-local'
          id='end-date'
          value={endDate?.toISOString()}
          onChange={(e) => {
            setEndDate(new Date(e.target.value));
            console.log("End Date: ", new Date(e.target.value).toISOString());
          }}
        /> */}
      </header>
      {/* CHARTS AND TABLES */}
      <section className='w-full h-full flex flex-col p-5'>
        <div className='w-full h-8/12'>
          {/* <MyChart
            labels={labels}
            dataPoints={salesData}
            statuses={statusData}
          /> */}
          <SimpleBarChart
            start={startDate ?? new Date()}
            end={endDate ?? new Date()}
          />
        </div>
        <div className='w-full h-full flex flex-row pt-2 gap-2'>
          <div className='w-full h-full border border-[#505050] rounded-sm p-2'>
            <h2 className='font-normal text-gray-400'>
              Task activity, last 30 days
            </h2>
            {/* <ul className='p-5 '>
              {fineTasks.map((fineTask) => {
                return (
                  <>
                    <div className='flex items-center'>
                      <FiBox className='text-green-400' />
                      <span className='ml-2'>{fineTask.title}</span>
                    </div>
                  </>
                );
              })}
            </ul> */}
          </div>
          <div className='w-full h-full border border-[#505050] rounded-sm p-2'>
            <h2 className='font-normal text-gray-400'>Targeted Objects</h2>
            {/* <ul className='p-5 '>
              {fineTasks.map((fineTask) => {
                return (
                  <>
                    <div className='flex items-center'>
                      <FiBox className='text-green-400' />
                      <span className='ml-2'>{fineTask.title}</span>
                    </div>
                  </>
                );
              })}
            </ul> */}
          </div>
        </div>
      </section>
    </div>
  );
};
