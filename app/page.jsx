"use client";
import React, { useState, useEffect } from "react";
import { Upload, Users } from "lucide-react";
import { FaFileExcel, FaRunning, FaEye } from "react-icons/fa";
import { BsClipboard2Data } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { BsGraphUp } from "react-icons/bs";
import Papa from "papaparse";
import Header from "./components/Header";
import PerPersonMetrix from "./components/PerPersonMetrix";
import Image from "next/image";
import runnerImg from "@/public/homerunner.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const REQUIRED_HEADERS = ["date", "person", "miles run"];

const Home = () => {
  const [runData, setRunData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [overallMetrics, setOverallMetrics] = useState(null);
  const [personMetrics, setPersonMetrics] = useState({});
  const [selectedPerson, setSelectedPerson] = useState("");
  const [fileName, setFileName] = useState("");
  const [view, setView] = useState("overall");

  // This Func will handle the file upload and parsing part.
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileName(e.target.files[0].name);
    setErrors([]);
    setRunData([]);

    if (!file || !file.name.endsWith(".csv")) {
      setErrors(["Please upload a valid .csv file"]);
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data, meta }) => validateCSV(data, meta.fields),
      error: () => setErrors(["Failed to parse CSV file"]),
    });
  };

  // Here we will check for correct csv file.
  const validateCSV = (rows, headers) => {
    const newErrors = [];

    // Header checking
    const missingHeaders = REQUIRED_HEADERS.filter((h) => !headers.includes(h));

    if (missingHeaders.length) {
      setErrors([`Missing headers: ${missingHeaders.join(", ")}`]);
      return;
    }

    const cleanData = [];

    rows.forEach((row, index) => {
      const rowNum = index + 2;

      if (!row.date || !row.person || !row["miles run"]) {
        newErrors.push(`Row ${rowNum}: Empty value found`);
        return;
      }

      const dateObj = new Date(row.date);
      if (isNaN(dateObj.getTime())) {
        newErrors.push(`Row ${rowNum}: Invalid date format`);
        return;
      }

      const miles = parseFloat(row["miles run"]);
      if (isNaN(miles) || miles < 0) {
        newErrors.push(`Row ${rowNum}: Invalid miles value`);
        return;
      }

      cleanData.push({
        date: row.date,
        person: row.person,
        miles,
      });
    });

    setErrors(newErrors);
    if (newErrors.length === 0) {
      setRunData(cleanData);
    }
  };

  // now we will save the metrics data in states
  useEffect(() => {
    if (runData.length === 0) return;

    setOverallMetrics(calculateOverallMetrics(runData));
    setPersonMetrics(calculatePerPersonMetrics(runData));
  }, [runData]);

  // now we will calculate the overall metrics
  const calculateOverallMetrics = (data) => {
    const miles = data.map((data) => data.miles);
    const total = miles.reduce((a, b) => a + b, 0);
    const Total = total.toFixed(1);

    return {
      total: Total,
      average: total / miles.length,
      min: Math.min(...miles),
      max: Math.max(...miles),
    };
  };

  // here we will calculate per person metrics
  const calculatePerPersonMetrics = (data) => {
    const grouped = {};

    data.forEach((d) => {
      grouped[d.person] ??= [];
      grouped[d.person].push(d.miles);
    });

    const result = {};
    for (const person in grouped) {
      const personArray = grouped[person];
      const total = personArray.reduce((a, b) => a + b, 0);

      result[person] = {
        total: total.toFixed(1),
        average: total / personArray.length,
        min: Math.min(...personArray),
        max: Math.max(...personArray),
      };
    }

    return result;
  };

  const perPersonData = selectedPerson
    ? runData.filter((d) => d.person === selectedPerson)
    : [];

  // console.log(runData);

  const comparisonData = Object.entries(personMetrics).map(
    ([person, metrics]) => ({
      person,
      totalMiles: Number(metrics.total),
      avgMiles: Number(metrics.average.toFixed(2)),
    })
  );

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((e) => toast.error(e));
    }
  }, [errors]);

  return (
    <div className="flex flex-col items-center  w-full h-fit bg-gray-300">
      {/* Header */}
      <Header />
      {/* Upload File section */}
      <label className="flex flex-col items-center justify-center  w-[30%] m-3 h-32 border-2 border-dashed  border-gray-600 rounded-lg cursor-pointer bg-cyan-500 hover:bg-indigo-100 transition-colors">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-10 h-10 text-indigo-600 mb-2" />
          <p className="text-sm text-black">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-800 mt-1">
            CSV file with date, person, miles run
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          accept=".csv"
          onChange={handleFileUpload}
        />
      </label>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      {runData.length ? (
        <>
          <div className="w-fit items-end justify-center flex items-center gap-2 p-2 shadow-sm rounded-sm">
            <FaFileExcel size={20} className="text-green-600" />
            <p className="text-sm italic">{fileName}</p>
          </div>
          <hr />
          <div className="flex items-center justify-center w-full p-2 m-3 mt-5 gap-2">
            <Button
              className="cursor-pointer flex items-center"
              onClick={() => {
                setView("overall");
              }}
            >
              <BsClipboard2Data />
              Overall Metrix
            </Button>
            <Button
              className="cursor-pointer flex items-center"
              onClick={() => {
                setView("perperson");
              }}
            >
              <BsClipboard2Data />
              Per-Person Metrix
            </Button>
          </div>

          {view === "overall" ? (
            <>
              {/* overall metrics */}
              {overallMetrics && (
                <div className="flex w-full items-start justify-center">
                  <ul className="grid grid-cols-4 w-[60%] m-2 liststyle-none gap-4">
                    <li className="flex flex-col p-3 bg-[#2164cf] rounded-md shadow-md  text-white">
                      <div className="flex items-center gap-1">
                        <p className="text-sm">Total Mile's</p>
                        <span>
                          <FaRunning />
                        </span>
                      </div>
                      <h1 className="text-3xl font-semibold">
                        {overallMetrics.total}
                      </h1>
                    </li>
                    <li className="flex flex-col items-start justify-center p-3 bg-[#189bc7] text-white rounded-md shadow-md ">
                      <div className="flex items-center gap-1">
                        <p className="text-sm">Average Mile's</p>
                        <span>
                          <FaRunning />
                        </span>
                      </div>
                      <h1 className="text-3xl font-semibold">
                        {overallMetrics.average.toFixed(2)}
                      </h1>
                    </li>
                    <li className="flex flex-col items-start justify-center p-3 bg-[#0fab91] text-white rounded-md shadow-md ">
                      <div className="flex items-center gap-1">
                        <p className="text-sm">Min Mile's</p>
                        <span>
                          <FaRunning />
                        </span>
                      </div>
                      <h1 className="text-3xl font-semibold">
                        {overallMetrics.min}
                      </h1>
                    </li>
                    <li className="flex flex-col items-start justify-center p-3 bg-[#05b060] text-white rounded-md shadow-md ">
                      <div className="flex items-center gap-1">
                        <p className="text-sm">Max Mile's</p>
                        <span>
                          <FaRunning />
                        </span>
                      </div>
                      <h1 className="text-3xl font-semibold">
                        {overallMetrics.max}
                      </h1>
                    </li>
                  </ul>
                </div>
              )}
              {/* overall data chart*/}
              <h1 className="text-lg font-semibold shadow-md text-center mt-10 bg-cyan-600 p-2 text-white rounded-tl-sm rounded-tr-sm flex items-center gap-1">
                <FaEye /> Data Visualization
              </h1>
              {runData.length > 0 && (
                <div className="flex items-center justify-between w-full px-4 mx-3 bg-cyan-600 mx-4 rounded-md shadow-md">
                  <div className="bg-gray-100 shadow-md rounded-md w-[50%] p-4 mt-4 mb-4">
                    <div className="flex items-start gap-1 ">
                      <BsGraphUp size={20} />
                      <h3 className="font-semibold mb-3">
                        Overall Miles - Over Time
                      </h3>
                    </div>
                    <LineChart width="100%" height={300} data={runData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="date"
                        stroke="#6b7280"
                        style={{ fontSize: "12px" }}
                      />
                      <YAxis
                        stroke="#6b7280"
                        style={{ fontSize: "12px" }}
                        label={{
                          value: "Miles",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="miles"
                        stroke="#4f46e5"
                        strokeWidth={2}
                        dot={{ fill: "#4f46e5", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </div>
                  {/* OverAll Comparison Chart */}
                  <div className="bg-gray-100 shadow-md rounded-md w-[47%] p-2 mt-4 mb-4">
                    <div className="flex items-start gap-1 ">
                      <Users className="w-5 h-5" />
                      <h2 className="font-semibold mb-3">Runner Comparison</h2>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={comparisonData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e5e7eb"
                          />
                          <XAxis
                            dataKey="person"
                            stroke="#6b7280"
                            style={{ fontSize: "12px" }}
                          />
                          <YAxis
                            stroke="#6b7280"
                            style={{ fontSize: "12px" }}
                            label={{
                              value: "Miles",
                              angle: -90,
                              position: "insideLeft",
                            }}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#fff",
                              border: "1px solid #e5e7eb",
                              borderRadius: "8px",
                            }}
                          />
                          <Legend />
                          <Bar
                            dataKey="totalMiles"
                            fill="#4f46e5"
                            name="Total Miles"
                          />
                          <Bar
                            dataKey="avgMiles"
                            fill="#10b981"
                            name="Avg Miles"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <PerPersonMetrix personData={personMetrics} runData={runData} />
          )}
        </>
      ) : (
        <div className="w-full flex justify-center">
          <Image
            src={runnerImg}
            alt="runner"
            className="w-[95vw] h-[90vh] rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
