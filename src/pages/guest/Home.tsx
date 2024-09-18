// pages/guest/Home.tsx
import React from "react";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";
import MainContent from "./MainContent";
import SecondaryContent from "./SecondaryContent";

const Home: React.FC = () => {
  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-lg-2">
          <SidebarLeft />
        </div>
        <div className="col-lg-8">
          <MainContent />
          <SecondaryContent />
        </div>
        <div className="col-lg-2">
          <SidebarRight />
        </div>
      </div>
    </div>
  );
};

export default Home;
