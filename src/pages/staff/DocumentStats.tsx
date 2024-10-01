import React from "react";

interface DocumentStatsProps {
  title: string;
  count: number;
}

const DocumentStats: React.FC<DocumentStatsProps> = ({ title, count }) => {
  return (
    <div className="document-stats p-3 m-3 text-center">
      <h3>{title}</h3>
      <div className="stats-count display-4">{count}</div>
    </div>
  );
};

export default DocumentStats;
