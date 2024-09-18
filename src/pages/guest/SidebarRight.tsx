import React from "react";
import ExternalLinks from "./ExternalLinks";

const SidebarRight: React.FC = () => {
  return (
    <>
      <div className="sidebar-right bg-light p-3 shadow-sm mb-3">
        <h4>Sidebar Right</h4>
        <p>Content for the right sidebar.</p>
      </div>
      <ExternalLinks />
    </>
  );
};

export default SidebarRight;
