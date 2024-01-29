import React, { useState } from "react";
import styles from "../styles/register.module.css";
import { signinFunction,loginFunction } from "../apis/Register";
import {json, useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";
function Register() {
  const navigate =useNavigate();
  const successToastStyles= {
    position: "top-center",
    fontFamily: "poppins",
    duration: 2000,
    style: {
      fontFamily: "poppins",
      border: "1px solid green",
      letterSpacing: "1px",
    },
  }
  const errorToastStyles ={
    position: "top-center",
    fontFamily: "poppins",
    duration: 2000,
    style: {
      fontFamily: "poppins",
      border: "1px solid red",
      letterSpacing: "1px",
      width:'fit-content'
    },
  }
  //states to show signup and login components
  const [showSignup, setShowSignup] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  //states for signin
  const [signinData, setSigninData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorSigninData, setErrorSigninData] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const handleSigninChange = (e) => {
    const { name, id, value } = e.target;
    setSigninData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorSigninData((prevData) => ({
      ...prevData,
      [name]: false,
    }));
  };

  //states for login
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };
  const handleLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  //api call for signup
  async function handleSignupApi() {
    const { name, email, password, confirmPassword } = signinData;
    if(!name){
      setErrorSigninData((prevData)=>({
        ...prevData,
        name:true,
      }))
      toast.error('all fields equired',errorToastStyles)
      return
    }
    if(!email){
      setErrorSigninData((prevData)=>({
        ...prevData,
        email:true,
      }))
      toast.error('all fields equired',errorToastStyles)
      return
    }
    if(password===""){
      setErrorSigninData((prevData)=>({
        ...prevData,
        password:true
      }));
      toast.error('password required',errorToastStyles)
      return
    }
    if(password!==confirmPassword  ){
      setErrorSigninData((prevData)=>({
        ...prevData,
        password:true,
        confirmPassword:true
      }))
      toast.error('password not same as confirm password',errorToastStyles)
      return

    }
    try {
      const response = await signinFunction(signinData)
      console.log('sussess',response)
      toast.success(response.data.message, successToastStyles);
      localStorage.setItem('userData',JSON.stringify(response.data.userData))
      localStorage.setItem('jwtoken',response.data.jwtoken)
      navigate('/dashboard')
      
    } catch (error) {
      console.log(error)
      
    }
  }

  async function handleLoginApi(){
    const {email,password}=(loginData)
    if(!email){
      toast.error('please fill email')
      return
    }
    if(!password){
      toast.error('please fill password')
      return
    }
    
    try {
      const response =await loginFunction(loginData)
      console.log('response',response)
      toast.success(response.data.message,successToastStyles);
      localStorage.setItem('userData',JSON.stringify(response.data.userData))
      localStorage.setItem('jwtoken',response.data.jwtoken)
      navigate('/dashboard')
    } catch (error) {
      console.log('error',error)
      const errormessage = error?.response?.data?.message;
      toast.error(errormessage?errormessage:'login failed', errorToastStyles);
      
    }
  }
  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <h1>QUIZZIE</h1>
        <div className={styles.links}>
          <span
            className={`${styles.Link} ${showSignup ? styles.activeLink:""}`}
            onClick={handleSignup}
          >
            Sign Up
          </span>
          <span
            className={`${styles.Link} ${showLogin ? styles.activeLink : ""}`}
            onClick={handleLogin}
          >
            Log In
          </span>
        </div>
        <div>
          {showSignup ? (
            <div className={styles.inputContainer}>
              <div className={styles.nameinput}>
                <label htmlFor="name">Name</label>
                <input
                  className = {`${errorSigninData.name?styles.inputError:styles.input}`}
                  type="text"
                  id="name"
                  name="name"
                  value={signinData.name}
                  onChange={handleSigninChange}
                />
              </div>
              <div className={styles.emailinput}>
                <label htmlFor="email">Email</label>
                <input
                  className = {`${errorSigninData.email?styles.inputError:styles.input}`}
                  type="text"
                  id="email"
                  name="email"
                  value={signinData.email}
                  onChange={handleSigninChange}
                />
              </div>
              <div className={styles.passwordinput}>
                <label htmlFor="password">Password</label>
                <input
                  className = {`${errorSigninData.password?styles.inputError:styles.input}`}
                  type="password"
                  id="password"
                  name="password"
                  value={signinData.password}
                  onChange={handleSigninChange}
                />
              </div>
              <div className={styles.confirmpasswordinput}>
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input
                  className = {`${errorSigninData.confirmPassword?styles.inputError:styles.input}`}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={signinData.confirmPassword}
                  onChange={handleSigninChange}
                />
              </div>
              <button className={styles.button} onClick={handleSignupApi}>
                Sign-Up
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          {showLogin ? (
            <div className={styles.inputContainer}>
              <div className={styles.emailinput}>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="loginEmail"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                />
              </div>
              <div className={styles.passwordinput}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="loginPassword"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
              </div>
              <button className={styles.button} onClick={handleLoginApi}>Log In</button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
