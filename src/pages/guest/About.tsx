// Features.tsx
import React from "react";
import AboutPage from "./AboutPage";
import AboutProject from "./AboutProject";
import InvolvedCompany from "./InvolvedComp";

const About: React.FC = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col-lg-8">
        <AboutPage />
        <AboutProject />
        <InvolvedCompany />
      </div>
    </div>
  );
};

export default About;
