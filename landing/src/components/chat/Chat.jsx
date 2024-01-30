import React, { useEffect, useState } from 'react'
import './Chat.scss';
import { CiSearch } from "react-icons/ci";
import { IoSend } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import axios from 'axios';
import { useMainUsername } from '../../context/Authcontext';

const Chat = () => {
  const [searchQuery,setSearchQuery]=useState('')
  const [usernameResults, setUsernameResults] = useState([]);
  const [currentUser,setcurrentUser]=useState('')
  const [chatLister, setChatLister] = useState([]);
  const [chatList,setChatList]= useState([])
const [message,setMessage] = useState('')
const { mainUsername,setMainUsername } = useMainUsername();

const sendMessage=(e)=>{
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    console.log(currentUser,message,time)
    document.getElementById('input-in-message').value = '';
    // const roomId = currentUser;
    // socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");  }
  useEffect(() => {
    // Fetch chat list when component mounts
   
    fetchChatList();
  }, []);



  
   


  const fetchChatList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get');
      setChatList(response.data);
      setChatLister(response.data.map((chat) => ({ id: chat._id, name: chat.username })));

    } catch (error) {
      console.error('Error fetching chat list:', error);
    }
  };
//    chatLister =chatList.map((chat)=> ({
//      id: chat._id, name: chat.username}
// ));
 
  // console.log(searchQuery)
  const handleSearch = async () => {
    try {
      console.log(searchQuery);
  
      // Check if the input is blank
      if (searchQuery.trim() ==='') {
        // If input is blank or contains only whitespace, reset chatLister to its original state
        setChatLister(chatList.map((chat) => ({ id: chat._id, name: chat.username })));
      }
      else {
        // Make the API request
        const response = await axios.post('http://localhost:5000/searchchat', {
          username: searchQuery
        });
  
        // Log the raw response from the API
        console.log(response.data);
  
        // Check if the response data is an array
        if (Array.isArray(response.data)) {
          // Update the state with the API response
          setUsernameResults(response.data);
  
          // Update the ChatLister state based on the new data
          setChatLister(
            response.data.map((chat) => ({ id: chat._id, name: chat.username }))
          );
        } else {
          // If it's a single object, create an array with that object
          setUsernameResults([response.data]);
  
          // Update the ChatLister state with a single-item array
          setChatLister([
            { id: response.data._id, name: response.data.username }
          ]);
        }
      }
    } catch (error) {
      console.error('Error fetching username search results:', error);
    }
  };
 
  useEffect(() => {
    // Call handleSearch when searchQuery changes
    handleSearch();
  }, [searchQuery]);

  
  return (
    <div>
      
 <style>
        {currentUser && `
          @media (max-width: 768px) {
            .right-list {
              display: block;
              width:100%
            }
               .left-list {
                display: none;

            }
          }
        `}
      </style>
        <div className="large-section">
            <div className="left-list">
              <div style={{display:"flex", justifyContent:"space-between"}}>
<h1>Work House</h1>
<h1>{mainUsername.username}</h1>
              </div>
<div className="search-chat">
<CiSearch id='chat-icon-search' onClick={handleSearch}/>
<input type='text' className='search-chat-input'placeholder='Search for a Chat'
    onChange={(e) =>{setSearchQuery(e.target.value) ;}}
    ></input>
</div>
<div className="chat-list">
  
            {chatLister.map((chat) => (
              <div key={chat.id} className="chat-item" 
              onClick={() => setcurrentUser(chat.name)}
              >
                <div className="profile-circle-left">
                  <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSofPxnJT4MLpeCDPJV85tCX7nivJRk22P5fGXq8oGX15Sy2ajQwnEV9vmckA&s' 
                    alt={`${chat.name} Profile`}
                    className="profile-image-chat"
                  />
                </div>
                <div className="chat-info">
                  <div className="chat-name">{chat.name}</div>
                </div>
              </div>
            ))}

          </div>
<div className="onlythischat">
<h6>No more chats</h6>
</div>
            </div>
            <div className="right-list" style={{ backgroundRepeat:'no-repeat',backgroundPosition:'center', backgroundImage: currentUser === '' ? 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFw-_-q0OyGIQipESgDKUP4aZsqETFhcyCGQlRBOLMfZYkRAHLduyZLTYirRZpV7Vcg90&usqp=CAU)' : 'none' }}>

              <div className="top-contact" style={currentUser === '' ? { display: 'none' } : {}}>
<img
onClick={()=>setcurrentUser('')}
              alt='profile'
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSofPxnJT4MLpeCDPJV85tCX7nivJRk22P5fGXq8oGX15Sy2ajQwnEV9vmckA&s' 
                className="profile-chat-contact"
                />
    <h2 style={{margin:"14px"}}>{currentUser}</h2>
</div>
<div className="chat-message-display" style={currentUser === '' ? { display: 'none' } : {}}>
  <div className="chat-date-display">
    <h6>10/10/2023</h6>
    <h6>Thursday</h6>
  </div>
  <div className="chat-message-recieve">
  <img
              alt='profile'
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSofPxnJT4MLpeCDPJV85tCX7nivJRk22P5fGXq8oGX15Sy2ajQwnEV9vmckA&s"
                className="profile-chat-message-recieve"
                />
                <div className="chat-message-box-recieve">
                  hi, it's the first message 
                </div>
  </div>
                <div className="chat-message-box-send">
                  hi, it's the first message 
                </div>
</div>
<div className="chat-message-send" style={currentUser === '' ? { display: 'none' } : {}}>
  <div className="chat-message-text">
<MdOutlineEmojiEmotions id='icon-in-message'/>
    <input type='text' id='input-in-message' placeholder='Send some messages' onChange={(e) => setMessage(e.target.value)}></input>
  </div>
  <IoSend id='chat-send-icon' onClick={sendMessage}/>
</div>
            </div>
        </div>
        </div>
  )
}

export default Chat