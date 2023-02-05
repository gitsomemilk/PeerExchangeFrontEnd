import React, {useContext, useState} from 'react';
import "./InlogPage.css"
import Nav from "../../components/NavBar/Nav";
import {Link, useNavigate} from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import Input from "../../components/Input/Input";
import {AuthContext} from "../../Context/AuthContextProvider";
import {useForm} from "react-hook-form";

function InlogPage() {

    const {handleSubmit, formState: {errors}, register} = useForm();
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const [unknown, setUnknown] = useState(false);

    async function onSubmit(data) {
        try {
            const response = await axios.post('http://localhost:8081/authenticate', data);
            console.log("Response login")
            console.log(response);
            console.log(response.status);
            if (response.status === 403) {
                setUnknown(true);
            }
            login(response.data.jwt);
        } catch (e) {
            console.error(e);
        }
    }


    return (


        <>
            <Nav></Nav><br/>
            <body className="login-page">

            <div className="login-form-outer">
                <form onSubmit={handleSubmit(onSubmit)} className="login-form-inner" >
                    <h1 className="head-text">Inloggen:</h1>
                    <Input
                        id="username"
                        labelText="Gebruikersnaam:"
                        type="text"
                        name="username"
                        autocomplete="username"
                        className="input-text"
                        validationRules={{
                            required: {
                                value: true,
                                message: 'Dit veld is verplicht',
                            }
                        }}
                        register={register}
                        errors={errors}
                    />
                    <Input
                        id="password"
                        labelText="Wachtwoord:"
                        type="password"
                        name="password"
                        className="input-text"
                        validationRules={{
                            required: {
                                value : true,
                                message: 'dit veld is verplicht'
                            }
                        }}
                        register={register}
                        errors={errors}

                    />

                    <button
                        className="login-button"
                        type="submit"
                    >
                        Login
                    </button>

                    {unknown && <h3>Gebruikersnaam is onbekend of wachtwoord klopt niet.</h3>}

                </form>

                <br/>
                <p>Heb je nog geen een account? meld je dan <Link to="/signuppage">hier</Link> aan!!</p>

            </div>



            </body>
            <Footer></Footer>

        </>
    );
}

export default InlogPage;