import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";

function AdminPage() {

    // variabelen blok
    const token = localStorage.getItem('token');
    const [users, setUsers] = useState([]);
    const [classes,setClasses] = useState([])

    // delete a user
    const [deleteThisUser, toggleDeleteThisUser] = useState(false);
    const [idOfUserToDelete, setIdOfUserToDelete] = useState("");
    // delete a class
    const [deleteThisClass,toggleDeleteThisClass] = useState(false);
    const [idOfClassToDelete,setidOfClassToDelete] = useState("");


    // methodes blok
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
                console.log(response.data);
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
        toggleDeleteThisUser(true);
        setIdOfUserToDelete(usernameOfUser);
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
        async function fetchClass(){
            toggleDeleteThisClass(false)
            try {
                const responseclass = await axios.get(`http://localhost:8081/class/all`,{
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
                console.log(responseclass.data);
                setClasses(responseclass.data);
            }catch (e) {
                console.error(e)

            }
        }
        void fetchClass();
    },[]);

    // method to delete a class
    function deleteClassFunction(e, idOfClass){
        e.preventDefault();
        toggleDeleteThisClass(true);
        setidOfClassToDelete(idOfClass);
    }
    useEffect(() =>{
        const controllerClass = new AbortController();

        async function deleteClass(){

            try {
                const response = await axios.delete(`http://localhost:8081/class/${idOfClassToDelete}`,{
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
        return function cleanup(){
            controllerClass.abort();
        }
    },[deleteThisClass])


    return (
        <body className="admin-page">

        <h1>Admin pagina</h1>

        {/*----------------///////////////users\\\\\\\\\\\\\--------------------*/}

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
                {classes.map((clas) =>{
                    return(
                        <tr key={clas.id}>
                            <td>{clas.name}</td>
                            <td>{clas.id}</td>
                            <td>{clas.teacher[0]}</td>

                            <td>
                                <button
                                    type="button"
                                    className="button-admin"
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
        </section>
        </body>
    );
}

export default AdminPage;