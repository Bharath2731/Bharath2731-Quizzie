import React, { useEffect, useState } from "react";
import styles from "../styles/navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import CreateQuiz from "./CreateQuiz";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Navbar() {
    const navigate = useNavigate()
    const [loggedIn,setLoggedIn]=useState(localStorage.getItem('jwtoken'))
    useEffect(()=>{
        setLoggedIn(localStorage.getItem('jwtoken'))
    },[])

    const activestyle = ({ isActive }) => ({
        boxShadow: isActive ? " 0px 0px 15px 0px rgba(0, 0, 0, 0.12)" : "",
    });
    const [showcreatequiz,setShowcreatequiz]=useState(false);
    const handleShowcreatequiz=()=>{
        if(!loggedIn){
            toast.warn('Please login to create quiz', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                bodyClassName:styles.toastBodystyles,
                });
                return
        }
        setShowcreatequiz(!showcreatequiz);
    }

    function handleLogout(){
        localStorage.setItem('userData','')
        localStorage.setItem('jwtoken','')
        navigate('/')
    }
    return (
        <>
        
        <div className={styles.outerContainer}>
            <h1>QUIZZIE</h1>
            <div className={styles.navlinksDiv}>
                <NavLink to="/dashboard" style={activestyle} className={styles.navlink}>
                    Dashboard
                </NavLink>
                <br />
                <NavLink to="/analytics" style={activestyle} className={styles.navlink} >
                    Analytics
                </NavLink>
                <br />
                {/* <NavLink
                    to="/createQuiz"
                    style={activestyle}
                    className={styles.navlink}
                >
                    Create Quiz
                </NavLink> */}
                <span className={`${styles.navlink} ${styles.createquiz}`} onClick={handleShowcreatequiz}>
                    Create Quiz
                </span>
            </div>
            <div className={styles.logoutAndLine}>
                <div className={styles.line}></div>
                <p className={styles.logout} onClick={handleLogout}>{loggedIn?'LOGOUT':'LOGIN'}</p>
            </div>
        </div>
        {showcreatequiz&&<CreateQuiz handleShowcreatequiz={handleShowcreatequiz}/>}
        <ToastContainer/>
        </>
    );
}

export default Navbar;
