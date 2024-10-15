import React from "react";
import { Modal, Button } from "react-bootstrap";

interface CheckIntegrityModalProps {
  show: boolean;
  onClose: () => void;
  uploadingTimestamp: string;
  transactionHash?: string;
}

const CheckIntegrityModal: React.FC<CheckIntegrityModalProps> = ({
  show,
  onClose,
  uploadingTimestamp,
  transactionHash,
}) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Check Integrity Blockchain</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <strong>Uploading Timestamp:</strong> {uploadingTimestamp}
        </div>
        <div>
          <strong>Transaction Hash:</strong> {transactionHash}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckIntegrityModal;
