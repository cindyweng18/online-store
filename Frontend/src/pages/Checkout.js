import Footer from "./Footer";
import Nav from "./Nav";
import { useHistory } from 'react-router-dom';
import { useState, useEffect} from "react";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import {useRef} from 'react';
import axios from "axios";

function Checkout() {
    const history = useHistory();

    // Variables to hold user's info and display on checkout
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [address, setAddress] = useState();
    const [card, setCard] = useState();
    const [money, setMoney] = useState();
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [message, setMessage] = useState("");
    const [method, setMethod] = useState("card");

    const email = localStorage.getItem("userEmail");
    const user = localStorage.getItem("session").replace("-"," ");

    console.log(money, method);

    // If user is not signed in, page shows nothing
    var display = "none";
    if (user !== null) {
        display = "";
    };    

    // Function to delete a specific product from cart
    function deleteProduct(productName) {
        axios.post("/deleteproduct", {
            email: email,
            name: productName,
        })
        .then(async (response) => {
            setCart(response.data['cartData']);
            window.location.reload();
        })
        .catch(async (e) => setMessage(e.response.data.message));
    }

    
    useEffect(() => {
        const fetchData = async () => {
            // Get user info
            const getUser = await axios.get(`/viewaccount?email=${email}`);
            // Get cart items
            const getCart =  await axios.get(`/viewcart?email=${email}`);
            
            setFirstName(getUser.data['userData'][0]['fullName'].split(" ")[0]);
            setLastName(getUser.data['userData'][0]['fullName'].split(" ")[1]);
            setCard(getUser.data['userData'][0]['creditCard']);
            setAddress(getUser.data['userData'][0]['homeAddress']);
            setMoney(getUser.data['userData'][0]['availableMoney']);
            setCart(getCart.data['cartData']['allProducts']);
            setTotal(getCart.data['cartData']['totalPrice']);
        }
        fetchData();
    
    }, [user, email]);

    // Disables Buy button after click
    var btnRef = useRef();
    const onBtnClick = e => {
        axios
        .post("/checkout", {
            customerName: user,
            email: email,
            totalPrice: total,
            paymentMethod: method,
        })
        .then( async (response) => {
            if (response.data.Error === 'True') {
                console.log(response.data.Error);
                setDisable(false);
                setError(true);
            } 
            
        })
        .catch(async (e) => setMessage(e.response.data.message));

        if(btnRef.current){
          btnRef.current.setAttribute("disabled", "disabled");
          setDisable(true);
        }
      }

      const goToAccount = e => {
        history.push(`/account/${localStorage.getItem("session")}`)
      }

    return(
        <>
        <Nav />
        <div className="container" style={{display:display}}>
            <Alert show={disable} variant="success">
                <Alert.Heading>Purchase Completed</Alert.Heading>
                <p>
                Your purchase has been completed! Check your 'Past Purchases' to have your tracking information as soon as we finalize the shipping details. 
                </p>
                <p> Thank you for shopping at Online Store! </p>
                <hr />
                <div className="d-flex justify-content-end">
                {/* TODO: go to account */}
                <Button onClick={() => goToAccount()} variant="outline-success">
                    Go to Account Management
                </Button>
                </div>
            </Alert>

            <Alert show={error} variant="danger">
                <Alert.Heading>Oops! You got an error!</Alert.Heading>
                <p>
                It looks like you do not have enough money. Go to your Account Management to update your money.
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                {/* TODO: go to account */}
                <Button onClick={() => goToAccount()} variant="outline-danger">
                    Go to Account Management
                </Button>
                </div>
            </Alert>


            <div className="py-5 text-center">
                <h2>Checkout</h2>
            </div>

            <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <h1> {message} </h1>
                    <span className="text-primary">Your cart</span>
                    <span className="badge bg-primary rounded-pill">{cart.length}</span>
                    </h4>
                    <ul className="list-group mb-3">
                    {cart.map(item =>
                    <li key={item} className="list-group-item d-flex justify-content-between lh-sm">
                        <button type="button" className="btn-close" aria-label="Close" onClick={ () => {deleteProduct(item.name.split("-").join(" "))}}></button>
                        <div>
                            <h6 className="my-0"> {item.name.split("-").join(" ")} </h6>
                            <small className="text-muted">Brief description</small>
                        </div>
                        <span className="text-muted">${item.price}</span> 
                        
                    </li>
                    )}
                    <li className="list-group-item d-flex justify-content-between">
                        <span>Total (USD)</span>
                        <strong>${total}</strong>
                    </li>
                    </ul>
                </div>

                <div className="col-md-7 col-lg-8">
                    <h4 className="mb-3">Shipping address</h4>
                    <form>
                    <div className="row g-3">
                        <div className="col-sm-6">
                        <label htmlFor="firstName" className="form-label">First name</label>
                        <h6> {firstName} </h6>
                        </div>

                        <div className="col-sm-6">
                        <label htmlFor="lastName" className="form-label">Last name</label>
                        <h6> {lastName} </h6>
                        </div>

                        <div className="col-12">
                        <label htmlFor="email" className="form-label">Email </label>
                        <h6> {email} </h6>
                        </div>

                        <div className="col-12">
                        <label htmlFor="address" className="form-label">Address</label>
                        <h6> {address} </h6>
                        </div>
                    </div>

                    <Button onClick={() => goToAccount()} variant="link">
                        Address is not correct? Click here to change it.
                    </Button>


                    <hr className="my-4" />

                    <h4 className="mb-3">Payment</h4>
                    <div className="my-3">
                        <div className="form-check">
                        <input id="credit" name="paymentMethod" type="radio" className="form-check-input" onChange={() => {setMethod("card")}} defaultChecked required/>
                        <label className="form-check-label" htmlFor="credit">Credit card (ending in {card}) </label>
                        </div>
                        <div className="form-check">
                        <input id="money" name="paymentMethod" type="radio" className="form-check-input" onChange={() => {setMethod("money")}} required/>
                        <label className="form-check-label" htmlFor="debit">Money Deposit</label>
                        </div>
                    </div>
                    <button className="w-100 btn btn-primary btn-lg" type="submit" ref={btnRef} onClick={onBtnClick}>Buy!</button>
                    </form>
                </div>
            </div>
        </div>


        <Footer />
        </>
    );

}

export default Checkout;