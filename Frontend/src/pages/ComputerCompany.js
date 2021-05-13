import axios from "axios";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';

function ComputerCompany(props) {
    const { params } = props.match;
    const history = useHistory();
    const [defense, setDefense] = useState("");
    const complaints = JSON.parse(localStorage.getItem("complaints"));
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);
    const [alertHeading, setAlertHeading] = useState("");
    const [alertBody, setAlertBody] = useState("");

    const handleLogout = () => {
        localStorage.clear();
        history.push('/employeelogin');
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


    return(
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
            <h1> Computer Company - {params.name.replace("-"," ")} </h1>
            <h2> Complaints </h2>
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
                    {complaints.map(item=>
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

export default ComputerCompany;