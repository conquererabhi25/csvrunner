import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FaRunning } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
const PerPersonMetrix = ({ personData, runData }) => {
  const runners = Object.keys(personData || {});
  const [runnerName, setRunnerName] = useState("");

  useEffect(() => {
    if (runners.length) {
      setRunnerName(runners[0]);
    }
  }, [personData]); // useEffect wil run Wherver personData Chanegs.

  const summary = personData?.[runnerName];

  const chartData = runData.filter((eachData) => eachData.person === runnerName);

  return (
    <div className="flex gap-6 w-full p-4">
      <ul className="flex flex-col gap-2 w-fit p-3 bg-white rounded-md shadow">
        {runners.map((runner, index) => (
          <Button
            key={runner}
            variant={runnerName === runner ? "default" : "outline"}
            onClick={() => setRunnerName(runner)}
          >
            {index + 1}. {runner}
          </Button>
        ))}
      </ul>

      {summary && (
        <div className="flex flex-col gap-6 w-full">
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col p-3 bg-[#2164cf] rounded-md shadow-md  text-white">
              <div className="flex items-center gap-1">
                <p className="text-sm">Total Mile's</p>
                <span>
                  <FaRunning />
                </span>
              </div>
              <h1 className="text-3xl font-semibold">{summary.total}</h1>
            </div>
            <div className="flex flex-col p-3 bg-[#189bc7] rounded-md shadow-md  text-white">
              <div className="flex items-center gap-1">
                <p className="text-sm">Average Mile's</p>
                <span>
                  <FaRunning />
                </span>
              </div>
               {summary.average.toFixed(2)}
            </div>
            <div className="flex flex-col p-3 bg-[#0fab91] rounded-md shadow-md  text-white">
              <div className="flex items-center gap-1">
                <p className="text-sm">Min Mile's</p>
                <span>
                  <FaRunning />
                </span>
              </div>
              <h1 className="text-3xl font-semibold">{summary.min}</h1>
            </div>
            <div className="flex flex-col p-3 bg-[#05b060] rounded-md shadow-md  text-white">
              <div className="flex items-center gap-1">
                <p className="text-sm">Max Mile's</p>
                <span>
                  <FaRunning />
                </span>
              </div>
             <h1 className="text-3xl font-semibold">{summary.max}</h1>
            </div>
          </div>

          {/* Line chart */}
          <div className="w-full h-[300px] bg-white p-4 rounded-md shadow">
            <h1 className="font-semibold">Line Chart</h1>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="miles"
                    stroke="#4f46e5"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500">
                No chart data available
              </p>
            )}
          </div>

          {/* Bar Chart */}

          <div className="w-full h-[300px] bg-white p-4 rounded-md shadow">
            <h1 className="font-semibold">Bar Chart</h1>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="miles" fill="#0fab91" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500">
                Chart data not available
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PerPersonMetrix;
