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

  return (
    
      <div className="App">
         <Routes> 
        <Route path='/' element={ <Home/>}/>
        <Route path='/signin' element={ <Signin/>}/>
        <Route path='/signup' element={ <Signup/>}/>
        <Route path='/user_home' element={ <User_home/>}/>
        <Route path='/chat' element={<Chat/>}></Route>


        
         
        </Routes>  

  
      </div>
  
  );
}

export default App;
