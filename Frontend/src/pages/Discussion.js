import Footer from "./Footer";
import Nav from "./Nav";
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState} from "react";

function Discussion() {

    const email = localStorage.getItem("userEmail");
    const [type, setType] = useState("Review an Item");
    const [complaineeType, setComplaineeType] = useState("Item - Computer or Computer Parts");
    const [complaineeName, setComplaineeName] = useState("");
    const [complainTitle, setComplainTitle] = useState("");
    const [description, setDescription] = useState("");
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return(
        <>
        <Nav />
        
        <Card style={{ width: '80rem', margin:'auto' }}>
            <Card.Header>Post a Review or Complaint</Card.Header>
            <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <h6> {email} </h6>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Type</Form.Label>
                        <Form.Control as="select" onChange={(e) => {setType(e.target.value)}}>
                        <option>Review an Item</option>
                        <option>Complaint about a Store Clerk or Delivery Company</option>
                        </Form.Control>
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
                    <Form.Group controlId="validationCustom01">
                        <Form.Label>Name</Form.Label>
                        <Form.Control as="textarea" rows={1} placeholder="Write the name of the item or person you are posting a complaint/review on" required/>
                        <Form.Control.Feedback type="invalid"> Please write the name </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control as="textarea" rows={1} placeholder="Title of your post" required/>
                        <Form.Control.Feedback type="invalid"> Please write the title </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Discussion</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Description" required/>
                        <Form.Control.Feedback type="invalid"> Please write a description </Form.Control.Feedback>
                    </Form.Group>
                </Form>
                <Button variant="primary" type="submit">Post</Button>
            </Card.Body>
        </Card>
        <hr />
        <h1> Discussion </h1>
        <Card style={{ width: '80rem', margin:'auto'}}>
            <Card.Body>
                <Card.Title>[Title]</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">[Name]</Card.Subtitle>
                <Card.Text>
                [Discussion]
                </Card.Text>
                <Card.Text className="text-muted"> [Type] - [Date]</Card.Text>
            </Card.Body>
        </Card>


        <Footer />
        </>
    )
}

export default Discussion;