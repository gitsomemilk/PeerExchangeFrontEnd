import React, {useState} from 'react';

import "./HomePage.css"
import Nav from "../../components/NavBar/Nav";
import Button from "../../components/Button\'s/Button";
import {useNavigate} from "react-router-dom";
import Footer from "../../components/Footer/Footer";
const HomePage = () => {

    const navigate = useNavigate();

    function buttonnav(){
       navigate('login')
    }
    return (
        <div className="Homepage">

            <section className="homepage-banner">
            <Nav></Nav>
            </section>
            <section className="homepage-button">
                <Button className="homepage-button" onClick={buttonnav}>Login</Button>
            </section>


            <h2>hier moet een filmpje komen </h2>
            <Footer></Footer>
        </div>
    );
}

export default HomePage;