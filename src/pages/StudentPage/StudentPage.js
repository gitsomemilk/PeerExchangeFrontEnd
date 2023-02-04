import React, {useEffect, useState} from 'react';
import PopUp from "../../components/PopUp/PopUP";
import Nav from "../../components/NavBar/Nav";
import "./StudentPage.css"
import Button from "../../components/Button\'s/Button";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import FormButton from "../../components/Button's/FormButton/FormButton";
import authContextProvider from "../../Context/AuthContextProvider";


function StudentPage() {
    const [assignments, setAssignments] = useState([]);
    const token = localStorage.getItem('token');
    const [submissions, setSubmissions] = useState([]);

    const [buttonAssignment, setButtonAssignment] = useState(false);
    const [buttonHomeworkInput, setButtonHomeworkInput] = useState(false);

    const [popUpHomework,setPopUpHomework] = useState(false)
    const [popUpHomeworkMessage, setPopUpHomeworkMessage ] = useState(false);
    const [PopUpRandomStudent,setPopUpRandomStudent] =useState(false);

    const [dataSubmission, setDataSubmission] = useState({});

    const [inputId,setInputid] = useState('');
    const [inputUsername, setInputUsername] = useState("");

    const[data,setData] = useState([]);


    const handleChangeSubmission = (event) => {
        setDataSubmission({...dataSubmission, [event.target.name] : event.target.value});
    }
    const handleIdSubmission = (event) => {
        setInputid(event.target.value);
        console.log(inputId)
    }

    const handleUsernameSubmission = (event) => {
        setInputUsername(event.target.value);
    }

    // method to get an overview of all the Assignments
    useEffect(() => {
        async function fetchAssignments() {

            try{
                const reponseAssignment = await axios.get('http://localhost:8081/assignments/all', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },

                });
                console.log("dit zijn de opdrachten die gerenderd worden :",reponseAssignment.data);
                setAssignments(reponseAssignment.data);

            }catch (e) {
                console.error(e)
            }
        }
        void fetchAssignments();
    },[]);

    async function handleSubmitSubmission(e){
        e.preventDefault()
        try{
            const response = await axios.post(`http://localhost:8081/submission`,dataSubmission,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });
            setButtonHomeworkInput(false);
            setPopUpHomework(true)
            setData(response.data)
            setDataSubmission('')

        }catch (e) {
            console.error(e)
        }

    }
    async function handleSubmitStudent(e){
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8081/submission/${inputId}/${inputUsername}`,dataSubmission,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });

            setPopUpHomework(false);
            setPopUpHomeworkMessage(true);

        }catch (e) {
            console.error(e)

        }
    }
        async function fetchRandomSubmission(e){
            e.preventDefault();
            try {
                const response = await axios.get(`http://localhost:8081/submission/random`,{
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
                setSubmissions(response.data);
                setPopUpHomeworkMessage(false);
                setPopUpRandomStudent(true);
                console.log(response)

            }catch (e) {
                console.error(e);
            }
        }


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
                        onClick={() => setButtonHomeworkInput(true)}
                    >
                        Huiswerk inleveren
                    </Button>

                </section>

            </div>

            {/*Popup blok*/}
            <PopUp trigger ={buttonAssignment} setTrigger ={setButtonAssignment}>
                <h2>Opdrachten overzicht:</h2>
                {/*render hier de verschillende lessen vanuit de database*/}
                <section className="assignment-table">
                    <table className="assignments-student">
                        <thead>
                        <tr>
                            <th>Opdracht Titel</th>
                            <th>Deadline</th>
                            <th>Toelichting</th>

                        </tr>
                        </thead>
                        <tbody>
                        {assignments.map((assignment) => {
                            return (
                                <tr key={assignment.id}>
                                    <td>{assignment.title}</td>
                                    <td>{assignment.deadline}</td>
                                    <td>{assignment.description}</td>


                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </section>
            </PopUp>


            <PopUp trigger ={buttonHomeworkInput} setTrigger ={setButtonHomeworkInput}>
                <h2>Huiswerk inleveren</h2>
                <form onSubmit={handleSubmitSubmission}>
                <label htmlFor="file">Github link:</label>
                <input
                    type="url"
                    name="file"
                    id="file"
                    placeholder="plak hier je github link"
                    onChange={handleChangeSubmission}


                />
                <br/>
                <label htmlFor="timestamp">Inlever moment:</label>
                <input
                    type="datetime-local"
                    name="timestamp"
                    id="timestamp"
                    onChange={handleChangeSubmission}
                />
                <br/>

                    <FormButton>Inleveren</FormButton>
                </form>
            </PopUp>
            <PopUp trigger={popUpHomework} setTrigger={setPopUpHomework}>
                <h2>Ingeleverd werk:</h2>
                <table className="submission-table">
                    <thead>
                    <tr>
                        <th>GitHub Link</th>
                        <th>Opdracht ID</th>
                    </tr>
                    </thead>
                    <tbody>
                            <tr key={data.data}>
                                <td>{data.file}</td>
                                <td>{data.id}</td>
                            </tr>
                    </tbody>

                </table>
                <p><strong>vul hier uw gebruikers naam in om te bevestigen samen met uw opdracht ID</strong></p>

                <form onSubmit={handleSubmitStudent}>
                <label htmlFor="username">Gebruikersnaam:</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={inputUsername}
                    onChange={handleUsernameSubmission}

                />
                <br/>
                <label htmlFor="id-input">Opdracht ID:</label>
                <input
                    type="text"
                    name="id-input"
                    id="id-input"
                    value={inputId}
                    onChange={handleIdSubmission}

                />
                <br/>
                <FormButton>Bevestig</FormButton>
                </form>
            </PopUp>
            <PopUp trigger={popUpHomeworkMessage} setTrigger={setPopUpHomeworkMessage}>
                <h3>Bedankt voor het inleveren van je huiswerk!!!</h3>
                <p>druk op deze knop om huiswerk na te kijken van een andere leerling</p>


                <FormButton onClick={fetchRandomSubmission}>Let's GO</FormButton>
            </PopUp>
            <PopUp trigger={PopUpRandomStudent} setTrigger={setPopUpRandomStudent}>
               <h3> Je bent gekoppeld aan een buddy</h3>

                <p>Je kunt de PR van jouw buddy hier <a>{submissions.file}</a> vinden.</p>


            </PopUp>
            <Footer></Footer>
        </>
    );
}

export default StudentPage;