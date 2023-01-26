import axios from "axios";
import './App.css';
import Nav from "./components/NavBar/Nav";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import InlogPage from "./pages/InlogPage/InlogPage";
import SignupPage from "./pages/SignUp/SignupPage";
import {useEffect, useState} from "react";
import TeacherPage from "./pages/TeacherPage/TeacherPage";
import StudentPage from "./pages/StudentPage/StudentPage";
import AdminPage from "./pages/AdminPage/AdminPage";

function App() {
    const [endpoint, setEndpoint] = useState(); // tussen de () moet nog de endpoint van mijn api
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isAuthenticated, toggleAuthenticated] = useState(false);

    // useEffect(() => {
    //     async function fetchData() {
    //         toggleLoading(true);
    //         setError(false);
    //
    //         try {
    //             const {data} = await axios.get(endpoint);
    //             console.log(data);
    //         } catch (e) {
    //             console.error(e);
    //             setError(true);
    //         }
    //         toggleLoading(false);
    //     }
    //     fetchData();
    // },[endpoint]);
    return (
        <>


            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="login" element={<InlogPage/>}/>
                <Route path="signuppage" element={<SignupPage/>}/>
                <Route path="/teacher" element={<TeacherPage/>}/>
                <Route path="/student" element={<StudentPage/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
            </Routes>
            <body>

            <section>

            </section>

            </body>
            {loading && <h1> Een Moment geduld alstublieft... </h1>}
            {error && <h1>Oepsss. deze Peer kan ik niet Exchangen</h1>}
        </>
    )

        ;
}

export default App;
