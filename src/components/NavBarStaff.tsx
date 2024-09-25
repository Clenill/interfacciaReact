import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./NavbarStaff.css";

const StaffNavbar: React.FC = () => {
  return (
    <nav className="staff-navbar">
      <div className="navbar-header">
        <div className="navbar-brand">Navbar Staff</div>
        <div className="navbar-welcome bg-secondary text-white p-2 mb-3">
          Welcome back USERNAME
        </div>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/staff/home" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/staff/upload" className="nav-link">
            Upload a document
          </Link>
        </li>
        <li>
          <Link to="/staff/documents" className="nav-link">
            My Documents
          </Link>
        </li>
        <li className="sub-link">
          <Link to="/staff/infos" className="nav-link">
            My infos
          </Link>
        </li>
        <li>
          <Link to="/staff/settings" className="nav-link">
            Account settings
          </Link>
        </li>
      </ul>
      <div className="navbar-footer mt-3">
        <Button variant="outline-secondary" className="logout-button">
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default StaffNavbar;
