import React from 'react';
import './App.css';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Signup from './components/signup/Signup';
import Signin from './components/sigin/Signin';
import {Routes, Route, useNavigate} from 'react-router-dom';import './App.css';
import User_home from './components/user-home/User_home';
import Chat from './components/chat/Chat';
import Worker_home from './components/worker home/Worker_home';
import Bec_worker_home from './components/become worker home/Bec_worker_home';
// import Bec_worker_home from './components/become worker details/Bec_worker_det';

function App() {

  return (
    
      <div className="App">
         <Routes> 
        <Route path='/' element={ <Home/>}/>
        <Route path='/signin' element={ <Signin/>}/>
        <Route path='/signup' element={ <Signup/>}/>
        <Route path='/user_home' element={ <User_home/>}/>
        <Route path='/chat' element={<Chat/>}></Route>
        <Route path='/bec_work_home' element={<Bec_worker_home/>}></Route>
        <Route path='/worker_home' element={<Worker_home/>}></Route>
        {/* <Route path='/bec_work_details' element={<Bec_worker_det/>}></Route> */}



        
         
        </Routes>  

  
      </div>
  
  );
}

export default App;
