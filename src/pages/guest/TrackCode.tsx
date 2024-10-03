import React, { useState } from "react";
import axios from "axios";
import "./TrackCode.css";
import "./Track.css";
import ItemCard from "./ItemCard";

const TrackCode: React.FC = () => {
  const [trackingCode, setTrackingCode] = useState("");
  const [trackingData, setTrackingData] = useState<any[]>([]); // Per salvare i dati dell'item
  const [error, setError] = useState<string | null>(null); // Per gestire errori

  const handleTrack = async () => {
    try {
      const response = await axios.get(
        //utilizzo delle backtick
        `http://localhost:5001/folou/guest/getSupplyChain?supplyChainID=${trackingCode}`
      );

      if (response.data?.data?.result) {
        setTrackingData(response.data.data.result);
        setError(null);
      } else {
        setError("No supply chain found for the entered tracking code.");
        setTrackingData([]); // Reset dati in caso di errore
      }
    } catch (error) {
      setError("An error occurred while fetching the supply chain data.");
      setTrackingData([]);
    }
  };

  return (
    <div className="tracking-page">
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
        {error && <div className="error-message">{error}</div>}
      </div>
      {/* Visualizza le item card sotto la form */}
      {trackingData.length > 0 && (
        <div className="item-cards">
          {trackingData.map((item: any, index: number) => (
            <ItemCard
              key={index._id || index}
              title={item.title || "No Title"}
              description={item.description || "No Description"}
              supplyChainID={item.supplyChainID}
              contributor={item.contributor}
              processId={item.processID}
              uploadingTimestamp={item.uploadingTimestamp}
              certRequestTimestamp={item.certData?.date}
              transactionHash={item.certData?.transactionHash}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackCode;
