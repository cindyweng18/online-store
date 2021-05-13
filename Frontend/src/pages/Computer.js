import Footer from "./Footer";
import Nav from "./Nav";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Image from 'react-bootstrap/Image';

function Computer(props) {
    // 'params' are the arguments given on the URL - os, purpose, arch - passed by Computer file
    const { params } = props.match;
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const getItems = await axios.get(`/choosecomputer?operating_system=${params.os}&main_purpose=${params.purpose}&architecture=${params.arch}&type=${params.computer}`);
            console.log(getItems.data)
            setItems(getItems.data['computerData']);
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
                            <a className="nav-link active" href="/">CPU</a>
                            <a className="nav-link" href="/">GPU</a>
                            <a className="nav-link" href="/">RAM</a>
                            <a className="nav-link" href="/">Hard Disk</a>
                            <a className="nav-link" href="/">Battery</a>
                        </nav>
                    </div>
                    <div className="col">
                        <div className="album py-5 bg-light">
                            <div className="container">
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                                    {items.map(item =>
                                        <div key={item.computerId} className="col">
                                            <div className="card shadow-sm">
                                                <Image src={`data:image/jpeg;base64,${item["imageBase64"]}`} style={{width: 325, height: 325, margin:"auto"}} alt={item.name}/>
                                                <div className="card-body">
                                                    <h2> {item.name} </h2> 
                                                    
                                                    <p className="card-text"> CPU: {item.cpu} </p>
                                                    <p className="card-text"> GPU: {item.gpu} </p>
                                                    <p className="card-text"> Memory: {item.memory} </p>
                                                    <p className="card-text"> Hard Drive: {item.harddrive} </p>
                                                    <p className="card-text"> Monitor: {item.monitor} </p>
                                                    <p className="card-text"> Keyboard: {item.keyboard} </p>
                                                    <p className="card-text"> Mouse: {item.mouse} </p>
                                                    <p className="card-text"> Estimated Value: ${item.price}</p>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="btn-group">
                                                            <a className="btn btn-primary" href={`/computer/${item.computerId}`} role="button">Customize and Buy</a>
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
    );
}

export default Computer;