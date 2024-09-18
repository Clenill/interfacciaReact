import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import imagePath from "./assets/images/logounivpm.png";
import NavBarInf from "./components/NavBarInf";
import Home from "./pages/guest/Home";
import About from "./pages/guest/About";
import Track from "./pages/guest/Track";
import Upload from "./pages/guest/Upload";
import NotFound from "./pages/NotFoud";
import Header from "./components/Header";

const AppContent: React.FC = () => {
  const [pageTitle, setPageTitle] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    // funzine per mappare le rotte ai titoli delle pagine
    const routeTitles: { [key: string]: string } = {
      "/guest/home": "Guest - HOME",
      "/guest/track": "Guest - TRACK",
      "/guest/upload": "Guest - UPLOAD",
      "/guest/about": "Guest - ABOUT",
    };
    // imposta il titolo della pagina in base alla rotta corrente
    const currentTitle = routeTitles[location.pathname] || "Page Not Found";
    setPageTitle(currentTitle);
    document.title = currentTitle;
  }, [location.pathname]);

  return (
    <div>
      <Header pageTitleHead={pageTitle} />
      <NavBarInf imageSrcPath={imagePath} />
      <div className="container mt-3">
        <Routes>
          <Route path="/guest/home" element={<Home />} />
          <Route path="/guest/about" element={<About />} />
          <Route path="/guest/track" element={<Track />} />
          <Route path="/guest/upload" element={<Upload />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppContent;
