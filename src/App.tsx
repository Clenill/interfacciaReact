import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import AppContent from "./AppContent";

interface RouteProps {
  component: React.FC;
  path: string;
}

const App: React.FC = () => {
  return (
    <Router basename="/folou">
      <AppContent />
    </Router>
  );
};

export default App;
