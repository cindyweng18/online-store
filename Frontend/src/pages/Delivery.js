import { useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from "react-bootstrap";
import { useState, useEffect } from 'react';
import axios from "axios";

function Delivery(props) {
    const { params } = props.match;
    const history = useHistory();
    const [data, setData] = useState();

    const handleLogout = () => {
        localStorage.clear();
        history.push('/employeelogin');
    }

    useEffect(() => {
        const fetchData = async () => {
            const getItem = await axios.get(`/getorders`);
            console.log(getItem.data);
            setData(getItem.data['ordersData']);
        }
        fetchData();
    }, []);


    return (
        <>
        <div className="container-fluid">
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-danger me-md-2" type="button" variant="danger" onClick={handleLogout}>Logout</button>
        </div>
        <h1> Delivery - {params.name} </h1>
        <h2> Orders Placed by Customer </h2>
        <Table bordered hover>
            <thead>
                <tr>
                <th>Order #</th>
                <th>Customer Email</th>
                <th>Customer Home Address</th>
                <th>Customer Order's Total Price</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>

                {data.map(item => 
                <tr>
                    <td> {item.id} </td>
                    <td> {item.email} </td>
                    <td> {item.homeaddress} </td>
                    <td> {item.totalprice} </td>
                    <td>
                    <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                    </InputGroup.Prepend>
                        <FormControl
                        placeholder="Bid Amount"
                        aria-label="Bid Amount"
                        aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                        <Button variant="outline-primary">Bid</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    </td>
                </tr>
                    )}

            </tbody>
        </Table>

        <h2> Orders Bidded </h2>
        <Table bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Customer Name</th>
                <th>Customer Home Address</th>
                <th>Customer Order's Total Price</th>
                <th>Delivery Company</th>
                <th>Tracking Number</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                </tr>

                <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@mdo</td>
                <td>@mdo</td>
                </tr>

            </tbody>
        </Table>

        <h2> Complaints Received </h2>
        <Table bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Complaint</th>
                <th>Defense</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>Mark</td>
                <td>
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Description"
                    aria-label="Description"
                    aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                    <Button variant="outline-primary">Submit</Button>
                    </InputGroup.Append>
                </InputGroup>
                </td>
                </tr>

                <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Description"
                    aria-label="Description"
                    aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                    <Button variant="outline-primary">Submit</Button>
                    </InputGroup.Append>
                </InputGroup>
                </td>
                </tr>

            </tbody>
        </Table>
        </div>
        </>
    )

}

export default Delivery;