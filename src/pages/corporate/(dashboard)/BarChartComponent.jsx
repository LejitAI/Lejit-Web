import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  { month: "Jan", lost: 10, won: 20 },
  { month: "Feb", lost: 15, won: 25 },
  { month: "Mar", lost: 5, won: 30 },
];

const BarChartComponent = () => {
  return (
    <div className="chart-container">
      <h2>Case Results</h2>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="lost" fill="#ff7300" />
        <Bar dataKey="won" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
