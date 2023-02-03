import React, {useContext, useState} from 'react';
import {Link, useNavigate,} from "react-router-dom"
import "./Nav.css"
import {AuthContext} from "../../Context/AuthContextProvider";


const Nav = () => {
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);
    const {logout} = useContext(AuthContext);
    const {isAuth} = useContext(AuthContext);


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
                {isAuth ?
                    <button
                    onClick={logout}
                    className="nav-button"
                    >
                        logout
                    </button>
                    :
                    <button
                    onClick={handleSignup}
                    className="nav-button"
                    >
                        Meld je aan!
                    </button>}

            </nav>
        </>
    );
};

export default Nav;