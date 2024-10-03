import React from "react";
import "./Track.css";

interface ItemCardProps {
  title: string;
  description: string;
  supplyChainID: string;
  contributor: string;
  processId: string;
  uploadingTimestamp: string;
  certRequestTimestamp?: string; // Campo per determinare se è certificato
  transactionHash?: string;
}

const ItemCard: React.FC<ItemCardProps> = ({
  title,
  description,
  supplyChainID,
  contributor,
  processId,
  uploadingTimestamp,
  certRequestTimestamp,
  transactionHash,
}) => {
  const isCertified = !!certRequestTimestamp; // Se certRequestTimestamp esiste, è certificato
  return (
    <div className="item-card">
      {/* Titolo e descrizione */}
      <h4>{title}</h4>
      <p>{description}</p>

      {/* Informazioni dell'item */}
      <div className="item-info">
        <div>
          <strong>Supply chain id:</strong> {supplyChainID}
        </div>
        <div>
          <strong>Contributor:</strong> {contributor}
        </div>
        <div>
          <strong>Process id:</strong> {processId}
        </div>
        <div>
          <strong>Uploading timestamp:</strong> {uploadingTimestamp}
        </div>

        {/* Mostra ulteriori dettagli solo se l'item è certificato */}
        {isCertified && (
          <>
            <div>
              <strong>Transaction timestamp:</strong> {certRequestTimestamp}
            </div>
            {transactionHash && (
              <div>
                <strong>Transaction hash:</strong> {transactionHash}
              </div>
            )}
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
