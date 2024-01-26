import React from 'react'
import './Home.scss';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';


const Home = () => {
  return (
    <div>
    <Navbar/>
    <div className='home-back'>
<h1>hey buddy</h1>
<Link to={'/signup'}>  <button id='join'>Join now <span style={{ marginLeft: '5px',marginBottom:'-4px' }}><FaArrowRight /></span>
</button></Link>
    </div>
    </div>
  )
}

export default Home