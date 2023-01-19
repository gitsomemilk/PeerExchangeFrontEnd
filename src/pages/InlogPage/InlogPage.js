import React from 'react';
import "./InlogPage.css"
const InlogPage = () => {
    return (

        <>

            <body className="login-page">

            <form className="inlogVeld">
                <div className="inlogBlok">
                    <h1 id="registeren">Login</h1>

                    <label htmlFor="username-field">Gebruikersnaam:
                        <input type="text" name="username" id="username-field" placeholder="Username"/>
                    </label>


                    <label htmlFor="password-field">
                        Wachtwoord:
                        <input type="password" name="password" id="password-field" placeholder="Password"/>
                    </label>


                    <button type="submit" id="loginButton">Login</button>
                </div>
            </form>
            </body>

        </>
    );
};

export default InlogPage;