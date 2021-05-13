import Footer from "./Footer";
import Nav from "./Nav";
import React from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useState, useEffect} from "react";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
//import { useHistory } from 'react-router-dom';

function Item(props) {
    //const history = useHistory();
    const { params } = props.match;
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [item, setItem] = useState({});
    const {register, handleSubmit} = useForm();
    const user = localStorage.getItem("session");
    const email = localStorage.getItem("userEmail");
    const [description, setDescription] = useState("");
    const [vote, setVote] = useState(1);
    const [discussion, setDiscussion] = useState([]);
    const [parts, setParts] = useState({
        Processor: "11th Gen Intel® Core™ i7 11700KF (8-Core, 16MB Cache, 3.6GHz to 5GHz w/Intel® Turbo Boost Max)",
        GraphicsCard: "NVIDIA® GeForce® GTX 1650 SUPER™ 4GB GDDR6",
        Memory: "8GB Single Channel DDR4 XMP at 3200MHz; up to 128GB (additional memory sold separately)",
        HardDrive: "1TB 7200RPM SATA 6Gb/s"
    });

    // Don't display 'Add to Cart' button if user not logged in
    var display = "none";
    if (user !== null) {
        display = "";
    };

    // Customization, TODO: Continue fixing it
    const onSubmit = (d) => {
        setParts(JSON.parse(JSON.stringify(d)));
    };

    useEffect(() => {
        const fetchData = async () => {
            const getItem = await axios.get(`/viewcomputeritem?item_id=${params.id}`);
            //console.log(getItem.data['computerData']);
            setDiscussion(getItem.data['computerData']['discussion'])
            setItem(getItem.data['computerData']);
        }
        fetchData();
    }, [params]);


    function addToCart(event) {
        event.preventDefault();
        axios
        .post("/addtocart", {
            email: email,
            name: item['name'],
            price: item['price']
        })
        .then(async () => setShow(true))
        .catch(async (e) => setMessage(e.response.data.message));
    }

    const handleDiscussion = (event) => {
        event.preventDefault();
        axios.post(`/postdiscussion`,{
            item_id: params.id,
            name: item['name'],
            commenter: email,
            comment: description,
            vote: vote
        })
        .then(
            window.location.reload()
        )
        .catch(async (e) => setMessage("Something went wrong. Try again."));
    };


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
                <Image src={`data:image/jpeg;base64,${item["imageBase64"]}`} style={{width: 325, height: 325, margin:"auto"}} alt={item.name}/>
                </div>
                <div className="py-5 col">
                    <h2> {item.name} </h2>
                    <p> Voting: {item.voting}/10 </p>
                    <p className="card-text"> CPU: {item.cpu} </p>
                    <p className="card-text"> GPU: {item.gpu} </p>
                    <p className="card-text"> Memory: {item.memory} </p>
                    <p className="card-text"> Hard Drive: {item.harddrive} </p>
                    <p className="card-text"> Monitor: {item.monitor} </p>
                    <p className="card-text"> Keyboard: {item.keyboard} </p>
                    <p className="card-text"> Mouse: {item.mouse} </p>
                    <h4> ${item['price']} </h4>
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
                    <input {...register("GraphicsCard", { required: true })} type="radio" value="AMD Radeon™ RX 6800 XT 16GB GDDR6 (OC Ready)" defaultChecked/>
                    AMD Radeon™ RX 6800 XT 16GB GDDR6 (OC Ready)
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("GraphicsCard", { required: true })} type="radio" value="NVIDIA® GeForce RTX™ 3070 8GB GDDR6"/>
                    NVIDIA® GeForce RTX™ 3070 8GB GDDR6
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("GraphicsCard", { required: true })} type="radio" value="NVIDIA® GeForce® RTX™ 2080 Ti 11GB GDDR6 (OC Ready)" />
                    NVIDIA® GeForce® RTX™ 2080 Ti 11GB GDDR6 (OC Ready)
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("GraphicsCard", { required: true })} type="radio" value="NVIDIA® GeForce RTX™ 3080 10GB GDDR6X" />
                    NVIDIA® GeForce RTX™ 3080 10GB GDDR6X
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("GraphicsCard", { required: true })} type="radio" value="NVIDIA® GeForce RTX™ 3090 24GB GDDR6X" />
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
                    <input {...register("HardDrive", { required: true })} type="radio" value="512GB M.2 PCIe NVMe SSD (Boot) + 1TB 7200RPM SATA 6Gb/s" defaultChecked/>
                    512GB M.2 PCIe NVMe SSD (Boot) + 1TB 7200RPM SATA 6Gb/s
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("HardDrive", { required: true })} type="radio" value="512GB M.2 PCIe NVMe SSD (Boot) + 2TB 7200RPM SATA 6Gb/s (Storage)"/>
                    512GB M.2 PCIe NVMe SSD (Boot) + 2TB 7200RPM SATA 6Gb/s (Storage)
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("HardDrive", { required: true })} type="radio" value="1TB M.2 PCIe NVMe SSD (Boot) + 1TB 7200RPM SATA 6Gb/s (Storage)" />
                    1TB M.2 PCIe NVMe SSD (Boot) + 1TB 7200RPM SATA 6Gb/s (Storage)
                    </label>
                </div>
                <div className="form-check">
                    <label > 
                    <input {...register("HardDrive", { required: true })} type="radio" value="1TB M.2 PCIe NVMe SSD (Boot) + 2TB 7200RPM SATA 6Gb/s (Storage)" />
                    1TB M.2 PCIe NVMe SSD (Boot) + 2TB 7200RPM SATA 6Gb/s (Storage)
                    </label>
                </div>
                <div className="form-check">
                <input className="btn btn-primary" type="submit" />
              </div>
              </form>
            </div>
            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Card style={{ display: display, width: '20rem'}}>
                            <Card.Header>Post A Discussion</Card.Header>
                            <Card.Body>
                                <Form onSubmit={(e) => handleDiscussion(e)}>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>Email address</Form.Label>
                                        <h6> {email} </h6>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={3}  placeholder="Description" value={description} onChange={(e) => {setDescription(e.target.value)}}/>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Cast a Vote For This Item </Form.Label>
                                        <Form.Control as="select" onChange={(e) => {setVote(e.target.value)}}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Post</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col">
                        {discussion.map(item =>
                        <Card key={item.commentId} style={{ width: '55rem' }}>
                            <Card.Body>
                                <Card.Title>{item.commenter}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Vote: {item.vote}/10</Card.Subtitle>
                                <Card.Text>{item.comment}</Card.Text>
                            </Card.Body>
                        </Card>
                        
                        )}
                        </div>
                        </div>
                        </div>
            </div>
        </div>

        <Footer />
        </>
    )
}

export default Item;