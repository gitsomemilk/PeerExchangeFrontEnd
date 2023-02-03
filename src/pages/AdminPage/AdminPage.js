import {useEffect, useState} from "react";
import axios from "axios";
import Nav from "../../components/NavBar/Nav";
import "./AdminPage.css"

function AdminPage() {

    // variabelen blok
    const token = localStorage.getItem('token');
    const [users, setUsers] = useState([]);
    const [classes, setClasses] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [submissions, setSubmissions] = useState([]);

    // delete a user
    const [deleteThisUser, toggleDeleteThisUser] = useState(false);
    const [idOfUserToDelete, setIdOfUserToDelete] = useState("");

    // delete a class
    const [deleteThisClass, toggleDeleteThisClass] = useState(false);
    const [idOfClassToDelete, setIdOfClassToDelete] = useState(``);

    // delete a assignment
    const [deleteThisAssignment, toggleDeleteThisAssignment] = useState(false);
    const [idOfAssignmentToDelete, setIdOfAssignmentToDelete] = useState(``);

    // delete a submission
    const [deleteThisSubmission, toggleDeleteThisSubmission] = useState(false);
    const [idOfSubmissionToDelete, setIdOfSubmissionToDelete] = useState('');

    {/*----------------///////////////methode blok\\\\\\\\\\\\\--------------------*/
    }

    // method to get an overview of all users
    useEffect(() => {
        async function fetchUsers() {
            toggleDeleteThisUser(false);

            try {
                const response = await axios.get('http://localhost:8081/users', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
                setUsers(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchUsers();
    }, []);

    // methods to delete user
    function deleteUserFunction(e, usernameOfUser) {
        e.preventDefault();
        setIdOfUserToDelete(usernameOfUser);
        toggleDeleteThisUser(true);

    }

    useEffect(() => {
        const controller = new AbortController();

        async function deleteUser() {
            try {
                const response = await axios.delete(`http://localhost:8081/users/${idOfUserToDelete}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    signal: controller.signal,
                });
                console.log(response);
            } catch (e) {
                console.error(e);
            }
        }

        void deleteUser();
        return function cleanup() {
            controller.abort();
        }
    }, [deleteThisUser])

    // method to get an overview of all classes
    useEffect(() => {
        async function fetchClass() {
            toggleDeleteThisClass(false)
            try {
                const responseclass = await axios.get(`http://localhost:8081/class/all`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
                console.log(responseclass.data);
                setClasses(responseclass.data);
            } catch (e) {
                console.error(e)

            }
        }

        void fetchClass();
    }, []);

    // method to delete a class
    function deleteClassFunction(e, idOfClass) {
        e.preventDefault();
        toggleDeleteThisClass(true);
        setIdOfClassToDelete(idOfClass);
    }

    useEffect(() => {
        const controllerClass = new AbortController();

        async function deleteClass() {

            try {
                const response = await axios.delete(`http://localhost:8081/class/${idOfClassToDelete}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    signal: controllerClass.signal,
                });
                console.log(response);
            } catch (e) {
                console.error(e)
            }
        }

        void deleteClass();
        return function cleanup() {
            controllerClass.abort();
        }
    }, [deleteThisClass]);

    // method to get an overview of all the Assignments
    useEffect(() => {
        async function fetchAssignments() {
            toggleDeleteThisAssignment(false);

            try {
                const reponseAssignment = await axios.get('http://localhost:8081/assignments/all', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
                console.log(reponseAssignment);
                setAssignments(reponseAssignment.data);

            } catch (e) {
                console.error(e)
            }
        }

        void fetchAssignments();
    }, []);

    // method to delete an Assignment
    function deleteAssignmentFunction(e, idAssignment) {
        e.preventDefault();
        setIdOfAssignmentToDelete(idAssignment);
        toggleDeleteThisAssignment(true);

    }

    useEffect(() => {
        const controllerAssignment = new AbortController();

        async function deleteAssignment() {
            try {
                const response = await axios.delete(`http://localhost:8081/assignments/${idOfAssignmentToDelete}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    signal: controllerAssignment.signal,
                });
                console.log(response)
            } catch (e) {
                console.error(e)
            }
        }

        void deleteAssignment();
        return function cleanup() {
            controllerAssignment.abort();
        }
    }, [deleteThisAssignment]);


    {/*----------------///////////////Return\\\\\\\\\\\\\--------------------*/
    }

    return (

        <body className="admin-page">
        <Nav></Nav>
        <section className="admin-page-inner">
            <h1>Admin pagina</h1>

            {/*----------------///////////////Users\\\\\\\\\\\\\--------------------*/}

            <section className="user-table">
                <h2>Overzicht van alle users</h2>
                <table className="users">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>E-mailadres</th>
                        <th>Voornaam</th>
                        <th>Achternaam</th>
                        <th>Verwijder</th>

                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user.username}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>

                                <td>
                                    <button
                                        type="button"
                                        className="button-admin"
                                        onClick={(e) => deleteUserFunction(e, user.username)}
                                    >
                                        delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                {deleteThisUser &&
                    <h4 className="attention">De user is succesvol verwijderd. Refresh deze pagina om het resultaat
                        te
                        zien in de tabel hierboven.</h4>}
            </section>
            {/*----------------///////////////Classes\\\\\\\\\\\\\--------------------*/}
            <section className="outer-container-small-tables">
            <section className="class-table">
                <h2>Overzicht van alle klassen</h2>
                <table className="classes">
                    <thead>
                    <tr>
                        <th>Start datum</th>
                        <th>Klass id</th>
                        <th>Leraar</th>
                        <th>Verwijderen</th>
                    </tr>
                    </thead>
                    <tbody>
                    {classes.map((clas) => {
                        return (
                            <tr key={clas.id}>
                                <td>{clas.name}</td>
                                <td>{clas.id}</td>
                                <td>{clas.teacher.username}</td>

                                <td>
                                    <button
                                        type="button"
                                        className="button-admin-class"
                                        onClick={(e) => deleteClassFunction(e, clas.id)}
                                    >
                                        delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                {deleteThisClass &&
                    <h4 className="attention">De klass is succesvol verwijderd. Refresh deze pagina om het resultaat
                        te
                        zien in de tabel hierboven.</h4>}
            </section>
            {/*----------------///////////////Assignments\\\\\\\\\\\\\--------------------*/}
            <section className="assignment-table">
                <h2>Overzicht van alle Opdrachten</h2>
                <table className="assignments">
                    <thead>
                    <tr>
                        <th>Opdracht Titel</th>
                        <th>Deadline</th>
                        <th>Toelichting</th>
                        <th>Verwijderen</th>
                    </tr>
                    </thead>
                    <tbody>
                    {assignments.map((assignment) => {
                        return (
                            <tr key={assignment.id}>
                                <td>{assignment.title}</td>
                                <td>{assignment.deadline}</td>
                                <td>{assignment.description}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="button-admin-assignment"
                                        onClick={(e) => deleteAssignmentFunction(e, assignment.id)}
                                    >
                                        delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                {deleteThisAssignment &&
                    <h4 className="attention">De opdracht is succesvol verwijderd. Refresh deze pagina om het resultaat
                        te
                        zien in de tabel hierboven.</h4>}

            </section>
             <section className="submission-table">
                 <h2>Overzicht van alle ingeleverde Opdrachten</h2>
                 <table className="submission">
                     <thead>
                     <tr>
                         <th></th>
                     </tr>
                     </thead>
                 </table>

             </section>


            </section>
        </section>

        </body>
    );
}

export default AdminPage;