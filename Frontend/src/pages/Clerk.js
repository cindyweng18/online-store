import { useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import { useState, useEffect } from 'react';

function Clerk(props) {
    const { params } = props.match;
    const history = useHistory();
    const complaints = JSON.parse(localStorage.getItem("complaints"));
    const email = localStorage.getItem("email");
    const [defense, setDefense] = useState("");
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);
    const [alertHeading, setAlertHeading] = useState("");
    const [alertBody, setAlertBody] = useState("");
    const [bids, setBids] = useState([]);
    const [justification, setJustification] = useState("");

    const handleLogout = () => {
        localStorage.clear();
        history.push('/employeelogin');
    };

    const handleBid = (event, bidId, orderId, delivery) => {
        event.preventDefault();
        axios.post("/choosebid", {
            bidId: bidId,
            orderId: orderId,
            delivery_company: delivery,
            justification: justification,
            email: email
        })
        .then(
            setAlertHeading("Your Choice Has Been Saved."),
            setAlertBody("Your choice has been saved and the delivery company will take it from here. Thank you!"),
            setShow(true))
        .catch(async (e) => setMessage(e.response.data.message));
    };

    
    const handleDefense = (event, id) => {
        event.preventDefault();
        axios.post("/writedefense", {
            id: id,
            defense: defense
        })
        .then(
            setAlertHeading("Your Defense Has Been Posted!"),
            setAlertBody("Your defense has been posted. The manager will take a look at the case and we will let you know of the decision. Thank you!"),
            setShow(true))
        .catch(async (e) => setMessage(e.response.data.message));
    };

    useEffect(() =>{
        const fetchData = async () => {
            const getBids = await axios.get("/getbids");
            setBids(getBids.data['bidsData']);
        }
        fetchData();
    }, []);

    return (
        <>
        <div className="container-fluid">
        <h1> {message} </h1>
            <Alert show={show} variant="success" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>{alertHeading}</Alert.Heading>
                <p> {alertBody} </p>
            </Alert>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-danger me-md-2" type="button" variant="danger" onClick={handleLogout}>Logout</button>
        </div>
        <h1> Store Clerk - {params.name.replace("-"," ")} </h1>
        <h2> Bids Made by Delivery Companies </h2>
        <Table bordered hover>
            <thead>
                <tr>
                {/* <th> </th> */}
                <th>Bid #</th>
                <th>Delivery Company</th>
                <th>Order #</th>
                <th>Bid Amount</th>
                <th>Justification</th>
                </tr>
            </thead>
            <tbody>
                {bids.map(item =>
                <tr key={item.bidId}>
                    {/* <td>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        </div>
                    </td> */}
                    <td> {item.bidId} </td>
                    <td> {item.deliverycompany} </td>
                    <td> {item.orderId} </td>
                    <td> ${item.bidPrice} </td>
                    <td> 
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Description"
                        aria-label="Description"
                        aria-describedby="basic-addon2"
                        value={justification}
                        onChange={(e) => setJustification(e.target.value)}
                        />
                        <InputGroup.Append>
                        <Button variant="outline-primary" onClick={(e) => handleBid(e, item.bidId, item.orderId, item.deliverycompany)}>Choose This Bid</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    </td>
                </tr>
                    )}

            </tbody>
        </Table>


        <h2> Complaints Received </h2>
        <Table bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Complainer</th>
                <th>Complaint</th>
                <th>Defense</th>
                </tr>
            </thead>
            <tbody>
                {complaints.map(item =>
                <tr key={item}>
                    <td> {item.complainId} </td>
                    <td> {item.complainer} </td>
                    <td> {item.complaint} </td>
                    <td>                
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Description"
                            aria-label="Description"
                            aria-describedby="basic-addon2"
                            value={defense}
                            onChange={(e) => setDefense(e.target.value)}
                            />
                            <InputGroup.Append>
                            <Button variant="outline-primary" onClick={(e) => handleDefense(e, item.complainId)}>Submit</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </td>
                </tr>
                    )}

            </tbody>
        </Table>
        </div>
        </>
    )

}

export default Clerk;