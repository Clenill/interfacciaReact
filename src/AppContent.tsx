import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Importa il contesto
import imagePath from "./assets/images/logounivpm.png";
import NavBarInf from "./components/NavBarInf";
import Home from "./pages/guest/Home";
import About from "./pages/guest/About";
import Track from "./pages/guest/Track";
import Upload from "./pages/guest/Upload";
import NotFound from "./pages/NotFoud";
import Header from "./components/Header";
import StaffHome from "./pages/staff/Home";
import NavBarStaff from "./components/NavBarStaff";
import DocumentStaff from "./pages/staff/MyDocument";
import AboutStaff from "./pages/staff/About";
import "./pages/staff/Staff.css";

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth(); // Ottieni lo stato di autenticazione
  const [pageTitle, setPageTitle] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    // funzine per mappare le rotte ai titoli delle pagine
    const routeTitles: { [key: string]: string } = {
      "/guest/home": "Guest - HOME",
      "/guest/track": "Guest - TRACK",
      "/guest/upload": "Guest - UPLOAD",
      "/guest/about": "Guest - ABOUT",
      "/staff/home": "Staff - HOME",
      "/staff/documents": "Staff - Documents",
      "/staff/infos": "Staff - My Infos",
    };
    // imposta il titolo della pagina in base alla rotta corrente
    const currentTitle = routeTitles[location.pathname] || "Page Not Found";
    setPageTitle(currentTitle);
    document.title = currentTitle;
  }, [location.pathname]);

  return (
    <div>
      <Header pageTitleHead={pageTitle} />

      {isAuthenticated ? (
        <div className="staff-layout">
          <NavBarStaff />{" "}
          {/* Navbar a sinistra. Staff-Layout per la sezione staff */}
          <div className="staff-content">
            {" "}
            {/* Contenuto a destra */}
            <Routes>
              <Route path="/staff/home" element={<StaffHome />} />
              <Route path="/staff/documents" element={<DocumentStaff />} />
              <Route path="staff/infos" element={<AboutStaff />} />
              <Route path="*" element={<Navigate to="/staff/home" />} />{" "}
              {/* Reindirizza alla home staff */}
            </Routes>
          </div>
        </div>
      ) : (
        <>
          <NavBarInf imageSrcPath={imagePath} />
          <div className="container mt-3">
            <Routes>
              {/* Reindirizza dalla root "/" a "/guest/home" */}
              <Route path="/" element={<Navigate to="/guest/home" />} />
              <Route path="/guest/home" element={<Home />} />
              <Route path="/guest/about" element={<About />} />
              <Route path="/guest/track" element={<Track />} />
              <Route path="/guest/upload" element={<Upload />} />
              {/*<Route path="/staff/home" element={<StaffHome />} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};

export default AppContent;
