import React from "react";
import { Modal, Button } from "react-bootstrap";

interface ItemModalProps {
  show: boolean;
  onClose: () => void;
  processId: string;
  uploadingTimestamp: string;
}

const ItemModal: React.FC<ItemModalProps> = ({
  show,
  onClose,
  processId,
  uploadingTimestamp,
}) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Item Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <strong>Process ID:</strong> {processId}
        </div>
        <div>
          <strong>Uploading Timestamp:</strong> {uploadingTimestamp}
        </div>
        {/* Altri campi statici */}
        <div>
          <strong>Static Field 1:</strong> Placeholder
        </div>
        <div>
          <strong>Static Field 2:</strong> Placeholder
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

export default ItemModal;
