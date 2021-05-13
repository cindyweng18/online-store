import Footer from "./Footer";
import Nav from "./Nav";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { Form, Field } from 'react-final-form';


function Account(props) {
    const email = localStorage.getItem("userEmail");
    const user = localStorage.getItem("session"); 
    const [name, setName] = useState(user);
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState();
    const [card, setCard] = useState();
    const [money, setMoney] = useState();
    const [complaintsMade, setComplaintsMade] = useState([]);
    const [complaintsReceived, setComplaintsReceived] = useState([]);
    const [orders, setOrders] = useState([]);
    const [votes, setVotes] = useState([]);
    const [message, setMessage] = useState("");

    // New Card Info Input
    const {
        meta,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
        wrapperProps
      } = usePaymentInputs();

    // Get User Account Info
    useEffect(() => {
        const fetchData = async () => {
            const getUser = await axios.get(`/viewaccount?email=${email}`);
            console.log(getUser.data['userData'][0]);
            setAddress(getUser.data['userData'][0]['homeAddress']);
            setMoney(getUser.data['userData'][0]['availableMoney']);
            setComplaintsMade(getUser.data['userData'][0]['complaintsMade']);
            setComplaintsReceived(getUser.data['userData'][0]['complaintsReceived']);
            setOrders(getUser.data['userData'][0]['purchaseHistory']);
            setVotes(getUser.data['userData'][0]['votesCasted']);
            if (getUser.data['userData'][0]['availableMoney'] === null) {
                setCard("");
            } else {
                setCard(getUser.data['userData'][0]['creditCard']);
            }
        }
        fetchData();
    },[email]);

    function editName(newName) {
        axios.post(`/editname`,{
            fullName: newName,
            email: email
        })
        .then(
            localStorage.setItem("session", newName),
            window.location.reload())
        .catch(async (e) => setMessage(e.response.data.message));
    };

    function editAddress(newAddress) {
        axios.post(`/editaddress`,{
            homeAddress: newAddress,
            email: email
        })
        .then(
            // console.log(address))
            window.location.reload())
        .catch(async (e) => setMessage(e.response.data.message));
    };

    function editPassword(newPassword) {
        axios.post(`/editpassword`,{
            password: newPassword,
            email: email
        })
        .then(
            alert("Password Sucessfully Changed."))
        .catch(async (e) => setMessage(e.response.data.message));
    };


    function editCreditCard(data) {
        //console.log(data["expiryDate"].split(" / ").join("/"));
        axios.post('/editcreditcard', {
            name: name,
            number: data['cardNumber'],
            cvc: data['cvc'],
            expirationDate: data['expiryDate'].split(" / ").join("/"),
            email: email
        }).then(
            window.location.reload())
        .catch(async (e) => setMessage(e.response.data.message));
    };

    function editMoney(newMoney) {
        axios.post(`/editmoney`,{
            availableMoney: newMoney,
            email: email
        })
        .then(
            window.location.reload())
        .catch(async (e) => setMessage(e.response.data.message));
    }

    return (
        <>
        <Nav />
        <div className="container py-5">
            <h1> {message} </h1>
            <h1> Account Management </h1>
            <div className="row g-5 py-5">
                <h2> Personal Information </h2>
                <div className="row g-2">
                    <div className="col-sm-6">
                        <h5> Email </h5>
                        <h6> {email} </h6>
                    </div>
                    <Table borderless>
                    <thead>
                        <tr>
                        <th>Full Name (First Name, Last Name)</th>
                        <th>Change Full Name (First Name, Last Name)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{name.replace("-"," ")}</td>
                        <td>
                        <InputGroup className="mb-3">
                            <FormControl
                            autoFocus
                            placeholder="New Name"
                            aria-label="New Name"
                            aria-describedby="basic-addon2"
                            value={name.replace("-"," ")}
                            onChange={(e) => setName(e.target.value)}
                            />
                            <InputGroup.Append>
                            <Button variant="outline-primary" type="submit" onClick={(e) => editName(name)}>Save</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        </td>
                        </tr>
                    </tbody>
                    </Table>
                    <Table borderless>
                    <thead>
                        <tr>
                        <th> Home Address </th>
                        <th>Change Home Address (Street Number and Name, APT/FL, City, State, ZIP Code)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{address}</td>
                        <td>
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="New Home Address (Street Number and Name, APT/FL, City, State, ZIP Code)"
                            aria-label="New Address"
                            aria-describedby="basic-addon2"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            />
                            <InputGroup.Append>
                            <Button variant="outline-primary" type="submit" onClick={(e) => editAddress(address)}>Save</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        </td>
                        </tr>
                    </tbody>
                    </Table>
                </div>
            </div>

            <hr />

            <div className="row g-5 py-5">
                <h2> Change Password </h2>
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <label htmlFor="floatingInputGrid">New Password</label>
                        </div>
                        <button type="submit" className="btn btn-primary ml-2" onClick={() => editPassword(password)}>Save</button>
                    </div>
                </div>
            </div>

            <hr />

            <div className="row g-5 py-5">
                <h2> Payment Methods </h2>
                <div className="row g-2">
                    <Table borderless>
                    <thead>
                        <tr>
                        <th>Credit Card</th>
                        <th>Change Credit Card Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>Current Card Ending in x{card} </td>
                        <td>
                        <br />
                            <Form
                                onSubmit={data => editCreditCard(data)}
                                validate={() => {
                                    let errors = {};
                                    if (meta.erroredInputs.cardNumber) {
                                    errors.cardNumber = meta.erroredInputs.cardNumber;
                                    }
                                    if (meta.erroredInputs.expiryDate) {
                                    errors.expiryDate = meta.erroredInputs.expiryDate;
                                    }
                                    if (meta.erroredInputs.cvc) {
                                    errors.cvc = meta.erroredInputs.cvc;
                                    }
                                    return errors;
                                }}
                                >
                                {({ handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
                                    <div>
                                        <PaymentInputsWrapper {...wrapperProps}>
                                        <svg {...getCardImageProps({ images })} />
                                        <Field name="cardNumber">
                                            {({ input }) => (
                                            <input {...getCardNumberProps({ onBlur: input.onBlur, onChange: input.onChange })} />
                                            )}
                                        </Field>
                                        <Field name="expiryDate">
                                            {({ input }) => (
                                            <input {...getExpiryDateProps({ onBlur: input.onBlur, onChange: input.onChange })} />
                                            )}
                                        </Field>
                                        <Field name="cvc">
                                            {({ input }) => <input {...getCVCProps({ onBlur: input.onBlur, onChange: input.onChange })} />}
                                        </Field>
                                        </PaymentInputsWrapper>
                                    </div>
                                    <Button margintop="major-2" type="submit">
                                        Save
                                    </Button>
                                    </form>
                                )}
                                </Form>
                            <br />
                        </td>
                        </tr>
                    </tbody>
                    </Table>
                    <Table borderless>
                    <thead>
                        <tr>
                        <th> Money Deposit Amount </th>
                        <th>Change Money Deposit Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>${money}</td>
                        <td>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                            type="number"
                            placeholder="New Money Deposit Amount"
                            aria-label="New Money"
                            aria-describedby="basic-addon2"
                            value={money}
                            onChange={(e) => setMoney(e.target.value)}
                            />
                            <InputGroup.Append>
                            <Button type="submit" variant="outline-primary" onClick={() => editMoney(money)}>Save</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        </td>
                        </tr>
                    </tbody>
                    </Table>
                </div>
            </div>
            <hr />
            <div className="row g-5 py-5">
                <h2> Purchase History </h2>
                <div className="row g-2">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Order #</th>
                            <th>Order Details</th>
                            <th>Order Total </th>
                            <th>Delivery Company</th>
                            <th>Tracking Information</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(item => 
                            <tr key={item.id}>
                                <td> {item.id} </td>
                                <td> {item.items.split("[")[1].split("]")[0].replace(/"/g, " ")} </td>
                                <td> {item.totalPrice} </td>
                                <td> {item.delivery_company} </td>
                                <td> {item.tracking_info} </td>
                            </tr>
                                )}
                        </tbody>
                    </Table>
                </div>
            </div>

            <hr />

            <div className="row g-5 py-5">
                <h2> Complaints Filed and Received </h2>
                <div className="row g-2">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Complainer</th>
                            <th>Offender</th>
                            <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaintsMade.map(item => 
                                <tr key={item}>
                                    <td> {name.replace("-"," ")} </td>
                                    <td> {item['offender']} </td>
                                    <td> {item['complaint']} </td>
                                </tr>
                            )}
                            {complaintsReceived.map(item =>
                                <tr key={item}>
                                    <td> {item['complainer']} </td>
                                    <td> {name.replace("-"," ")} </td>
                                    <td> {item['complaint']} </td>
                                </tr>
                                )}
                        </tbody>
                    </Table>
                </div>
            </div>

            <hr />

            <div className="row g-5 py-5">
                <h2> Votes Casted </h2>
                <div className="row g-2">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Item #</th>
                            <th>Vote </th>
                            </tr>
                        </thead>
                        <tbody>
                            {votes.map(item => 
                                <tr item={item.item_id}>
                                    <td> {item.item_id} </td>
                                    <td> {item.vote} </td>
                                </tr>
                                )}
                        </tbody>
                    </Table>
                </div>
            </div>




        </div>




        <Footer />
        </>

    );
}

export default Account;