import React, { useState } from "react";
import "./Track.css";
import ItemModal from "./../../components/ItemModal";
import CheckIntegrityModal from "./../../components/CheckIntegrityModal";

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
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // Stato per la modal View Content
  const [isChkIntModalOpen, setisChkIntModalOpen] = useState(false); // Stato per la modal Check Proof
  //Parametri View Modal
  const openViewModal = () => setIsViewModalOpen(true);
  const closeViewModal = () => setIsViewModalOpen(false);
  //Parametri Check Proof
  const openChkIntModal = () => setisChkIntModalOpen(true);
  const closeChkIntModal = () => setisChkIntModalOpen(false);
  const isCertified = !!certRequestTimestamp; // Se certRequestTimestamp esiste, è certificato

  // Funzione per formattare la data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Ritorna solo la data nel formato locale (es: "11/10/2024" in Italia)
  };
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
        <button className="btn btn-secondary" onClick={openViewModal}>
          View content
        </button>
        {isCertified ? (
          <button className="btn btn-primary" onClick={openChkIntModal}>
            Check proof
          </button>
        ) : (
          <button className="btn btn-danger">Not certified</button>
        )}
      </div>
      {/* Modal View Content*/}
      <ItemModal
        show={isViewModalOpen}
        onClose={closeViewModal}
        processId={processId}
        uploadingTimestamp={formatDate(uploadingTimestamp)}
      />
      {/* Modal Check Proof*/}
      <CheckIntegrityModal
        show={isChkIntModalOpen}
        onClose={closeChkIntModal}
        uploadingTimestamp={formatDate(uploadingTimestamp)}
        transactionHash={transactionHash}
      />
    </div>
  );
};

export default ItemCard;
