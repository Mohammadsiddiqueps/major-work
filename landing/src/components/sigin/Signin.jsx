import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FaUser } from "react-icons/fa";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import'./Signin.scss';
import { FaGoogle } from "react-icons/fa";
import axios, { Axios } from 'axios';
import { Navigate, useNavigate } from 'react-router';
import Signup from '../signup/Signup';
import { useMainUsername } from '../../context/Authcontext';
const Signin = () => {
const navigate=useNavigate();
      const [password, setPassword] = useState('');
      const [showPassword, setShowPassword] = useState(false);
      const { mainUsername,setMainUsername } = useMainUsername();
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };
    
      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
      useEffect(() => {
        console.log(mainUsername); // This will log the updated state when it changes
      }, [mainUsername]); 
      const handleFormSubmit=(e)=>{
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value; 
        console.log(username)

        console.log(password)
        axios.post('http://localhost:5000/login',{username,password})
.then(result=>{
if(result.data.status==="Success"){
  console.log(result.data.user); // Access user data here
  setMainUsername(result.data.user)
  console.log(mainUsername)

  alert("login success")
navigate('/user_home')}
else{
  alert("login fail")
}
})

      }
  return (
<div className='set' style={{backgroundColor:"red"}}>
 <div className='mainsignin'> 
            <div className='mainsigninin'>

       <div className="first">
       <br></br>
       <br></br>
<div className="seg">
        <h1>SignIn</h1>
        <br></br>
        <br></br>
        <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <br></br>
<div className="connect">
          <input
            type="text"
            className="input"
            name="username"
            placeholder='username'
            id='username'
            /><FaUser className='ic'/>
            </div>
        </div>
        <div>
        <br></br>
          <label htmlFor="password">Password:</label>
          <br></br>
<div className="connect">
          <input
            type={showPassword ? 'text' : 'password'}
            className="input"
            name="password"
            placeholder='password'
            id='password'
            />
            {showPassword ? (
        <FaEyeSlash className='ic' onClick={togglePasswordVisibility} />
      ) : (
        <FaEye className='ic' onClick={togglePasswordVisibility} />
      )}
                  </div>
        </div>
       <div className="rem">

        <div>
          <label htmlFor="rememberMe">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              />
            Remember Me
          </label>
          <a href='#' className='forget'>Forgot Password?</a>
        </div>
              </div>
              <br></br>
       <br></br>
        <button type="submit" id='sign-but'>Sign In</button>
        <br></br>

        <br></br>
        <hr style={{width:'330px'}}></hr>
        <br></br>
        <br></br>

        <div>
          <button type="button"id='google' >
            Sign In with Google <FaGoogle className='g-icon' />

          </button>
        </div>
      </form>
              </div>
      </div>
      <div className="second"></div>

      </div>
    </div>
    </div>      // </body>
  )
}

export default Signin;