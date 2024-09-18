import React, { useState } from "react";
import "./TrackCode.css";
import "./Track.css";

const TrackCode: React.FC = () => {
  const [trackingCode, setTrackingCode] = useState("");

  const handleTrack = () => {
    console.log("Tracking code:", trackingCode);
    // Funzionalità da implementare per il tracking
  };

  return (
    <div className="tracking-form">
      <input
        type="text"
        className="form-control"
        placeholder="Enter the tracking code"
        value={trackingCode}
        onChange={(e) => setTrackingCode(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleTrack}>
        Track the supply chain
      </button>
    </div>
  );
};

export default TrackCode;
