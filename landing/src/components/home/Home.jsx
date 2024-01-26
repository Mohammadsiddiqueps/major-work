import React from 'react'
import './Home.scss';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className='home-back'>
<h1>hey buddy</h1>
<Link to={'/signup'}>  <button id='join'>Join now <span style={{ marginLeft: '5px',marginBottom:'-4px' }}><FaArrowRight /></span>
</button></Link>
    </div>
  )
}

export default Home