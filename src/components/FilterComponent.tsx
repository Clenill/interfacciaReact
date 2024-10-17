import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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

interface FilterComponentProps {
  owners: OwnerInfo[];
  onFilterChange: (filteredOwners: OwnerInfo[]) => void; // Callback per passare i dati filtrati
}

export const FilterComponent: React.FC<FilterComponentProps> = ({
  owners,
  onFilterChange,
}) => {
  const [searchTerm, setSearchTerm] = useState(""); // Filtra per nome
  const [certifiedFilter, setCertifiedFilter] = useState<"" | "true" | "false">(
    ""
  ); // Filtra per certified
  const [dateFilter, setDateFilter] = useState(""); // Filtra per data

  // Filtra i dati
  const handleFilterChange = () => {
    const filteredOwners = owners.filter((owner) => {
      const matchesName = owner.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCertified =
        certifiedFilter === "" ||
        owner.certified.toString() === certifiedFilter;
      const matchesDate =
        dateFilter === "" || owner.date.startsWith(dateFilter);

      return matchesName && matchesCertified && matchesDate;
    });
    onFilterChange(filteredOwners); // Invia i risultati filtrati
  };

  return (
    <div className="mt-3">
      {/* Campo di ricerca per nome */}
      <Form.Group controlId="filterOwners">
        <Form.Label>Filter Owners by Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Search by owner name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleFilterChange();
          }}
        />
      </Form.Group>

      {/* Campo di selezione per 'Certified' */}
      <Form.Group controlId="filterCertified" className="mt-3">
        <Form.Label>Filter by Certification</Form.Label>
        <Form.Control
          as="select"
          value={certifiedFilter}
          onChange={(e) => {
            setCertifiedFilter(e.target.value);
            handleFilterChange();
          }}
        >
          <option value="">All</option>
          <option value="true">Certified</option>
          <option value="false">Not Certified</option>
        </Form.Control>
      </Form.Group>

      {/* Campo per filtrare in base alla data */}
      <Form.Group controlId="filterDate" className="mt-3">
        <Form.Label>Filter by Date (YYYY-MM-DD)</Form.Label>
        <Form.Control
          type="date"
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value);
            handleFilterChange();
          }}
        />
      </Form.Group>
    </div>
  );
};
