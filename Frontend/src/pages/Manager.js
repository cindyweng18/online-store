import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

function Manager(props) {
    const history = useHistory();
    const { params } = props.match;
    const [complaints, setComplaints] = useState([]);
    const [warnings, setWarnings] = useState([]);
    const [reasoning, setReasoning] = useState("");
    const [show, setShow] = useState(false);
    const [alertHeading, setAlertHeading] = useState("");
    const [alertBody, setAlertBody] = useState("");
    const [message, setMessage] = useState("");

    const handleLogout = () => {
        localStorage.clear();
        history.push('/employeelogin');
    };

    const handleSubmit = (event,id,email) => {
        event.preventDefault();
        //alert(reasoning);
        axios.post("/warnings", {
            email: email,
            id: id
        })
        .then(
            setAlertHeading("Your Changes Has Been Saved!"),
            setAlertBody("Your changes has been saved. You selected to let this warning stay as a warning. Thank you!"),
            setShow(true))
        .catch(async (e) => setMessage(e.response.data.message));
    }

    useEffect(() => {
        const fetchData = async () => {
            const getComplaints = await axios.get("/getallcomplaints");
            setComplaints(getComplaints.data['getAllComplaints']);
            setWarnings(getComplaints.data['getAllWarnings'])
        }
        fetchData();
    }, []);


    return (
        <>
            <div className="container-fluid">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-danger me-md-2" type="button" variant="danger" onClick={handleLogout}>Logout</button>
                </div>
                <h1> {message} </h1>
                    <Alert show={show} variant="success" onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>{alertHeading}</Alert.Heading>
                        <p> {alertBody} </p>
                    </Alert>
                <h1> Manager - {params.name.replace("-"," ")} </h1>
                <h2> Complaints </h2>
                <Table bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Complainer</th>
                        <th>Offender</th>
                        <th>Complaint</th>
                        <th>Defense</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map(item => 
                            <tr key={item.id}>
                                <td> {item.id} </td>
                                <td> {item.complainer} </td>
                                <td> {item.offender} </td>
                                <td> {item.complaint} </td>
                                <td> {item.defense} </td>
                                <td>
                                    <Form onSubmit={(e) => handleSubmit(e, item.id, item.offender)}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                            <InputGroup.Text>Reason</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl as="textarea" aria-label="With textarea" value={reasoning} onChange={(e) => setReasoning(e.target.value)} />
                                        </InputGroup>
                                        <Button variant="success" type="submit">Stay</Button>
                                        <Button variant="danger" type="submit">Remove</Button>
                                    </Form>
                                </td>
                            </tr>


                            )}
                    </tbody>
                </Table>

                <h2> Warnings </h2>
                <Table bordered hover>
                    <thead>
                        <tr>
                        <th>Warning #</th>
                        <th>Email</th>
                        <th>Reasoning</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {warnings.map(item => 
                            <tr key={item.id}>
                                <td> {item.id} </td>
                                <td> {item.email} </td>
                                <td>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                        <InputGroup.Text>Reason</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl as="textarea" aria-label="With textarea" />
                                    </InputGroup>
                                    <Button variant="success">Stay</Button>
                                    <Button variant="danger">Remove</Button>
                                </td>
                            </tr>


                            )}

                    </tbody>
                </Table>




            </div>
        </>
    )
}

export default Manager;