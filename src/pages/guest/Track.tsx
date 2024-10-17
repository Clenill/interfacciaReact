// Track.tsx
import React, { useState } from "react";
import TrackCode from "./TrackCode";
import "./Track.css";
import OwnersInfoPage from "./../../components/OwnersInfoPage";

// Definizione dell'interfaccia OwnerInfo
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

const Track: React.FC = () => {
  const [filteredOwners, setFilteredOwners] = useState<OwnerInfo[]>([]); // Stato per i dati filtrati

  // Funzione callback per aggiornare i dati filtrati
  const handleFilteredData = (owners: OwnerInfo[]) => {
    setFilteredOwners(owners);
  };

  return (
    <div className="track-page">
      {/* Passa la funzione callback a OwnersInfoPage */}
      <OwnersInfoPage onFilteredData={handleFilteredData} />

      {/* Passa i dati filtrati a TrackCode */}
      <TrackCode owners={filteredOwners} />
    </div>
  );
};

export default Track;
