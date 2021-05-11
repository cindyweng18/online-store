// Complaint Page
import Footer from "./Footer";
import Nav from "./Nav";
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState} from "react";
import Alert from 'react-bootstrap/Alert';
import axios from "axios";

function Discussion() {

    const email = localStorage.getItem("userEmail");
    var display = "";
    if (email === null) {
        display = "None";
    };
    const user = localStorage.getItem("session");
    const [complaineeType, setComplaineeType] = useState("Item - Computer or Computer Parts");
    const [show, setShow] = useState(false);
    const [complaineeName, setComplaineeName] = useState("");
    const [description, setDescription] = useState();
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`/postcomplaint`,{
            complainer: user.replace("-"," "),
            complaint: description,
            offender: complaineeName,
            email: email
        })
        .then(setShow(true))
        .catch(async (e) => setMessage(e.response.data.message));
    };

    return(
        <>
        <Nav />
        <h1> {message} </h1>
        <Alert show={show} variant="success">
            <Alert.Heading>Your Complaint Has Been Posted!</Alert.Heading>
            <p> Your Complaint Has Been Posted! Thank you! </p>
        </Alert>

        <Card style={{ display: display, width: '80rem', margin:'auto' }}>
            <Card.Header>Post A Complaint</Card.Header>
            <Card.Body>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <h6> {email} </h6>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select What/Who Are You Writing This For? </Form.Label>
                        <Form.Control as="select" onChange={(e) => {setComplaineeType(e.target.value)}}>
                        <option>Item - Computer or Computer Parts</option>
                        <option>Store Clerk</option>
                        <option>Delivery Company</option>
                        <option>Computer Company</option>
                        <option>Customer</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Name of item/person you are writing about</Form.Label>
                        <Form.Control as="textarea" rows={1} value={complaineeName} onChange={(e) => {setComplaineeName(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => {setDescription(e.target.value)}}  placeholder="Description"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">Post</Button>
                </Form>
                
            </Card.Body>
        </Card>

        <Footer />
        </>
    )
}

export default Discussion;