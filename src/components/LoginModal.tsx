import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../AuthContext";

interface LoginModalProps {
  show: boolean;
  handleClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth(); // Ottieni la funzione di login dal context

  const handleLogin = async () => {
    try {
      const requestBody = {
        // validazione dei campi prima di inviare la richiesta?
        email: email,
        password: password,
      };
      // Prima richiesta: login
      const loginResponse = await axios.post(
        "http://localhost:5001/folou/guest/login",
        requestBody,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, //consente l'invio e la ricezione dei cookie di sessione
        }
      );

      const loginData = loginResponse.data;

      if (loginData.success) {
        console.log("CONSOLE LOG PRIMO");
        console.log("Login success:", loginData);
        // Seconda richiesta: Ottieni i dettagli dell'utente dopo il login
        const userDetailsResponse = await axios.get(
          "http://localhost:5001/folou/staff/getOwnerInfos", // Endpoint per ottenere i dettagli dell'utente
          {
            withCredentials: true, // Usa il token o il nome restituito
          }
        );
        console.log("CONSOLE LOG SECONDO");
        console.log("User details response:", userDetailsResponse);
        //userData is undefined
        //const userData = userDetailsResponse.data.data.result[0];
        // Verifica che la struttura del JSON sia quella attesa
        if (
          userDetailsResponse.data &&
          userDetailsResponse.data.data &&
          userDetailsResponse.data.data.result
        ) {
          // Dal Json ricevuto salvo le informazioni in companyData
          const companyData = userDetailsResponse.data.data.result;
          // Aggiorna lo stato di autenticazione con i dati dell'utente
          // L'oggetto è passato alla funzione di Login, che aggiorna lo stato
          //globale dell'utente tramite il context di autenticazione in AuthContext
          login({
            ownerName: companyData.name,
            email: companyData.contacts.email,
            description: companyData.description,
            telephone: companyData.contacts.telephone,
          });
        } else {
          throw new Error("Company data not found.");
        }
        handleClose(); // Chiudi il modal dopo il login
      } else {
        setErrorMessage("Login failed, please try again.");
      }
    } catch (error) {
      console.error("Login Failed", error);
      setErrorMessage("Invalid Email or/and Password, try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
