import React from "react";

interface StatisticsChartProps {
  title: string;
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({ title }) => {
  return (
    <div className="statistics-chart p-3 m-3 text-center">
      <h4>{title}</h4>
      {/* Qui puoi aggiungere il codice per il grafico. Per ora è statico */}
      <img src="/path-to-placeholder-chart.png" alt={title} />
    </div>
  );
};

export default StatisticsChart;
