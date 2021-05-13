import Footer from "./Footer";
import Nav from "./Nav";
import React from 'react';
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useState, useEffect} from "react";

function ItemPart(props) {
    const { params } = props.match;
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [item, setItem] = useState({});
    const [description, setDescription] = useState("");
    const [vote, setVote] = useState(1);
    const [discussion, setDiscussion] = useState([]);

    const user = localStorage.getItem("session");
    const email = localStorage.getItem("userEmail");

    // Don't display 'Add to Cart' button if user not logged in
    var display = "none";
    if (user !== null) {
        display = "";
    };

    useEffect(() => {
        const fetchData = async () => {
            const getItem = await axios.get(`/viewpartitem?item_id=${params.id}`);
            console.log(getItem.data['partData']);
            setItem(getItem.data['partData']);
            setDiscussion(getItem.data['partData']['discussion'])
        }
        fetchData();
    }, [params]);


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`/postdiscussion`,{
            item_id: params.id,
            commenter: email,
            comment: description,
            vote: vote
        })
        .then(
            window.location.reload()
        )
        .catch(async (e) => setMessage("Something went wrong. Try again."));
    };

    function addToCart(event) {
        event.preventDefault();
        axios
        .post("/addtocart", {
            email: email,
            name: item['name'],
            price: item['price']
        })
        .then(async () => setShow(true))
        .catch(async (e) => setMessage(e.response.data.message));
    }


    return (
        <> 
        <Nav />
            <h1> {message} </h1>
            <Alert show={show} variant="success">
                <Alert.Heading>Added To Cart!</Alert.Heading>
                <p> Your item has been successfully added to cart. Go to checkout or continue browsing! </p>
                <hr />
                <div className="d-flex justify-content-end">
                <Button onClick={() => setShow(false)} variant="outline-success">
                    <a href="/checkout">Go to Checkout</a>
                </Button>
                </div>
            </Alert>

        <div className="container">
            <div className="row">
                <div className="py-5 col">
                Picture of product
                </div>
                <div className="py-5 col">
                    <h2> {item['name']} </h2>
                    <p> Voting: {item['voting']}/10 </p>
                    <h4> ${item['price']} </h4>
                    <button type="button" className="btn btn-success" onClick={addToCart} style={{display: display}}> Add to Cart </button>
                </div>
            </div>
        </div>

        <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Discussion Forum</button>
            </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Card style={{ display: display, width: '20rem'}}>
                            <Card.Header>Post A Discussion</Card.Header>
                            <Card.Body>
                                <Form onSubmit={(e) => handleSubmit(e)}>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>Email address</Form.Label>
                                        <h6> {email} </h6>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={3}  placeholder="Description" value={description} onChange={(e) => {setDescription(e.target.value)}}/>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Cast a Vote For This Item </Form.Label>
                                        <Form.Control as="select" onChange={(e) => {setVote(e.target.value)}}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Post</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col">
                        {discussion.map(item =>
                        <Card key={item.commentId} style={{ width: '55rem' }}>
                            <Card.Body>
                                <Card.Title>{item.commenter}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Vote: {item.vote}/10</Card.Subtitle>
                                <Card.Text>{item.comment}</Card.Text>
                            </Card.Body>
                        </Card>
                        
                        )}
                    </div>
                </div>
                </div>
            </div>
        </div>

        <Footer />
        </>
    )
}

export default ItemPart;