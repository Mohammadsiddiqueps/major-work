import React from 'react';
import { IoChatbox } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';
import { IoNotifications } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useMainUsername } from '../../context/Authcontext';
import './User_home.scss';

const User_home = () => {
  const { mainUsername } = useMainUsername();

  return (
    <div>
      <div className="photo-main">
        <nav className="navbar-user_home">
          <div className="navbar-logo">Work House</div>
          <ul className="navbar-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><Link to={'/chat'}><IoChatbox className='nav-icons'></IoChatbox></Link></li>
            <li><IoNotifications className='nav-icons'>Profile</IoNotifications></li>
            <li><Link to={'/bec_work_home'}><button id='become-worker'>Become worker</button></Link></li>
            <li className="profile-link">
              <div className="profile-circle">
                <img
                  alt='profile'
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSofPxnJT4MLpeCDPJV85tCX7nivJRk22P5fGXq8oGX15Sy2ajQwnEV9vmckA&s"
                  className="profile-image"
                />
              </div>
            </li>
          </ul>
        </nav>
        <div className="search-content">
          <div className="quote">
            <h2>
              Empower Your <span className='skill'>Skill,</span>
              <br></br>
              Fulfill Your <span className='skill'>Need.</span>
            </h2>
          </div>
          <div className="search-set">
            <h1>{mainUsername?.gender}</h1>
            <input type='text' id='home-search' placeholder='Search your needs...' ></input>
            <FaSearch id='search-icon' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User_home;
