import React from 'react';
import "./SignupPage.css"

const SignupPage = () => {
    return (
        <>

            <body className="signup-page">

    <form className="register-veld">
        <div className="register-Blok">
            <h1 id="registeren">Account aanmaken</h1>

            <label htmlFor="username-field">Gebruikersnaam:
                <input type="text" name="username" id="username-field" placeholder="Username"/>
            </label>

            <label htmlFor="password-field">
                Wachtwoord:
                <input type="password" name="password" id="password-field" placeholder="Password"/>
            </label>


            <button type="submit" id="registerButton">Aanmaken</button>
        </div>
    </form>
            </body>

</>
    );
};

export default SignupPage;