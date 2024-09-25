// pages/guest/Home.tsx
import React from "react";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";
import MainContent from "./MainContent";
import SecondaryContent from "./SecondaryContent";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="container-fluid mt-3">
      <div className="row no-wrap">
        <div className="col-12 col-md-3 col-2">
          <SidebarLeft />
        </div>
        <div className="col-12 col-md-6 col-8">
          <MainContent />
          <SecondaryContent />
        </div>
        <div className="col-12 col-md-3 col-2">
          <SidebarRight />
        </div>
      </div>
    </div>
  );
};

export default Home;
