import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "Ongoing", value: 6, color: "#4CAF50" },
  { name: "Closed", value: 2, color: "#2196F3" },
  { name: "In Process", value: 2, color: "#FFC107" },
];

const PieChartComponent = () => {
  return (
    <div className="chart-container">
      <h2>Case Status</h2>
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
