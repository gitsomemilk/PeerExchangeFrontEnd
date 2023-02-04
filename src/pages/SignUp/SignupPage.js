import React, {useContext, useState} from 'react';
import "./SignupPage.css"
import Nav from "../../components/NavBar/Nav";
import {Link, useNavigate} from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import {AuthContext} from "../../Context/AuthContextProvider";
import {useForm} from "react-hook-form"
import axios from "axios";
import Input from "../../components/Input/Input";

function SignupPage() {
    // variabelen blok
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);
    const {handleSubmit, formState: {errors},register} = useForm();
    const [succesRegister, toggleSuccesRegister] = useState( true );

    async function registerUser(data){
        console.log(data)
        console.log("deze data zit in de register")

        try {
            const response = await axios.post('http://localhost:8081/users', data )
            console.log(response);
            console.log("de response in de register");

            if (response.status !== 201){
                console.log("registratie mislukt !!!!");
                toggleSuccesRegister(false);
            }
            navigate('/login')
        }catch (error){
            console.error(error)
        }
    }



    return (
        <>


         <body className="signup-page">
         <Nav></Nav><br/>
         <div className="signup-form-outer">
             <form onSubmit={handleSubmit(registerUser)} className="signup-form-inner" >
                 <h1 className="head-text">Account aanmaken:</h1>
                <Input
                    id="username"
                    labelText="Gebruikersnaam:"
                    type="text"
                    name="username"
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
                 <Input
                     id="firstname"
                     labelText="Voornaam:"
                     type="text"
                     name="firstname"
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
                 <Input
                     id="lastname"
                     labelText="Achternaam:"
                     type="text"
                     name="lastname"
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
                 <Input
                     id="email"
                     labelText="E-mailadres:"
                     type="text"
                     name="email"
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

                 <label htmlFor="role-selector">student of leraar?</label>
                 <select
                     name="teacher"
                     id="teacher"
                     {...register("teacher",{
                         required: {
                             value : true,
                             message: 'dit veld is verplicht'
                         }
                     })}
                 >
                 <option value= "false" >
                     ik ben een student
                 </option>
                 <option value="true" >
                     ik ben een leraar
                 </option>
             </select>
                 <button className="signup-button" type="submit">Aanmelden</button>
             </form>
             <br/>
             <p>Heb je toch wel al een account? Log dan <Link to="/login">hier</Link> in.</p>

         </div>
        <Footer></Footer>


         </body>


</>
    );
};

export default SignupPage;