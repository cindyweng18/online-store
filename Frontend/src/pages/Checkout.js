import Footer from "./Footer";
import Nav from "./Nav";
//import { useHistory } from 'react-router-dom';
import { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import {useRef} from 'react';
import axios from "axios";

function Checkout() {
    //const history = useHistory();

    // Variables to hold user's info and display on checkout
    const [disable, setDisable] = useState(false);
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [card, setCard] = useState();
    const [money, setMoney] = useState();
    const [message, setMessage] = useState("");
    var user = localStorage.getItem("session").replace("-"," ");

    // If user is not signed in, page shows nothing
    var display = "none";
    if (user !== null) {
        display = "";
    };    

    // Get user's account information
    axios
    .get(`/viewaccount?fullName=${user}`)
    .then(async (response) => {
        setEmail(response.data['userData'][0]['email']);
        setName(response.data['userData'][0]['fullName']);
        setCard(response.data['userData'][0]['creditCard']);
        setAddress(response.data['userData'][0]['homeAddress']);
        setMoney(response.data['userData'][0]['availableMoney']);
    })
    .catch((e) => setMessage("error"));

    // Disables Buy button after click
    var btnRef = useRef();
    const onBtnClick = e => {
        if(btnRef.current){
          btnRef.current.setAttribute("disabled", "disabled");
          setDisable(true)
        }
      }

    // TODO: Item#7

    return(
        <>
        <Nav />
        <div class="container" style={{display:display}}>
            <Alert show={disable} variant="success">
                <Alert.Heading>Purchase Completed</Alert.Heading>
                <p>
                Your purchase has been completed! Check your 'Past Purchases' to have your tracking information as soon as we finalize the shipping details. 
                </p>
                <p> Thank you for shopping at Online Store! </p>
                <hr />
                <div className="d-flex justify-content-end">
                {/* TODO: go to account */}
                <Button onClick={() => setDisable(false)} variant="outline-success">
                    Go to Account Management
                </Button>
                </div>
            </Alert>


            <div class="py-5 text-center">
                <h2>Checkout</h2>
            </div>

            <div class="row g-5">
                <div class="col-md-5 col-lg-4 order-md-last">
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-primary">Your cart</span>
                    <span class="badge bg-primary rounded-pill">3</span>
                    </h4>
                    <ul class="list-group mb-3">
                    <li class="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                        <h6 class="my-0">Product name</h6>
                        <small class="text-muted">Brief description</small>
                        </div>
                        <span class="text-muted">$12</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                        <h6 class="my-0">Second product</h6>
                        <small class="text-muted">Brief description</small>
                        </div>
                        <span class="text-muted">$8</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                        <h6 class="my-0">Third item</h6>
                        <small class="text-muted">Brief description</small>
                        </div>
                        <span class="text-muted">$5</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Total (USD)</span>
                        <strong>$20</strong>
                    </li>
                    </ul>
                </div>

                <div class="col-md-7 col-lg-8">
                    <h2> {message} </h2>
                    <h4 class="mb-3">Shipping address</h4>
                    <form>
                    <div class="row g-3">
                        <div class="col-sm-6">
                        <label for="firstName" class="form-label">First name</label>
                        <h6> {name.split(" ")[0]} </h6>
                        </div>

                        <div class="col-sm-6">
                        <label for="lastName" class="form-label">Last name</label>
                        <h6> {name.split(" ")[1]} </h6>
                        </div>

                        <div class="col-12">
                        <label for="email" class="form-label">Email </label>
                        <h6> {email} </h6>
                        </div>

                        <div class="col-12">
                        <label for="address" class="form-label">Address</label>
                        <h6> {address} </h6>
                        </div>

                        <div class="col-md-4">
                        <label for="state" class="form-label">State</label>
                        <h6> New York </h6>
                        </div>

                        <div class="col-md-3">
                        <label for="zip" class="form-label">Zip</label>
                            <h6> 10031 </h6>
                        </div>
                    </div>

                    <p> Address is not correct? Click here to change it.</p>


                    <hr class="my-4" />

                    <h4 class="mb-3">Payment</h4>
                    <div class="my-3">
                        <div class="form-check">
                        <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked required/>
                        <label class="form-check-label" for="credit">Credit card (ending in 1234) </label>
                        </div>
                        <div class="form-check">
                        <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required/>
                        <label class="form-check-label" for="debit">Money Deposit</label>
                        </div>
                    </div>
                    <button class="w-100 btn btn-primary btn-lg" type="submit" ref={btnRef} onClick={onBtnClick}>Buy!</button>
                    </form>
                </div>
            </div>
        </div>


        <Footer />
        </>
    );

}

export default Checkout;