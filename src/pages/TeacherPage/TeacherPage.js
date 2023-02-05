import React, {useEffect, useState} from 'react';
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

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [data, setData] = useState('');
    const [inputId, setInputID] = useState('');
    const [inputUsername, setInputUsername] = useState('');


    const [classes, setClasses] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [dataClass, setDataClass] = useState({});
    const [dataAssignment, setDataAssignment] = useState({});


    const [buttonTeacher, setButtonTeacher] = useState(false);
    const [buttonClass, setButtonClass] = useState(false);
    const [buttonAllAssignments, setButtonAllAssignments] = useState(false);

    const [popupNewClass, setPopupNewClass] = useState(false);
    const [popupNewClassTeacher, setPopupNewClassTeacher] = useState(false);
    const [popUpMessage, setpopUpMessage] = useState(false);


    const handleChangeUsername = (event) => {
        setInputUsername(event.target.value);
    }
    const handleChangeInputId = (event) => {
        setInputID(event.target.value);
    }
    useEffect(() => {
        async function fetchClass() {

            try {
                const responseclass = await axios.get(`http://localhost:8081/class/all`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });

                setClasses(responseclass.data);
            } catch (e) {
                console.error(e)

            }
        }

        void fetchClass();
    }, []);
    const handleChangeClass = (event) => {
        setDataClass({...dataClass, [event.target.name]: event.target.value});
    }

    async function handleClassSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8081/class`, dataClass,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
            console.log(response.data)
            setPopupNewClass(false);
            setPopupNewClassTeacher(true);
            setData(response.data);

        } catch (e) {
            console.error(e)
        }
    }

    async function handleSubmitAssignment() {

        try {
            const response = await axios.post(`http://localhost:8081/assignments`, dataAssignment, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            setButtonTeacher(false)
            setData(response.data)
        } catch (e) {
            console.error(e)

        }
    }

    const handleChangeAssignment = (event) => {
        setDataAssignment({...dataAssignment, [event.target.name]: event.target.value});

    }

    async function handleSubmitTeacher(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8081/class/${inputId}/${inputUsername}`, dataClass, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            setPopupNewClassTeacher(false);
            setpopUpMessage(true);

        } catch (e) {
            console.error(e);
        }
    }


    // method to get an overview of all the Assignments
    useEffect(() => {
        async function fetchAssignments() {


            try {
                const reponseAssignment = await axios.get('http://localhost:8081/assignments/all', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
                setAssignments(reponseAssignment.data);

            } catch (e) {
                console.error(e)
            }
        }

        void fetchAssignments();
    }, []);


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
            <PopUp trigger={buttonTeacher} setTrigger={setButtonTeacher} className="assignment-popup">
                <h2>Opdracht aanmaken</h2>
                <form onSubmit={handleSubmitAssignment}>
                    <label htmlFor="title">Titel:</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="titel van de opdracht"
                        onChange={handleChangeAssignment}
                    />
                    <br/>
                    <label htmlFor="description">Omschrijving:</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        placeholder="een kleine beschrijving van de opdracht"
                        onChange={handleChangeAssignment}
                    />
                    <br/>
                    <label htmlFor="deadline">Inleverdatum:</label>
                    <input
                        type="date"
                        name="deadline"
                        id="deadline"
                        onChange={handleChangeAssignment}
                    />
                    <br/>
                    <label htmlFor="addon">Bestand:</label>
                    <input
                        type="file"
                        name="addon"
                        id="addon"
                        onChange={handleChangeAssignment}
                    />


                    <br/>
                    <FormButton>Aanmaken</FormButton>
                </form>
            </PopUp>
            <PopUp trigger={buttonClass} setTrigger={setButtonClass} className="class-popup">
                <h2>Klassen overzicht</h2>
                <br/>
                {/* render hier de klassen vanuit de database*/}
                <section className="class-table">
                    <table className="classes-teacher">
                        <thead>
                        <tr>
                            <th>Start datum</th>
                            <th>Klass id</th>
                            <th>Leraar</th>

                        </tr>
                        </thead>
                        <tbody>
                        {classes.map((clas) => {
                            return (
                                <tr key={clas.id}>
                                    <td>{clas.name}</td>
                                    <td>{clas.id}</td>
                                    <td>{clas.teacher.username}</td>

                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </section>
                <br/>
                <FormButton onClick={() => setButtonClass(false) + setPopupNewClass(true)}>Nieuwe Klas </FormButton>
            </PopUp>
            <PopUp trigger={popupNewClass} setTrigger={setPopupNewClass}>
                <h2>Klas aanmaken</h2>
                <h4>Vul hier eerst de start datum in en druk op verder!</h4>
                <form onSubmit={handleClassSubmit}>
                    <label htmlFor="">Startdatum:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChangeClass}
                        placeholder="bijv. 2023/08"
                    />
                    <br/>
                    <FormButton>verder</FormButton>
                </form>
            </PopUp>
            <PopUp trigger={popupNewClassTeacher} setTrigger={setPopupNewClassTeacher}>
                <h2>Leraar toevoegen:</h2>
                <h3>Aangemaakte klas</h3>
                <table className="classes-teacher">
                    <thead>
                    <tr>
                        <th>Start datum</th>
                        <th>Klas id</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key={data.id}>
                        <td>{data.name}</td>
                        <td>{data.id}</td>
                    </tr>
                    </tbody>
                </table>
                <p><strong>vul hier je gebruikersnaam in om te bevestigen samen met het Klas ID</strong></p>
                <form onSubmit={handleSubmitTeacher}>
                    <label htmlFor="username">Gebruikersnaam:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={inputUsername}
                        onChange={handleChangeUsername}
                    />
                    <label htmlFor="id-input">Klas ID:</label>
                    <input
                        type="text"
                        name="id-input"
                        id="id-input"
                        value={inputId}
                        onChange={handleChangeInputId}
                    />
                    <FormButton>Bevestig</FormButton>
                </form>
            </PopUp>
            <PopUp trigger={popUpMessage} setTrigger={setpopUpMessage}>
                <h2>Nieuwe klas aangemaakt</h2>
            </PopUp>
            <PopUp trigger={buttonAllAssignments} setTrigger={setButtonAllAssignments} className="allAssignments-popup">
                <h2>Opdrachten:</h2>
                {/* render hier alle opdrachten die al zijn aangemaakt */}
                <section className="assignment-table">
                    <table className="assignments-teacher">
                        <thead>
                        <tr>
                            <th>Opdracht Titel</th>
                            <th>Toelichting</th>
                            <th>Bijgevoegd</th>
                        </tr>
                        </thead>
                        <tbody>
                        {assignments.map((assignment) => {
                            return (
                                <tr key={assignment.id}>
                                    <td>{assignment.title}</td>
                                    <td>{assignment.description}</td>
                                    <td>{assignment.addon}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </section>
            </PopUp>
            <Footer></Footer>
        </>
    );
}

export default TeacherPage;