import React, { useEffect, useState } from "react";
import "./InvolvedCompany.css";

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

const InvolvedCompany: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //JSON.stringify
  //------------Funzione per recuperare i dati dal server
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/folou/guest/getAllOwnersInfo"
        );
        const data = await response.json();
        setCompanies(data.data.result);
        setLoading(false);
      } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="main-content bg-white p-3 shadow-sm">
      <h3>Involved Companies</h3>

      {companies.map((company) => (
        <div className="company-card" key={company._id}>
          <div className="company-logo">
            {company.logo ? (
              <img src={company.logo} alt={company.name} />
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
                  <tr>
                    <td>Website</td>
                    <td>{company.contacts.website || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvolvedCompany;
