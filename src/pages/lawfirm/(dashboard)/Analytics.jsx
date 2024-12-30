import React from "react";
import RevenueChart from "./RevenueChart";
import PieChartComponent from "./PieChartComponent";
import BarChartComponent from "./BarChartComponent";
import HorizontalBarChart from "./HorizontalBarChart";
import CircularProgress from "./CircularProgress";
import "./Analytics.css";

const Analytics = () => {
  return (
    <div className="analytics-page">
      <header className="analytics-header">
        <button className="back-button">←</button>
        <h1>Analytics</h1>
      </header>
      <div className="analytics-container">
        {/* Top Section */}
        <div className="chart-section">
          <div className="chart-container">
            <RevenueChart />
          </div>
          <div className="chart-container">
            <PieChartComponent />
          </div>
        </div>

        {/* Middle Section */}
        <div className="chart-section">
          <div className="chart-container">
            <HorizontalBarChart />
          </div>
          <div className="chart-container">
            <BarChartComponent />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="circular-section">
          <div className="chart-container circular-progress">
            <CircularProgress title="Yearly" value={77} />
          </div>
          <div className="chart-container circular-progress">
            <CircularProgress title="Quarterly" value={54} />
          </div>
          <div className="chart-container circular-progress">
            <CircularProgress title="Monthly" value={39} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
