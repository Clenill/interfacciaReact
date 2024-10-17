import React, { useState, useEffect } from "react";
import axios from "axios";
import { FilterComponent } from "./FilterComponent";

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
  date: string; // Data in formato stringa
}

interface OwnersInfoPageProps {
  onFilteredData: (owners: OwnerInfo[]) => void; // Callback per inviare i dati filtrati
}

const OwnersInfoPage: React.FC<OwnersInfoPageProps> = ({ onFilteredData }) => {
  const [owners, setOwners] = useState<OwnerInfo[]>([]); // Cambia il tipo in OwnerInfo[]
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOwnersInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/folou/guest/getAllOwnersInfo"
        );

        if (response.data.success) {
          const results: OwnerInfo[] = response.data.data.result;

          setOwners(results);
          onFilteredData(results); // Passa i dati filtrati a TrackCode tramite la callback
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Error fetching owners info");
      }
    };

    fetchOwnersInfo();
  }, []);

  return <>{error && <div className="alert alert-danger">{error}</div>}</>;
};

export default OwnersInfoPage;
