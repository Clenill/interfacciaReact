import React, { useEffect, useState } from "react";
import axios from "axios";
import "./About.css";

// Definizione dei tipi di dati
interface Company {
  _id: string;
  name: string;
  description: string;
  logo: string;
  contacts: {
    email: string;
    telephone: string;
    address: string;
  };
}

const About: React.FC = () => {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Funzione per recuperare i dati dal server
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/folou/staff/getOwnerInfos",
          {
            withCredentials: true, // Cookie session
          }
        );
        setCompany(response.data.data.result); // Assumendo che il risultato contenga solo una compagnia
        setLoading(false);
      } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);
  if (!company) {
    return <div>Company information not available</div>;
  }

  return (
    <div className="main-content bg-white p-3 shadow-sm">
      <h3>About {company.name}</h3>

      <div className="company-card">
        <div className="company-logo">
          {company.logo ? (
            <img
              src={`data:image/png;base64,${company.logo}`}
              alt={company.name}
            />
          ) : (
            "LOGO"
          )}
        </div>
        <div className="company-details">
          <h4>{company.name}</h4>
          <p>{company.description}</p>

          <div className="contacts">
            <h5>Contacts</h5>
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Email</td>
                  <td>{company.contacts.email}</td>
                </tr>
                <tr>
                  <td>Telephone</td>
                  <td>{company.contacts.telephone}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{company.contacts.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
