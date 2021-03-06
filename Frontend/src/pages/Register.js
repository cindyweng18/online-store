import Footer from "./Footer";
import Nav from "./Nav";
import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from 'react-router-dom';
import axios from "axios";

function Register() {
    const history = useHistory();
    const [full_name, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    
    function validateForm() {
        return email.length > 0 && password.length > 0;
    };

    function handleSubmit(event) {
        event.preventDefault();
        axios
        .post("/createaccount", {
          fullName: full_name,
          email: email,
          password: password,
          homeAddress: address,
          
        })
        .then(async () => history.push("/login"))
        .catch(async (e) => setMessage(e.response.data.message));
    };

    return (
        <>
        <Nav />
        <div className="Login">
            <h1> Register </h1>
            <p> {message} </p>
          <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="full_name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="full_name"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="address">
              <Form.Label>Home Address (Street Number and Name, APT/FL, City, State, ZIP Code)</Form.Label>
              <Form.Control
                type="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Button block size="lg" type="submit" disabled={!validateForm()}>
              Register
            </Button>
          </Form>
        </div>



        <Footer />
        </>
    )

}

export default Register;