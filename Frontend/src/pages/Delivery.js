import { useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from "react-bootstrap";
import { useState, useEffect } from 'react';
import axios from "axios";
import Alert from 'react-bootstrap/Alert';

function Delivery(props) {
    const { params } = props.match;
    const history = useHistory();
    const [data, setData] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [defense, setDefense] = useState("");
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [alertHeading, setAlertHeading] = useState("");
    const [alertBody, setAlertBody] = useState("");
    const [bid, setBid] = useState(0);

    const handleLogout = () => {
        localStorage.clear();
        history.push('/employeelogin');
    }

    const handleBid = (event, id, delivery) => {
        event.preventDefault();
        if (delivery !== null) {
            setError(true);
        } else {
            axios.post("/postbid",{
                deliverycompany: params.name,
                order_id: id,
                bidprice: bid
            })
            .then(
                setAlertHeading("Your Bid Has Been Posted"),
                setAlertBody("Your bid has been posted. The store clerk will be notified and choose a delivery company. Thank you!"),
                setShow(true))
            .catch(async (e) => setMessage(e.response.data.message));
        }
    }

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
    }

    useEffect(() => {
        const fetchData = async () => {
            const getItem = await axios.get(`/getorders`);
            const getComplaints = await axios.get(`/deliverycomplaints?name=${params.name}`)
            setComplaints(getComplaints.data['deliveryData']['complaintsList']);
            setData(getItem.data['ordersData']);
        }
        fetchData();
    }, [params]);


    return (
        <>
        <div className="container-fluid">
            <h1> {message} </h1>
            <Alert show={error} variant="danger">
                <Alert.Heading>Oops! You cannot bid this!</Alert.Heading>
                <p>
                It looks like there is already a delivery company taking care of this. Please bid the orders with no tracking number or delivery company chosen.
                </p>
            </Alert>
            <Alert show={show} variant="success" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>{alertHeading}</Alert.Heading>
                <p> {alertBody} </p>
            </Alert>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-danger me-md-2" type="button" variant="danger" onClick={handleLogout}>Logout</button>
        </div>
        <h1> Delivery - {params.name} </h1>
        <h2> Orders Placed by Customer </h2>
        <Table bordered hover>
            <thead>
                <tr>
                <th>Order #</th>
                <th>Customer Name</th>
                <th>Customer Home Address</th>
                <th>Customer Order's Total Price</th>
                <th> Delivery Company Chosen </th>
                <th> Tracking Number </th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>

                {data.map(item => 
                <tr key={item.orderId}>
                    <td> {item.orderId} </td>
                    <td> {item.customerName} </td>
                    <td> {item.homeaddress} </td>
                    <td> {item.totalPrice} </td>
                    <td> {item.deliverycompany} </td>
                    <td> {item.tracking} </td>
                    <td>
                    <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                    </InputGroup.Prepend>
                        <FormControl
                        placeholder="Bid Amount"
                        aria-label="Bid Amount"
                        aria-describedby="basic-addon2"
                        value={bid}
                        onChange={(e) => setBid(e.target.value)}
                        />
                        <InputGroup.Append>
                        <Button variant="outline-primary" onClick={(e) => handleBid(e, item.orderId, item.deliverycompany)}>Bid</Button>
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
                <th>Complaint Description</th>
                <th>Defense</th>
                </tr>
            </thead>
            <tbody>
                {complaints.map(item =>
                    <tr key={item.complainerId}>
                        <td> {item.complainerId} </td>
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
                            <Button variant="outline-primary" onClick={(e) => handleDefense(e, item.complainerId)}>Submit</Button>
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

export default Delivery;