import Footer from "./Footer";
import Nav from "./Nav";
import React from 'react';
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useState, useEffect} from "react";

function ItemPart(props) {
    const { params } = props.match;
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [item, setItem] = useState({});
    const user = localStorage.getItem("session");
    const email = localStorage.getItem("userEmail");

    // Don't display 'Add to Cart' button if user not logged in
    var display = "none";
    if (user !== null) {
        display = "";
    };

    useEffect(() => {
        const fetchData = async () => {
            const getItem = await axios.get(`/viewpartitem?operating_system=${params.os}&main_purpose=${params.purpose}&architecture=${params.arch}&name=${params.name.split("-").join(" ")}&type=${params.type}`);
            setItem(getItem.data['computerData'][0]);
        }
        fetchData();
    }, [params]);

    function addToCart(event) {
        event.preventDefault();
        axios
        .post("/addtocart", {
            email: email,
            name: params.name.split("-").join(" "),
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
                    <h2> {params.name.split("-").join(" ")} </h2>
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
            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                Discussion
            </div>
        </div>

        <Footer />
        </>
    )
}

export default ItemPart;