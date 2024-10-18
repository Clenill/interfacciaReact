import React from "react";
import "./DocumentModal.css";
import { Modal, Button } from "react-bootstrap";

interface DocumentModalProps {
  document: {
    title: string;
    description: string;
    supplyChainID: string;
    processId: string;
    certData?: {
      title: string;
      description: string;
      supplyChainID: string;
      processId: string;
      date: string;
      image: string;
      uploadingTimestamp?: string;
      certRequestTimestamp?: string;
    };
  };
  onClose: () => void;
}

const DocumentModal: React.FC<DocumentModalProps> = ({ document, onClose }) => {
  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Document Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {document.certData?.image ? (
          <img
            src={`data:image/png;base64,${document.certData?.image}`}
            alt={"LOGO"}
            style={{ width: "100px", height: "100px" }}
          />
        ) : (
          <p>No image available</p>
        )}
        <p>
          <strong>Title:</strong> {document.title}
        </p>
        <p>
          <strong>Description:</strong> {document.description}
        </p>
        <p>
          <strong>Supply Chain ID:</strong> {document.supplyChainID}
        </p>
        <p>
          <strong>Process ID:</strong> {document.processId}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DocumentModal;
