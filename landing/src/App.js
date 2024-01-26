import React from 'react';
import './App.css';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Signup from './components/signup/Signup';
import Signin from './components/sigin/Signin';
import {Routes, Route, useNavigate} from 'react-router-dom';import './App.css';
import User_home from './components/user-home/User_home';
import Chat from './components/chat/Chat';

function App() {
  const navigate = useNavigate();

  const shouldShowNavbar = () => {
    const currentPath = window.location.pathname;

    // Check if the current path is not user_home or signin
    return !['/user_home', '/signin'].includes(currentPath);
  };
  return (
    
      <div className="App">
      {shouldShowNavbar() && <Navbar />}
         <Routes> 
        <Route path='/' element={ <Home/>}/>
        <Route path='/signin' element={ <Signin/>}/>
        <Route path='/signup' element={ <Signup/>}/>
        <Route path='/user_home' element={ <User_home/>}/>


        
         
        </Routes>  

        {/* <User_home/> */}
        {/* <Chat/> */}
      </div>
  
  );
}

export default App;
