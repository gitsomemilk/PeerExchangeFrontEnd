import React, {useState} from 'react';
import {Link, useNavigate,} from "react-router-dom"
import "./Nav.css"
import logo from "../../Assets/nieuwe logo peerexchance - kopie.png"

const Nav = () => {
    const navigate = useNavigate();
    const [Auth,setAuthenticated] =useState(false)


    function handleSignup() {
        navigate("/signuppage")

    }


    return (
        <>
            <nav>
                <img src={logo} alt="logo"/>
                <h1 className="header">Peer Exchange</h1>
                <ul className="nav-list">

                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <button className="register-button" type="button" onClick={handleSignup}>Register</button>
                </ul>

            </nav>
        </>
    );
};

export default Nav;