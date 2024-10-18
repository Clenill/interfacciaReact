import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StaffHome.css";
import "./MyDocument.css";
import DocumentModal from "./../../components/DocumentModal";

interface Document {
  title: string;
  description: string;
  supplyChainID: string;
  contributor: string;
  processId: string;
  uploadingTimestamp: string;
  certRequestTimestamp?: string;
  transactionHash?: string;
  certData?: {
    title: string;
    description: string;
    supplyChainID: string;
    processId: string;
    date: string;
    image: string;
    transactionTimestamp?: string;
    certRequestTimestamp?: string;
  };
  blockchainData?: {
    transactionTimestamp?: string;
  };
}

const MyDocument: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  ); // Stato per il documento selezionato
  const [isModalOpen, setIsModalOpen] = useState(false); // Stato per gestire la modal

  useEffect(() => {
    // Effettua la richiesta GET per ottenere i documenti
    axios
      .get("http://localhost:5001/folou/staff/getAllOwnerDocs", {
        withCredentials: true, // Cookie session
      })
      .then((response) => {
        setDocuments(response.data.data.result.docs);
        console.log(response);
      })
      .catch((error) => {
        console.error("Errore durante il recupero dei documenti:", error);
      });
  }, []);

  // Funzione per aprire la modal con il documento selezionato
  const openModal = (doc: Document) => {
    setSelectedDocument(doc);
    setIsModalOpen(true);
  };

  // Funzione per chiudere la modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
  };

  // Calcola gli indici per la paginazione
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDocuments = documents.slice(indexOfFirstItem, indexOfLastItem);

  // Funzione per cambiare pagina
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  // Funzione per formattare la data
  const formatDate = (dateString: string) => {
    if (!dateString) return "No Date";

    const date = new Date(dateString);

    // Verifica se è valida
    if (isNaN(date.getTime())) {
      return "Invalid date"; // Mostra un errore significativo in caso di errore di parsing
    }

    return date.toLocaleDateString(); // Ritorna la data nel formato locale
  };
  return (
    <div className="staff-documents">
      <h2>My Documents</h2>
      <table className="documents-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Supply chain ID</th>
            <th>Upload timestamp</th>
            <th>Certification timestamp</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentDocuments.map((doc, index) => (
            <tr key={index}>
              <td>{doc.title}</td>
              <td>{doc.supplyChainID}</td>
              <td>{formatDate(doc.certData.uploadingTimestamp)}</td>
              <td>
                {doc.blockchainData.transactionTimestamp
                  ? formatDate(doc.blockchainData.transactionTimestamp)
                  : "Not certified"}
              </td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => openModal(doc)}
                >
                  View details
                </button>
                {/* Condizione per il pulsante "Download proved document" */}
                {doc.certData?.certRequestTimestamp && (
                  <button className="btn btn-success">
                    Download proved document
                  </button>
                )}
                {/* Condizione per il pulsante "Abort" */}
                {doc.certData?.transactionTimestamp && !doc.blockchainData && (
                  <button className="btn btn-warning">Abort</button>
                )}
                {!doc.blockchainData && (
                  <>
                    {!doc.certData?.certRequestTimestamp && (
                      <>
                        <button className="btn btn-primary">Certify</button>
                        <button className="btn btn-danger">Delete</button>
                        <button className="btn btn-info">Edit</button>
                      </>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginazione */}
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          className="pagination-button"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= documents.length}
        >
          Next
        </button>
      </div>
      {/* Modal */}
      {isModalOpen && selectedDocument && (
        <DocumentModal document={selectedDocument} onClose={closeModal} />
      )}
    </div>
  );
};

export default MyDocument;
