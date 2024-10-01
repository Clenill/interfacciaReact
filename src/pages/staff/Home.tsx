import React from "react";
import DocumentStats from "./DocumentStats";
import StatisticsChart from "./StatisticsChart";
import "./StaffHome.css";

const StaffHome: React.FC = () => {
  return (
    <div className="staff-home d-flex">
      <div className="content flex-grow-1">
        <div className="d-flex justify-content-between">
          <DocumentStats title="Documents uploaded" count={20} />
          <DocumentStats title="Documents certified" count={15} />
        </div>
        <div className="d-flex justify-content-between">
          <StatisticsChart title="Statistics 1" />
          <StatisticsChart title="Statistics 2" />
        </div>
      </div>
    </div>
  );
};

export default StaffHome;

//const { user } = useAuth();
// Si accede ai dati dell'utente autenticato usanto il contesto di autenticazione
//con l'hook useAuth.
