import Footer from "./Footer";
import Nav from "./Nav";
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Discussion() {

    return(
        <>
        <Nav />
        
        <Card style={{ width: '80rem', margin:'auto' }}>
            <Card.Header>Post a Review or Complaint</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <h6> cindy@test.com </h6>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Type</Form.Label>
                        <Form.Control as="select">
                        <option>Review</option>
                        <option>Complaint</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select What/Who Are You Writing This For? </Form.Label>
                        <Form.Control as="select">
                        <option>Item - Computer or Computer Parts</option>
                        <option>Store Clerk</option>
                        <option>Delivery Company</option>
                        <option>Computer Company</option>
                        <option>Customer</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control as="textarea" rows={1} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Discussion</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
                <Button variant="primary">Post</Button>
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