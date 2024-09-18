import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import LoginModal from "./LoginModal";
import React, { useState } from "react";
import "./NavBarInf.css";

interface NavBarProps {
  imageSrcPath: string;
}

function NavBarInf({ imageSrcPath }: NavBarProps) {
  // Stato per gestire l'apertura e la chiusura della Login Modal
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
        <div className="d-flex mx-auto">
          <Link className="nav-item nav-link mx-2" to="/guest/home">
            Home
          </Link>
          <Link className="nav-item nav-link mx-2" to="/guest/about">
            About
          </Link>
          <Link className="nav-item nav-link mx-2" to="/guest/track">
            Track a supply chain
          </Link>
          <Link className="nav-item nav-link mx-2" to="/guest/upload">
            Upload a file to check integrity
          </Link>
        </div>

        <form className="d-flex ml-auto">
          {/* Pulsante per aprire la Login Modal */}
          <Button
            className="btn btn-outline-success mr-2"
            type="button"
            style={{ color: "black" }}
            onClick={handleOpenLoginModal}
          >
            Log in
          </Button>
          <Button
            className="btn btn-outline-secondary"
            type="button"
            style={{ color: "black", background: "gray" }}
          >
            SignUp
          </Button>
        </form>
      </nav>
      {/* Login Modal */}
      <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} />
    </>
  );
}
export default NavBarInf;
