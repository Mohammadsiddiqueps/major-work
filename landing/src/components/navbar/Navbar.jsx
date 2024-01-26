import React from 'react'
import { AiFillChrome} from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";

import './Navbar.scss';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div>
    <div className="header-main">
        <div className="logodiv">
            <a className='logo' ><Link to={'/'}>
    <AiFillChrome/>The</Link>
            </a>

        </div>
        <div className="navbar">
            <ul className='navlist'>
                <li className='navitems'>
                    <a href='#' className='navlink'><Link to={'/'}>Home</Link></a>
                    
                </li>
                <li className='navitems'>
                    <a href='#' className='navlink'>Works</a>
                </li>
                <li className='navitems'>
                    <a href='#' className='navlink'>About</a>
                </li>

                <li className='navitems'>
                    <a href='#' className='navlink'>Team</a>
                </li>

                <li className='navitems'>
                    <a href='#' className='navlink'>Contact</a>
                </li>


<div className='navbtn'>

                <li className='navitems'>
                    <a id='signin'><Link to={'/signin'}>Sign-in</Link></a>
                </li>

                <li className='navitems'>
                <Link to={'/signup'}> <button id='join'>Join now <span style={{ marginLeft: '5px',marginBottom:'-4px' }}><FaArrowRight /></span>
</button></Link>
                </li>
</div>
            </ul>
        </div>
    </div>

    </div>
  )
}

export default Navbar