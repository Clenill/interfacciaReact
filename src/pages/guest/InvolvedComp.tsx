import React from "react";
import "./InvolvedCompany.css";

const InvolvedCompany: React.FC = () => {
  return (
    <div className="main-content bg-white p-3 shadow-sm">
      <h3>Involved Companies</h3>

      <div className="company-card">
        <div className="company-logo">LOGO</div>
        <div className="company-details">
          <h4>Company Name</h4>
          <p>
            Description of the item (if present). The point of using Lorem Ipsum
            is that it has a more-or-less normal distribution of letters.
          </p>

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
                  <td>company@example.com</td>
                </tr>
                <tr>
                  <td>Telephone</td>
                  <td>+1 234 567 890</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>123 Company St, City, Country</td>
                </tr>
                <tr>
                  <td>Website</td>
                  <td>www.company.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Ripetizione blocco */}
      <div className="company-card">
        <div className="company-logo">LOGO</div>
        <div className="company-details">
          <h4>Company Name</h4>
          <p>
            Description of the item (if present). The point of using Lorem Ipsum
            is that it has a more-or-less normal distribution of letters.
          </p>

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
                  <td>company@example.com</td>
                </tr>
                <tr>
                  <td>Telephone</td>
                  <td>+1 234 567 890</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>123 Company St, City, Country</td>
                </tr>
                <tr>
                  <td>Website</td>
                  <td>www.company.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvolvedCompany;
