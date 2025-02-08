import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { month: "Jan", value: 10000 },
  { month: "Feb", value: 20000 },
  { month: "Mar", value: 15000 },
  { month: "Apr", value: 18000 },
  { month: "May", value: 25000 },
  { month: "Jun", value: 20591 },
  { month: "Jul", value: 23000 },
  { month: "Aug", value: 24000 },
  { month: "Sep", value: 22000 },
  { month: "Oct", value: 26000 },
  { month: "Nov", value: 27000 },
  { month: "Dec", value: 30000 },
];

const RevenueChart = () => {
  return (
    <div className="chart-container">
      <h2>Revenue Billed per Month</h2>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </div>
  );
};

export default RevenueChart;
