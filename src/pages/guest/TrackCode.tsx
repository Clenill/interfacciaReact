import React, { useState } from "react";
import axios from "axios";
import "./TrackCode.css";
import "./Track.css";
import ItemCard from "./ItemCard";
import FilterPanel from "./../../components/FilterPanel";

const TrackCode: React.FC = () => {
  const [trackingCode, setTrackingCode] = useState("");
  const [trackingData, setTrackingData] = useState<any[]>([]); // Dati completi
  const [filteredData, setFilteredData] = useState<any[]>([]); // Dati filtrati
  const [contributors, setContributors] = useState<string[]>([]);
  const [isCertifiedOptions, setIsCertifiedOptions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null); // Per gestire errori

  const handleTrack = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/folou/guest/getSupplyChain?supplyChainID=${trackingCode}`
      );

      if (response.data?.data?.result) {
        const data: any[] = response.data.data.result;
        setTrackingData(data);
        setFilteredData(data);

        // Popola i filtri: contributors e isCertified
        const contributorsList = [
          ...new Set(data.map((item) => String(item.contributor))),
        ];
        setContributors(contributorsList);

        const isCertifiedList = [
          ...new Set(
            data.map((item) => (item.certData ? "Certified" : "Not Certified"))
          ),
        ];
        setIsCertifiedOptions(isCertifiedList);

        setError(null);
      } else {
        setError("No supply chain found for the entered tracking code.");
        setTrackingData([]); // Reset dati in caso di errore
        setFilteredData([]);
      }
    } catch (error) {
      setError("An error occurred while fetching the supply chain data.");
      setTrackingData([]);
      setFilteredData([]);
    }
  };

  const handleFilterChange = (filters: any) => {
    const { contributor, isCertified, uploadDate } = filters;

    const filtered = trackingData.filter((item: any) => {
      const contributorMatch = contributor
        ? item.contributor === contributor
        : true;
      const certifiedMatch =
        isCertified !== null
          ? isCertified === "Certified"
            ? !!item.certData
            : !item.certData
          : true;
      const uploadDateMatch = uploadDate
        ? new Date(item.uploadingTimestamp).toISOString().split("T")[0] ===
          uploadDate
        : true;

      return contributorMatch && certifiedMatch && uploadDateMatch;
    });

    setFilteredData(filtered);
  };

  return (
    <div className="tracking-page">
      {/* Filtro */}
      <div className="filter-section">
        <FilterPanel
          contributors={contributors}
          isCertifiedOptions={isCertifiedOptions}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Inserimento del tracking code */}
      <div className="track-code-section">
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
      {filteredData.length > 0 && (
        <div className="item-cards">
          {filteredData.map((item: any, index: number) => (
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
