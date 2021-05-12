import Footer from "./Footer";
import Nav from "./Nav";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import Button from 'react-bootstrap/Button';

function Parts(props) {
    const { params } = props.match;
    const history = useHistory();
    const [items, setItems] = useState([]);

    function goToPart(type) {
        history.push(`/parts/${params.os}/${params.purpose}/${params.arch}/${type}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            const getItems = await axios.get(`/builddesktop?operating_system=${params.os}&main_purpose=${params.purpose}&architecture=${params.arch}&type=${params.type}`);
            setItems(getItems.data['partsData']);
        }
        fetchData();
    }, [params]);
    return (
        <>
        <Nav />

        <div className="container"> 
                <div className="row justify-content-start">
                    <div className="col-6 col-sm-2">
                        <nav className="nav flex-column">
                            <h2> Parts </h2>
                            <Button variant="link" onClick={() => {goToPart("CPU")}}> CPU </Button>
                            <Button variant="link" onClick={() => {goToPart("GPU")}}> GPU </Button>
                            <Button variant="link" onClick={() => {goToPart("RAM")}}> RAM </Button>
                            <Button variant="link" onClick={() => {goToPart("Hard Disk")}}> Hard Disk </Button>
                            <Button variant="link" onClick={() => {goToPart("Battery")}}> Battery </Button>
                            <Button variant="link" onClick={() => {goToPart("Monitor")}}> Monitor </Button>
                            <Button variant="link" onClick={() => {goToPart("Mouse")}}> Mouse </Button>
                            <Button variant="link" onClick={() => {goToPart("Keyboard")}}> Keyboard </Button>
                        </nav>
                    </div>
                    <div className="col">
                        <div className="album py-5 bg-light">
                            <div className="container">
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                                    {items.map(item =>
                                        <div key={item.itemId} className="col">
                                            <div className="card shadow-sm">
                                                <img src="..." className="card-img-top" alt="..." />
                                                <div className="card-body">
                                                    <h2> {item.name} </h2> 
                                                    <p className="card-text"> Estimated Value: ${item.price}</p>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="btn-group">
                                                            <a className="btn btn-primary" href={`/parts/${item.itemId}`} role="button">Customize and Buy</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                               
 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>





        <Footer />
        </>
    )
}

export default Parts;