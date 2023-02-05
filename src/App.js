import axios from "axios";
import './App.css';
import Nav from "./components/NavBar/Nav";
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import InlogPage from "./pages/InlogPage/InlogPage";
import SignupPage from "./pages/SignUp/SignupPage";
import {useContext, useState} from "react";
import TeacherPage from "./pages/TeacherPage/TeacherPage";
import StudentPage from "./pages/StudentPage/StudentPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import {AuthContext} from "./Context/AuthContextProvider";

function App() {
    const {isAuth} = useContext(AuthContext)




    return (
        <>


            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="login" element={<InlogPage/>}/>
                <Route path="signuppage" element={<SignupPage/>}/>
                <Route path="/teacher" element={ isAuth ? <TeacherPage/> : <Navigate to= "/login"/>}/>
                <Route path="/student" element={ isAuth ? <StudentPage/> : <Navigate to={"/login"}/>}/>
                <Route path="/admin" element={ isAuth ? <AdminPage/> : <Navigate to={"/login"}/>}/>
            </Routes>
            <body>

            <section>

            </section>

            </body>

        </>
    )

        ;
}

export default App;
