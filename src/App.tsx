import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import AppContent from "./AppContent";
import { AuthProvider } from "./AuthContext"; // Import del contesto

interface RouteProps {
  component: React.FC;
  path: string;
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router basename="/folou">
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
