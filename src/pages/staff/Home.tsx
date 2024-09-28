// pages/staff/Home.tsx
import React from "react";
import { useAuth } from "./../../AuthContext";

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="home">
      <h1>Welcome, {user?.ownerName || "Guest"}!</h1>
      {user && (
        <>
          <p>Email: {user.email}</p>
          <p>Description: {user.description}</p>
          <p>Telephone: {user.telephone}</p>
        </>
      )}
      <p>This is the home page of our React application for guests.</p>
    </div>
  );
};

export default Home;
