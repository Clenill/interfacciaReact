import React, { useEffect } from "react";
import logosito from "../assets/images/Folou.png"; // Sostituisci con il percorso corretto
import logouni from "../assets/images/logounivpm.png"; // Sostituisci con il percorso corretto
import "./Header.css";

interface HeaderProps {
  pageTitleHead: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitleHead }) => {
  useEffect(() => {
    document.title = `Folou - ${pageTitleHead}`;
  }, [pageTitleHead]);
  return (
    <div className="header d-flex justify-content-between align-items-center bg-white">
      <img src={logosito} alt="Left" className="header-image" />
      <div className="d-flex flex-column align-items-center">
        <h1 className="page-title">{pageTitleHead}</h1>
      </div>
      <img src={logouni} alt="Right" className="header-image" />
    </div>
  );
};

export default Header;
