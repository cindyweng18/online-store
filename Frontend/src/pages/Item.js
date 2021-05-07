import Footer from "./Footer";
import Nav from "./Nav";
import React from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useState} from "react";
//import { useHistory } from 'react-router-dom';

// TODO: Modify once backend is finished.
function Item(props) {
    //const history = useHistory();
    const { params } = props.match;
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const {register, handleSubmit} = useForm();
    var user = localStorage.getItem("session");
    var display = "none";

    if (user !== null) {
        display = "";
    };

    const onSubmit = (d) => {
        alert(JSON.stringify(d));
    };

    function addToCart(event) {
        event.preventDefault();
        axios
        .post("/addtocart", {
            email: "cindy@test.com",
            name: params.name.split("-").join(" "),
            imageBase64: "example",
            price: 2000
        })
        .then(async () => setShow(true))
        .catch(async (e) => setMessage(e.response.data.message));
    }


    return (
        <> 
        <Nav />
            <h1> {message} </h1>
            <Alert show={show} variant="success">
                <Alert.Heading>Added To Cart!</Alert.Heading>
                <p> Your item has been successfully added to cart. Go to checkout or continue browsing! </p>
                <hr />
                <div className="d-flex justify-content-end">
                <Button onClick={() => setShow(false)} variant="outline-success">
                    <a href="/checkout">Go to Checkout</a>
                </Button>
                </div>
            </Alert>

        <div className="container">
            <div className="row">
                <div className="py-5 col">
                Picture of product
                </div>
                <div className="py-5 col">
                    <h2> {params.name.split("-").join(" ")} </h2>
                    <p> [Rating] </p>
                    <p className="card-text"> 11th Gen Intel® Core™ i7 11700KF (8-Core, 16MB Cache, 3.6GHz to 5GHz w/Intel® Turbo Boost Max) </p>
                    <p className="card-text">Windows 10 Home 64-bit English </p>
                    <p className="card-text"> NVIDIA® GeForce® GTX 1650 SUPER™ 4GB GDDR6 </p>
                    <p className="card-text"> 8GB Single Channel DDR4 XMP at 3200MHz; up to 128GB (additional memory sold separately) </p>
                    <p className="card-text">1TB 7200RPM SATA 6Gb/s </p>
                    <h4> $1,099.99 </h4>
                    <button type="button" className="btn btn-success" onClick={addToCart} style={{display: display}}> Add to Cart </button>
                </div>
            </div>
        </div>

        <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Details &amp; Customize </button>
                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Discussion Forum</button>
            </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Processor</h3>
                <div className="form-check">
                    <label > 
                    <input {...register("Processor", { required: true })} type="radio" value="11th Gen Intel® Core™ i7 11700KF (8-Core, 16MB Cache, 3.6GHz to 5GHz w/Intel® Turbo Boost Max)" defaultChecked/>
                    11th Gen Intel® Core™ i7 11700KF (8-Core, 16MB Cache, 3.6GHz to 5GHz w/Intel® Turbo Boost Max)
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("Processor", { required: true })} type="radio" value="11th Gen Intel® Core™ i9 11900F (8-Core, 16MB Cache, 2.5GHz to 5.2GHz w/Thermal Velocity Boost)" />
                    11th Gen Intel® Core™ i9 11900F (8-Core, 16MB Cache, 2.5GHz to 5.2GHz w/Thermal Velocity Boost)
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("Processor", { required: true })} type="radio" value="11th Gen Intel® Core™ i9 11900KF (8-Core, 16MB Cache, 3.5GHz to 5.3GHz w/Thermal Velocity Boost)" />
                    11th Gen Intel® Core™ i9 11900KF (8-Core, 16MB Cache, 3.5GHz to 5.3GHz w/Thermal Velocity Boost)
                    </label>
                </div>
              </form>
                <h3> Operating System </h3>
                <p> Windows </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Processor</h3>
                <div className="form-check">
                    <label > 
                    <input {...register("Graphics Card", { required: true })} type="radio" value="AMD Radeon™ RX 6800 XT 16GB GDDR6 (OC Ready)" defaultChecked/>
                    AMD Radeon™ RX 6800 XT 16GB GDDR6 (OC Ready)
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("Graphics Card", { required: true })} type="radio" value="NVIDIA® GeForce RTX™ 3070 8GB GDDR6"/>
                    NVIDIA® GeForce RTX™ 3070 8GB GDDR6
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("Graphics Card", { required: true })} type="radio" value="NVIDIA® GeForce® RTX™ 2080 Ti 11GB GDDR6 (OC Ready)" />
                    NVIDIA® GeForce® RTX™ 2080 Ti 11GB GDDR6 (OC Ready)
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("Graphics Card", { required: true })} type="radio" value="NVIDIA® GeForce RTX™ 3080 10GB GDDR6X" />
                    NVIDIA® GeForce RTX™ 3080 10GB GDDR6X
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("Graphics Card", { required: true })} type="radio" value="NVIDIA® GeForce RTX™ 3090 24GB GDDR6X" />
                    NVIDIA® GeForce RTX™ 3090 24GB GDDR6X
                    </label>
                </div>
              </form>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Memory</h3>
                <div className="form-check">
                    <label > 
                    <input {...register("Memory", { required: true })} type="radio" value="16GB Dual Channel DDR4 XMP at 3200MHz" defaultChecked/>
                    16GB Dual Channel DDR4 XMP at 3200MHz
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("Memory", { required: true })} type="radio" value="64GB Dual Channel DDR4 XMP at 3200MHz;" />
                    64GB Dual Channel DDR4 XMP at 3200MHz
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("Memory", { required: true })} type="radio" value="128GB Dual Channel DDR4 XMP at 3200MHz" />
                    128GB Dual Channel DDR4 XMP at 3200MHz
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("Memory", { required: true })} type="radio" value="16GB Single Channel DDR4 XMP at 3400MHz" />
                    16GB Single Channel DDR4 XMP at 3400MHz
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("Memory", { required: true })} type="radio" value="32GB Single Channel DDR4 XMP at 3400MHz" />
                    32GB Single Channel DDR4 XMP at 3400MHz
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("Memory", { required: true })} type="radio" value="64GB Single Channel DDR4 XMP at 3400MHz" />
                    64GB Single Channel DDR4 XMP at 3400MHz
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("Memory", { required: true })} type="radio" value="128GB Single Channel DDR4 XMP at 3400MHz" />
                    128GB Single Channel DDR4 XMP at 3400MHz
                    </label>
                </div>
              </form>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Hard Drive</h3>
                <div className="form-check">
                    <label > 
                    <input {...register("Hard Drive", { required: true })} type="radio" value="512GB M.2 PCIe NVMe SSD (Boot) + 1TB 7200RPM SATA 6Gb/s" defaultChecked/>
                    512GB M.2 PCIe NVMe SSD (Boot) + 1TB 7200RPM SATA 6Gb/s
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("Hard Drive", { required: true })} type="radio" value="512GB M.2 PCIe NVMe SSD (Boot) + 2TB 7200RPM SATA 6Gb/s (Storage)"/>
                    512GB M.2 PCIe NVMe SSD (Boot) + 2TB 7200RPM SATA 6Gb/s (Storage)
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("Hard Drive", { required: true })} type="radio" value="1TB M.2 PCIe NVMe SSD (Boot) + 1TB 7200RPM SATA 6Gb/s (Storage)" />
                    1TB M.2 PCIe NVMe SSD (Boot) + 1TB 7200RPM SATA 6Gb/s (Storage)
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("Hard Drive", { required: true })} type="radio" value="1TB M.2 PCIe NVMe SSD (Boot) + 2TB 7200RPM SATA 6Gb/s (Storage)" />
                    1TB M.2 PCIe NVMe SSD (Boot) + 2TB 7200RPM SATA 6Gb/s (Storage)
                    </label>
                </div>
                <div className="form-check">
                <input className="btn btn-primary" type="submit" />
              </div>
              </form>
            </div>
            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                Discussion
            </div>
        </div>

        <Footer />
        </>
    )
}

export default Item;