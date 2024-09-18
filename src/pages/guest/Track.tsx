// Features.tsx
import React from "react";
import TrackCode from "./TrackCode";
import ItemCard from "./ItemCard";
import "./Track.css";

const Track: React.FC = () => {
  return (
    <div className="track-page">
      <TrackCode />
      <div className="item-cards">
        <ItemCard
          title="Item Title"
          description="Description of the item (if present)"
          isCertified={false}
        />
        <ItemCard
          title="Item Title"
          description="Description of the item (if present)"
          isCertified={true}
        />
        <ItemCard
          title="Item Title"
          description="Description of the item (if present)"
          isCertified={false}
        />
      </div>
    </div>
  );
};

export default Track;
