import React, { useState } from "react";

interface FilterPanelProps {
  contributors: string[];
  isCertifiedOptions: string[];
  onFilterChange: (filters: any) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  contributors,
  isCertifiedOptions,
  onFilterChange,
}) => {
  const [selectedContributor, setSelectedContributor] = useState("");
  const [isCertified, setIsCertified] = useState<string | null>(null);
  const [uploadDate, setUploadDate] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = () => {
    onFilterChange({
      contributor: selectedContributor,
      isCertified,
      uploadDate,
    });
  };

  // Funzione per gestire l'espansione/collasso
  const toggleFilterPanel = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="filter-panel">
      <button onClick={toggleFilterPanel}>
        {isExpanded ? "Hide Filters" : "Show Filters"}
      </button>
      {isExpanded && (
        <div className="filter-content">
          <h5>Filter by:</h5>
          {/* Filtro per Contributor */}
          <select
            value={selectedContributor}
            onChange={(e) => {
              setSelectedContributor(e.target.value);
              handleFilterChange();
            }}
          >
            <option value="">All contributors</option>
            {contributors.map((contributor, index) => (
              <option key={index} value={contributor}>
                {contributor}
              </option>
            ))}
          </select>

          {/* Filtro per certificazione */}
          <div>
            <label>
              Certified:
              <select
                value={isCertified === null ? "" : isCertified}
                onChange={(e) => {
                  const value = e.target.value;
                  setIsCertified(value || null);
                  handleFilterChange();
                }}
              >
                <option value="">All</option>
                {isCertifiedOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Filtro per data di upload */}
          <div>
            <label>
              Upload Date:
              <input
                type="date"
                value={uploadDate}
                onChange={(e) => {
                  setUploadDate(e.target.value);
                  handleFilterChange();
                }}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
