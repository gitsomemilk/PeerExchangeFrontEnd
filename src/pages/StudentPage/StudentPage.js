import React, {useState} from 'react';
import PopUp from "../../components/PopUp/PopUP";
import Nav from "../../components/NavBar/Nav";
import "./StudentPage.css"
import Button from "../../components/Button\'s/Button";
import Footer from "../../components/Footer/Footer";
import FormButton from "../../components/Button's/FormButton/FormButton";

function StudentPage() {
    const [buttonAssignment, setButtonAssignment] = useState(false);
    const [buttonStudent, setButtonStudent] = useState(false);
    const [buttonHomeworkInput, setButtonHomeworkInput] = useState(false);

    return (
        <>
            <Nav></Nav>
            <div className="outer-container-student">
                <section className="buttons-student">
                    <Button
                        type="student-button"
                        className="student-button"
                        onClick={() => setButtonAssignment(true)}
                    >
                        Opdrachten
                    </Button>



                    <Button
                        type="button"
                        className="student-button"
                        onClick={() => setButtonStudent(true)}
                    >
                        Student
                    </Button>

                    <Button
                        type="button"
                        className="student-button"
                        onClick={() => setButtonHomeworkInput(true)}
                    >
                        Huiswerk inleveren
                    </Button>

                </section>
                <h1 className="student-title">voor het eerst hier? vul dan eerst je student gegevens in!!</h1>
            </div>

            {/*Popup blok*/}
            <PopUp trigger ={buttonAssignment} setTrigger ={setButtonAssignment}>
                <h2>Opdrachten overzicht:</h2>
                {/*render hier de verschillende lessen vanuit de database*/}
            </PopUp>

            <PopUp trigger ={buttonStudent} setTrigger ={setButtonStudent}>
                <h2>Persoons gegevens</h2>
                <br/>
                <label htmlFor="first-name">Voornaam:</label>
                <input type="text"
                />
                <br/>
                <label htmlFor="last-name">Achternaam:</label>
                <input type="text"/>
                <br/>
                <label htmlFor="email-adres">Email:</label>
                <input type="email"/>
                <br/>
                <label htmlFor="Start-date">Startdatum:</label>
                <input
                    type="text"
                    placeholder=" voorbeeld: 2023/04"
                />
                <br/>
                <FormButton
                    type="submit"
                >Aanpassen

                </FormButton>
            </PopUp>
            <PopUp trigger ={buttonHomeworkInput} setTrigger ={setButtonHomeworkInput}>
                <h2>Huiswerk inleveren</h2>
                <label htmlFor="Homework-input">Github link:</label>
                <input type="url"/>
                <br/>
                <label htmlFor="timestamp">Inlever moment:</label>
                <input type="datetime-local"/>
                <br/>
                <label htmlFor="Assignment">Opdracht naam:</label>
                <input type="text"/>
                <br/>
                <label htmlFor="student">Naam:</label>
                <input
                    type="text"
                    placeholder="Je eigen gebuikersnaam"
                />
                <br/>
            </PopUp>
            <Footer></Footer>
        </>
    );
}

export default StudentPage;