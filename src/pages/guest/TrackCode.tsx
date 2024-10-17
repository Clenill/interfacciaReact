import React, { useState } from "react";
import axios from "axios";
import "./TrackCode.css";
import "./Track.css";
import { Dropdown, DropdownButton, Form, Button } from "react-bootstrap";
import ItemCard from "./ItemCard";
interface OwnerInfo {
  _id: string;
  name: string;
  description: string;
  logo: string;
  contacts: {
    email: string;
    telephone: string;
    address: string;
  };
  certified: boolean;
  date: string;
}

interface TrackCodeProps {
  owners: OwnerInfo[]; // Accetta un array di owner come prop
}

const TrackCode: React.FC<TrackCodeProps> = ({ owners }) => {
  const [trackingCode, setTrackingCode] = useState("");
  const [trackingData, setTrackingData] = useState<any[]>([]); // Dati completi
  const [filteredData, setFilteredData] = useState<any[]>([]); // Dati filtrati
  const [selectedOwner, setSelectedOwner] = useState<string>(""); // Aggiunta stato per selectedOwner
  const [selectedCertification, setSelectedCertification] =
    useState<string>(""); // Certificato selezionato
  const [selectedDate, setSelectedDate] = useState<string>(""); // Data selezionata
  const [error, setError] = useState<string | null>(null); // Per gestire errori

  const handleTrack = async () => {
    try {
      // Costruzione dinamica dei parametri da inviare solo se selezionati
      const filters: any = {};

      if (selectedOwner) {
        filters.owners = JSON.stringify([selectedOwner]);
      }
      if (selectedCertification) {
        filters.isCertified = selectedCertification === "true";
      }
      if (selectedDate) {
        filters.start = selectedDate;
      }

      const response = await axios.get(
        `http://localhost:5001/folou/guest/getSupplyChain`,
        {
          params: {
            supplyChainID: trackingCode,
            filters, // Passa l'oggetto filters con i parametri
          },
        }
      );

      console.log("Risposta", response.data);

      if (response.data?.data?.result) {
        const data: any[] = response.data.data.result;
        setTrackingData(data);
        setFilteredData(data);
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

  return (
    <div className="tracking-page">
      {/* Inserimento del tracking code */}
      <div className="tracking-form d-flex align-items-center">
        {/* Dropdown per Owner */}
        <DropdownButton
          id="dropdown-owner"
          title={selectedOwner || "Select Owner"}
          onSelect={(e) => setSelectedOwner(e || "")}
          className="mr-3"
        >
          <Dropdown.Item eventKey="">All Owners</Dropdown.Item>
          {owners.map((owner) => (
            <Dropdown.Item key={owner._id} eventKey={owner.name}>
              {owner.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        {/* Dropdown per certificato */}
        <DropdownButton
          id="dropdown-certified"
          title={selectedCertification || "Certification Status"}
          onSelect={(e) => setSelectedCertification(e || "")}
          className="mr-3"
        >
          <Dropdown.Item eventKey="">All</Dropdown.Item>
          <Dropdown.Item eventKey="true">Certified</Dropdown.Item>
          <Dropdown.Item eventKey="false">Not Certified</Dropdown.Item>
        </DropdownButton>

        {/* Selezione per data */}
        <Form.Control
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="mr-3"
        />

        {/* Input tracking code */}
        <input
          type="text"
          className="form-control"
          placeholder="Enter the tracking code"
          value={trackingCode}
          onChange={(e) => setTrackingCode(e.target.value)}
        />
        {/* Pulsante per tracciare */}
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
