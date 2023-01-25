import React, {useState} from 'react';
import {Link, useNavigate,} from "react-router-dom"
import "./Nav.css"


const Nav = () => {
    const navigate = useNavigate();
    const [Auth,setAuthenticated] =useState(false)


    function handleSignup() {
        navigate("/signuppage")

    }
    function homePage(){
        navigate("/")
    }


    return (
        <>
            <nav>

                <h1 className="header" onClick={homePage}><a> Peer Exchange</a> </h1>
                <button
                    onClick={handleSignup}
                    className="nav-button"
                >Meld je aan!</button>

            </nav>
        </>
    );
};

export default Nav;