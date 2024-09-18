import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

interface LoginModalProps {
  show: boolean;
  handleClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      // Corpo della richiesta formattato come JSON
      const requestBody = {
        email: email,
        password: password,
      };
      // Invio della richiesta POST al server
      const response = await axios.post(
        "http://localhost:5001/folou/guest/login",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json", // Specifica che il contenuto è in formato JSON
          },
        }
      );

      // gestione risposta, es. salvando il token o reindirizzando l'utente
      console.log("Login success", response.data);
      handleClose(); // Chiudi il modal dopo il login
    } catch (error) {
      //gestione degli errori (credenziali errate per ora)
      console.error("Login Failed, error");
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
