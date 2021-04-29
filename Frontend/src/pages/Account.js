import Footer from "./Footer";
import Nav from "./Nav";
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { ContextApi } from "./ContextApi";
import axios from "axios";

function Account(props) {
    const history = useHistory();
    const { params } = props.match;
    // const { User } = useContext(ContextApi);
    // const [user, setUser] = User;
    const session = localStorage.getItem("session");


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