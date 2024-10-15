import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "./NavbarStaff.css";
import { useAuth } from "./../AuthContext";
import Cookies from "js-cookie";

const StaffNavbar: React.FC = () => {
  const { user, logout } = useAuth(); // Accedi all'ownerName dal contesto
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina del cookie session
    Cookies.remove("session_token");

    // Esegui il logout dal contesto
    logout();

    // Reindirizza alla pagina di login
    navigate("/guest/home");
  };

  return (
    <nav className="staff-navbar">
      <div className="navbar-header">
        <div className="navbar-welcome bg-secondary text-white p-2 mb-3">
          Welcome back {user?.ownerName ?? "Undefined"}
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
        <Button
          variant="outline-secondary"
          className="logout-button"
          onClick={() => setShowLogoutModal(true)}
        >
          Logout
        </Button>
      </div>
      {/* Modal per conferma logout */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default StaffNavbar;
