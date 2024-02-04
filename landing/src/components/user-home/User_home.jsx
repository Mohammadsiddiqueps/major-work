import React, { useEffect, useState } from 'react';
import { IoChatbox } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';
import { IoNotifications } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useMainUsername } from '../../context/Authcontext';
import './User_home.scss';
import { HiDotsVertical } from 'react-icons/hi';

const Home = () => {
  const { mainUsername,setMainUsername } = useMainUsername();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isNewNotification, setIsNewNotification] = useState(true);
  const [isNewChats, setIsNewChats] = useState(true);
  const [alreadyWorker, setAlreadyWorker] = useState(false);
  const navigate = useNavigate();
const [showProfile,setShowProfile]=useState(false)
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationClick = (notification) => {
    if (notification.type === 'chat') {
      navigate('/chat');
      console.log(`Clicked on chat notification: ${notification.message}`);
    } else if (notification.type === 'reminder') {
      console.log(`Clicked on reminder notification: ${notification.message}`);
    } else if (notification.type === 'other') {
      console.log(`Clicked on other notification: ${notification.message}`);
    }
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notif) => notif.id !== notification.id)
    );
  };
const toogleProfile=()=>{
  setShowProfile(!showProfile)
  console.log(mainUsername)
}
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'chat', message: 'New message from user A' },
    { id: 2, type: 'reminder', message: 'You have a meeting at 2 PM' },
    { id: 3, type: 'other', message: 'Reminder: Complete your tasks' },
  ]);
  const handleSignOut = () => {
    // Clear user data from local storage
    console.log("signed out")
    setMainUsername(null)
    localStorage.removeItem('userData');
    console.log(mainUsername)
    navigate('/signin ')
    // Perform any other sign-out actions as needed
  };
  // Use useEffect to run the function only once when the component is mounted
  useEffect(() => {
    const getUserDataFromLocalStorage = () => {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        // Use the parsedUserData as needed
        console.log(parsedUserData);
        // Set user data to state or context
        setMainUsername(parsedUserData);
      }
    };

    getUserDataFromLocalStorage(); // Call the function on mount or page reload
  }, []); // Empty dependency array ensures it runs only once

  
  return (
      <div>
        <div className="photo-main">
          <nav className="navbar-user_home">
            <div className="navbar-logo">Work House</div>
            <ul className="navbar-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li style={{ position: 'relative' }}>
                <Link to="/chat">
                  <IoChatbox className="nav-icons" />
                </Link>
                {isNewChats && <div className="new-notification-dot"></div>}
              </li>
              <div className="notification">
                <li style={{ position: 'relative' }}>
                  <IoNotifications
                    className="nav-icons"
                    onClick={toggleNotifications}
                  ></IoNotifications>
                  {isNewNotification && (
                    <div className="new-notification-dot"></div>
                  )}
                </li>
                {/* Toggle notification           */}
                {showNotifications && (
                  <div className="notification-panel">
                    <div className="notification-top">
                      <h3>Notifications</h3>
                      <HiDotsVertical className="threedots-notification" />
                    </div>
                    <div className="notification-list">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`nots ${notification.type}`}
                            onClick={() =>
                              handleNotificationClick(notification)
                            }
                          >
                            <h1>{notification.message}</h1>
                          </div>
                        ))
                      ) : (
                        <div className="onlythischat">
                          <h6>No more notifications</h6>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <li>
                  <button className="become-worker" onClick={()=>alreadyWorker ? navigate('/worker_home') : navigate('/bec_work_home')}>
                    {alreadyWorker ? 'Go to Worker' : 'Become a Worker'}
                  </button>
              </li>
              <li className="profile-link">
                <div className="profile-circle" onClick={toogleProfile}>

                  <img
                    alt="profile"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSofPxnJT4MLpeCDPJV85tCX7nivJRk22P5fGXq8oGX15Sy2ajQwnEV9vmckA&s"
                    className="profile-image"
                  />
{showProfile && (
  <div className="profile-panel">
    <div className="profile-panel-sections">

      <img
                    alt="profile"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSofPxnJT4MLpeCDPJV85tCX7nivJRk22P5fGXq8oGX15Sy2ajQwnEV9vmckA&s"
                    className="profile-image"
                    />
                    <p>Edit profile</p>
                    </div>
                    <div className="profile-panel-sections">

                    <p>Payments</p>
                    <p>Work History</p>
                    <p>Add a hiring</p>
</div>
<div className="profile-panel-sections">

                    <p>Settings</p>

    <button className='become-worker' onClick={handleSignOut}>SignOut</button>
    </div>
  </div>
  
)}
                </div>
              </li>
            </ul>
          </nav>
          <div className="search-content">
            <div className="quote">
              <p>
                Empower Your <span className="skill">Skill,</span>
                <br></br>
                Fulfill Your <span className="skill">Need.</span>
              </p>
            </div>
            <div className="search-set">
              <h1>{mainUsername?.gender}</h1>
              <input
                type="text"
                id="home-search"
                placeholder="Search your needs..."
              ></input>
              <FaSearch id="search-icon" />
            </div>
          </div>
        </div>
        <div>
          <h1>hire for work</h1>
        </div>
      </div>
    
  );
};

export default Home;

// Make sure to wrap your component with `BrowserRouter` and use `Routes` to define your routes. The `useNavigate` hook should work correctly within the body of the component. If you're still facing issues, ensure that you have the correct versions of React and `react-router-dom` installed.
