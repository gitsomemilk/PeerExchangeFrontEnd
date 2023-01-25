import React, {useState} from 'react';
import PopUp from "../../components/PopUp/PopUP";
import "./TeacherPage.css"
import Button from "../../components/Button\'s/Button";
import Nav from "../../components/NavBar/Nav";
import Footer from "../../components/Footer/Footer";
import FormButton from "../../components/Button's/FormButton/FormButton";
import Input from "../../components/Input/Input";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function TeacherPage() {

    const [buttonTeacher,setButtonTeacher] = useState(false);
    const [buttonClass,setButtonClass] = useState(false);
    const [buttonMessage,setButtonMessage] = useState(false);
    const [buttonPersInfo,setButtonPersInfo] = useState(false);
    const [buttonAllAssignments,setButtonAllAssignments] = useState(false);
    const {handleSubmit, formState: {errors}, register} = useForm();
    const navigate = useNavigate();


    function handleNewMessage() {
        console.log("hier komt een menu voor berichten met mensen uit verschillende klassen")
    }
    function handlePersInfo(){
        console.log("persoons gegevens update")
    }


    async function handleNewClass(data){
        try{
            const response = await axios.post('http://localhost:8081/class', data);
            console.log(response);
            console.log(response.status);
            navigate('/student')
        }catch (e) {
            console.error(e)
        }

    }
    return (
        <>
            <Nav></Nav>
            {/*button blok*/
                <div className="outer-container">
                    <section className="buttons-teacher">
                        <Button type="button"
                                className="button-teacher"
                                onClick={() => setButtonTeacher(true)}

                        >Opdracht aanmaken
                        </Button>
                        <Button type="Button"
                                onClick={() => setButtonClass(true)}
                                className="button-teacher"
                        >klassen
                        </Button>
                        <Button type="Button"
                                onClick={() => setButtonMessage(true)}
                                className="button-teacher"
                        >Inbox
                        </Button>
                        <Button
                            type="Button"
                            onClick={() => setButtonPersInfo(true)}
                            className="button-teacher"
                        >
                            Persoonsgegevens
                        </Button>

                        <Button
                            type="button"
                            onClick={() => setButtonAllAssignments(true)}
                            className="button-teacher"
                        >
                            Opdrachten
                        </Button>

                    </section>
                </div>
            }

            {/*popup blok */}
            <PopUp trigger ={buttonTeacher} setTrigger ={setButtonTeacher} className="assignment-popup">
                <h2>Opdracht aanmaken</h2>
                <form className="create-assignment" onSubmit={handleSubmit}>
                    <label htmlFor="assignment">opdracht titel: </label>
                    <input type="text"
                           required
                           placeholder="typ hier de titel"
                    />
                    <br/>
                    <label htmlFor="class-token">Klassen code: </label>
                    <input type="text"
                           placeholder="XXXX"
                           required
                    />
                    <br/>
                    <label htmlFor="deadline">Deadline :</label>
                    <input type="date"
                           required
                    />
                    <br/>
                    <label htmlFor="message">Toelichting :</label>
                    <br/>
                    <textarea className="message-textarea" cols="30" rows="10"></textarea>
                    <br/>
                    <label htmlFor="input-file">Bijlage : </label>
                    <input type="file"/>
                    <br/>
                    <br/>
                    <FormButton type="submit" onClick={handleSubmit} >versturen</FormButton>
                </form>

            </PopUp>
            <PopUp trigger ={buttonClass} setTrigger ={setButtonClass} className="class-popup">
                <h2>Klassen overzicht</h2>
                <br/>
                {/* render hier de klassen vanuit de database*/}
                <h2>Input nieuwe klas:</h2>
                <form onSubmit={handleSubmit(handleNewClass)} className="class-popup">
                    <label htmlFor="class-code">Klassencode:</label>
                    <input
                        type="text"
                        placeholder="Start-datum klas"
                        required
                    />
                    <br/>
                    <label htmlFor="teacher">leraar:</label>
                    <input
                        type="text"
                        required
                        placeholder="Gebruikersnaam van leraar"
                    />
                    <br/>
                <FormButton onClick={handleNewClass}> Aanmaken</FormButton>
                </form>
            </PopUp>
            <PopUp trigger ={buttonMessage} setTrigger ={setButtonMessage} className="message-popup">
                <h2>Inbox</h2>
                {/*render hier alle inkomende berichten!!!*/}
                <FormButton onClick={handleNewMessage}>+</FormButton>
            </PopUp>
            <PopUp trigger ={buttonPersInfo} setTrigger ={setButtonPersInfo} className="study-group-popup">
                <h2>Persoonlijke informatie </h2>

                <Input
                    id="firstname"
                    labelText="Voornaam:"
                    type="text"
                    name="firstname"
                    className="input-text"
                    register={register}
                    errors={errors}
                />
                <Input
                    id="lastname"
                    labelText="Achternaam:"
                    type="text"
                    name="lastname"
                    className="input-text"
                    register={register}
                    errors={errors}
                /><Input
                id="email"
                labelText="E-mailadres:"
                type="email"
                name="email"
                className="input-text"
                register={register}
                errors={errors}
            />

                <br/>
                <FormButton
                    onClick={handlePersInfo}
                    className="smallButton"
                >Aanpassen</FormButton>
            </PopUp>
            <PopUp trigger ={buttonAllAssignments} setTrigger ={setButtonAllAssignments} className="allAssignments-popup">
                <h2>Opdrachten:</h2>
                {/* render hier alle opdrachten die al zijn aangemaakt */}
            </PopUp>
            <Footer></Footer>
        </>
    );
}

export default TeacherPage;