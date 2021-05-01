import Footer from "./Footer";
import Nav from "./Nav";
import React from 'react';
//import axios from "axios";

function Account(props) {
    const { params } = props.match; //gets user's full name
    //const session = localStorage.getItem("session"); //gets info of user currently logged in


    return (
        <>
        <Nav />
        <div>
            <h1> hello {params.user} </h1>
        </div>




        <Footer />
        </>

    );
}

export default Account;