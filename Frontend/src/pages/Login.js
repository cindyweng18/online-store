import Footer from "./Footer";
import Nav from "./Nav";
import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from 'react-router-dom'
import axios from "axios";

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
  
    function validateForm() {
      return email.length > 0 && password.length > 0;
    };
  
    function handleSubmit(event, route) {
      event.preventDefault();
      axios
      .post("/login", {
        email: email,
        password: password,
      })
      .then(async (response) => {
        localStorage.clear()
        localStorage.setItem("route", route);
        localStorage.setItem("session", response.data['loginData']['fullName'].replace(" ", ""));
        history.push(`/${route}/${response.data['loginData']['fullName'].replace(" ", "")}`);
      })
      .catch((e) => setMessage("error"));
      };

      // useEffect(() => {
      //   const route = localStorage.getItem("route");
      //   const session = localStorage.getItem("session");
      //   if (localStorage.getItem("session") !== null)
      //   history.push(`/${route}/${session}`);
      // }, [history]);
      

    return (
        <>
        <Nav />
        <div className="Login">
            <h1> Sign In </h1>
          <Form onSubmit={(e) => handleSubmit(e, "account")}>
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
            <Button block size="lg" type="submit" disabled={!validateForm()}>
              Login
            </Button>
            <Link to="/register">
            <p> Register </p>
            </Link>
          </Form>
        </div>
        <Footer />
        </>
    );
}

export default Login;