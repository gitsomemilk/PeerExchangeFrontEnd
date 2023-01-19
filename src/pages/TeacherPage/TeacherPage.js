import React, {useState} from 'react';
import PopUp from "../../components/PopUp/PopUP";
import "./TeacherPagee.css"
import Button from "../../components/Button/Button";

function TeacherPage() {
    const [isAuthenticated,toggleAuthenticated ] = useState(false);
    const [buttonTeacher,setButtonTeacher] = useState(false)
    const [buttonClass,setButtonClass] = useState(false)
    const [buttonMessage,setButtonMessage] = useState(false)
    const [buttonStudyGroup,setButtonStudyGroup] = useState(false)



    function handleSubmit() {
        console.log("alles ingevuld")

    }

    function handleNewMessage() {
        console.log("hier komt een menu voor berichten met mensen uit verschillende klassen")
    }
    function handleNewStudyGroup(){
        console.log("maak een nieuwe studie groep")
    }

    function handleNewClass(){
        console.log("maak een nieuwe klas aan")
    }
    return (
        <>
            {/*button blok*/}
            <section className="buttons-teacher">
                <button type="button"
                        onClick={() => setButtonTeacher(true)}
                >opdracht aanmaken
                </button>
                <button type="button"
                        onClick={() => setButtonClass(true)}
                >klassen
                </button>
                <button type="button"
                        onClick={() => setButtonMessage(true)}
                >Berichten
                </button>
                <button type="button"
                        onClick={() => setButtonStudyGroup(true)}
                >studiegroepen
                </button>

            </section>



            {/*popup blok */}
            <PopUp trigger={buttonTeacher} setTrigger={setButtonTeacher} className="assignment-popup">
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
                    <label htmlFor="random-students">studiegroepen :</label>
                    <label htmlFor="yes"> Ja </label>
                    <input className="yes" type="radio"/>
                    <label htmlFor="no"> Nee </label>
                    <input className="no" type="radio"/>
                    <br/>
                    <Button type="submit" onClick={handleSubmit} >versturen</Button>
                </form>

            </PopUp>
            <PopUp trigger ={buttonClass} setTrigger={setButtonClass} className="class-popup">
                <h2>Klassen overzicht</h2>
                {/* render hier de klassen vanuit de database*/}
                <Button onClick={handleNewClass}>Klas aanmaken</Button>
            </PopUp>
            <PopUp trigger ={buttonMessage} setTrigger={setButtonMessage} className="message-popup">
                <h2>Berichten</h2>
                {/*render hier alle inkomende berichten!!!*/}
                <Button onClick={handleNewMessage}>+</Button>
            </PopUp>
            <PopUp trigger={buttonStudyGroup} setTrigger={setButtonStudyGroup} className="study-group-popup">
                <h2>Studie groepen </h2>
                {/*render hier de gemaakte studie groepen vanuit de database*/}
                <Button onClick={handleNewStudyGroup}>+</Button>
            </PopUp>

        </>
    );
}

export default TeacherPage;