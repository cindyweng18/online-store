import Footer from './Footer';
import Nav from './Nav';
import { useState, useEffect} from "react";
import axios from "axios";
import Image from 'react-bootstrap/Image';

const Home = () => {
    const [item1, setItem1] = useState({});
    const [item2, setItem2] = useState({});
    const [item3, setItem3] = useState({});
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const getItem1 = await axios.get(`/viewcomputeritem?item_id=9`);
            const getItem2 = await axios.get(`/viewcomputeritem?item_id=14`);
            const getItem3 = await axios.get(`/viewcomputeritem?item_id=31`);
            const popularItems = await axios.get('/popular');
            //console.log(getItem.data['computerData']);
            setItem1(getItem1.data['computerData']);
            setItem2(getItem2.data['computerData']);
            setItem3(getItem3.data['computerData']);
            //console.log(popularItems.data);
            setPopular(popularItems.data['popularData']);
        }
        fetchData();
    }, []);
  return (
    <>
    <Nav />
    <div className="album py-5 bg-light">
        <h1 > Our Top Choices </h1>
        <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div className="col">
                <div className="card shadow-sm">
                    <div className="card-body">
                    <Image src={`data:image/jpeg;base64,${item1["imageBase64"]}`} style={{width: 325, height: 325, margin:"auto"}} alt={item1.name}/>
                        <h2>{item1.name}</h2>
                        <p className="card-text"> CPU: {item1.cpu} </p>
                        <p className="card-text"> GPU: {item1.gpu} </p>
                        <p className="card-text"> Memory: {item1.memory} </p>
                        <p className="card-text"> Hard Drive: {item1.harddrive} </p>
                        <p className="card-text"> Monitor: {item1.monitor} </p>
                        <p className="card-text"> Keyboard: {item1.keyboard} </p>
                        <p className="card-text"> Mouse: {item1.mouse} </p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                            <a className="btn btn-primary" href={`/computer/${item1.computerId}`} role="button">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card shadow-sm">
                    <div className="card-body">
                    <Image src={`data:image/jpeg;base64,${item2["imageBase64"]}`} style={{width: 325, height: 325, margin:"auto"}} alt={item2.name}/>
                        <h2>{item2.name}</h2>
                        <p className="card-text"> CPU: {item2.cpu} </p>
                        <p className="card-text"> GPU: {item2.gpu} </p>
                        <p className="card-text"> Memory: {item2.memory} </p>
                        <p className="card-text"> Hard Drive: {item2.harddrive} </p>
                        <p className="card-text"> Monitor: {item2.monitor} </p>
                        <p className="card-text"> Keyboard: {item2.keyboard} </p>
                        <p className="card-text"> Mouse: {item2.mouse} </p>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                    <a className="btn btn-primary" href={`/computer/${item2.computerId}`} role="button">Learn More</a>
                    </div>
                </div>
                </div>
            </div>
            </div>
                <div className="col">
                    <div className="card shadow-sm">
                        <div className="card-body">
                        <Image src={`data:image/jpeg;base64,${item3["imageBase64"]}`} style={{width: 325, height: 325, margin:"auto"}} alt={item3.name}/>
                            <h2>{item3.name}</h2>
                            <p className="card-text"> CPU: {item3.cpu} </p>
                            <p className="card-text"> GPU: {item3.gpu} </p>
                            <p className="card-text"> Memory: {item3.memory} </p>
                            <p className="card-text"> Hard Drive: {item3.harddrive} </p>
                            <p className="card-text"> Monitor: {item3.monitor} </p>
                            <p className="card-text"> Keyboard: {item3.keyboard} </p>
                            <p className="card-text"> Mouse: {item3.mouse} </p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                <a className="btn btn-primary" href={`/computer/${item3.computerId}`} role="button">Learn More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="album py-5 bg-light">
        <h1 > Our Most Popular Computers </h1>
        <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                {popular.map(item => 
                    <div key={item.id} className="col">
                        <div className="card shadow-sm">
                        <Image src={`data:image/jpeg;base64,${item["imageBase64"]}`} style={{width: 325, height: 325, margin:"auto"}} alt={item3.name}/>
                        <div className="card-body">
                        <h2>{item.name.replace('"', "")}</h2>
                        <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                <a className="btn btn-primary" href={`/computer/${item.computerId}`} role="button">Learn More</a>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    
                    )}

            </div>
        </div>
    </div>
    <Footer />
    </>
  );
}

export default Home;