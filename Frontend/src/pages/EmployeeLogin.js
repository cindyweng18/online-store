import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from 'react-router-dom'
import axios from "axios";
import {Row, Col} from 'react-bootstrap';

function Employee() {

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [employee, setEmployee] = useState("");
    
    const employees = [
        { name: "Store Clerk", value: "clerk" },
        { name: "Delivery Company", value: "delivery" },
        { name: "Computer Company", value: "computercompany"},
        { name: "Manager", value: "manager" }
      ];
  
    function handleSubmit(event, route) {
      event.preventDefault();
      axios
      .post(`/${route}login`, {
        email: email,
        password: password,
      })
      .then(async (response) => {
        localStorage.clear();
        if (employee === "clerk") {
            localStorage.setItem("email", response.data['loginData']['email']);
        }
        localStorage.setItem("route", route);
        localStorage.setItem("session", response.data['loginData']['name']);
        localStorage.setItem("complaints", JSON.stringify(response.data['loginData']['complaintsReceived']))
        history.push(`/${route}/${response.data['loginData']['name'].replace(" ", "-")}`);
      })
      .catch((e) => setMessage("Something went wrong. Try Again."));
     };

    return (
        <>

        <div className="Login">
        <h1> Employee Login </h1>
        <h2> {message} </h2>
        <Form>
            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={5}>
                Email
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="email" placeholder="Email" onChange={e => setEmail(e.currentTarget.value)}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPassword">
                <Form.Label column sm={5}>
                Password
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.currentTarget.value)}/>
                </Col>
            </Form.Group>
            <fieldset>
                <Form.Group as={Row}>
                <Form.Label as="legend" column sm={5}>
                    I am a...
                </Form.Label>
                <Col sm={10}>
                    {employees.map((employee, index) => (
                        <Form.Check
                        key={index}
                        type="radio"
                        label={employee.name}
                        name="formHorizontalRadios"
                        value={employee.value}
                        onChange={e => setEmployee(e.currentTarget.value)}
                        />
                    ))}
                </Col>
                </Form.Group>
            </fieldset>

            <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit" onClick={(e) => handleSubmit(e, employee)}>Log in</Button>
                </Col>
            </Form.Group>
        </Form>
        </div>

        </>
    )
}

export default Employee;