import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from "axios";

function Manager(props) {
    const history = useHistory();
    const { params } = props.match;
    const [complaints, setComplaints] = useState([]);

    const handleLogout = () => {
        localStorage.clear();
        history.push('/employeelogin');
    };

    useEffect(() => {
        const fetchData = async () => {
            const getComplaints = await axios.get("/getallcomplaints");
            setComplaints(getComplaints.data['getAllComplaints']);
        }
        fetchData();
    }, []);


    return (
        <>
            <div className="container-fluid">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-danger me-md-2" type="button" variant="danger" onClick={handleLogout}>Logout</button>
                </div>
                <h1> Manager - {params.name.replace("-"," ")} </h1>
                <h2> Complaints </h2>
                <Table bordered hover>
                    <thead>
                        <tr>
                        <th>Complaint #</th>
                        <th>Complainer</th>
                        <th>Offender</th>
                        <th>Complaint</th>
                        <th>Defense</th>
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
                            </tr>


                            )}
                    </tbody>
                </Table>




            </div>
        </>
    )
}

export default Manager;