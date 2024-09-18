import React from "react";
import "./Track.css";

interface ItemCardProps {
  title: string;
  description: string;
  isCertified: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({
  title,
  description,
  isCertified,
}) => {
  return (
    <div className="item-card">
      {/* Titolo e descrizione */}
      <h4>{title}</h4>
      <p>{description}</p>

      {/* Informazioni dell'item */}
      <div className="item-info">
        <div>
          <strong>Supply chain id:</strong> SC123456
        </div>
        <div>
          <strong>Contributor:</strong> Contributor Name
        </div>
        <div>
          <strong>Process id:</strong> P987654
        </div>
        <div>
          <strong>Uploading timestamp:</strong> 2023-09-17 10:00:00
        </div>

        {/* Mostra ulteriori dettagli solo se l'item è certificato */}
        {isCertified && (
          <>
            <div>
              <strong>Transaction timestamp:</strong> 2023-09-17 10:05:00
            </div>
            <div>
              <strong>Transaction hash:</strong> 0xabcdef1234567890
            </div>
          </>
        )}
      </div>

      {/* Pulsanti di azione */}
      <div className="item-buttons">
        <button className="btn btn-secondary">View content</button>
        {isCertified ? (
          <button className="btn btn-primary">Check proof</button>
        ) : (
          <button className="btn btn-danger">Not certified</button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
