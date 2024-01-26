import React, { useState } from 'react'
import './Chat.scss';
import { CiSearch } from "react-icons/ci";
import { IoSend } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const Chat = () => {
  const sendMessage=()=>{
console.log("clicked the icon")
  }
  const chatList = [
    { id: 1, name: 'Chat Room 1', profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSofPxnJT4MLpeCDPJV85tCX7nivJRk22P5fGXq8oGX15Sy2ajQwnEV9vmckA&s' },
    { id: 2, name: 'Chat Room 2', profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSofPxnJT4MLpeCDPJV85tCX7nivJRk22P5fGXq8oGX15Sy2ajQwnEV9vmckA&s' },
    { id: 3, name: 'Chat Room 3', profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbIhi9l4npCGPNWMAc6szDbxp75kjB3c0R5w&usqp=CAU' },
    
  ];
  const [currentUser,setcurrentUser]=useState(chatList[1])
  console.log(currentUser)
  return (
    <div>
      
        <div className="large-section">
            <div className="left-list">
              <div style={{display:"flex", justifyContent:"space-between"}}>
<h1>Work House</h1>
<h1>Chats</h1>
              </div>
<div className="search-chat">
<CiSearch id='chat-icon-search'/>
<input type='text' className='search-chat-input'placeholder='Search for a Chat'></input>
</div>
<div className="chat-list">
            {chatList.map((chat) => (
              <div key={chat.id} className="chat-item" 
              onClick={()=>setcurrentUser(chat)}
              >
                <div className="profile-circle-left">
                  <img
                    src={chat.profileImage}
                    alt={`${chat.name} Profile`}
                    className="profile-image-chat"
                  />
                </div>
                <div className="chat-info">
                  <div className="chat-name">{chat.name}</div>
                  {/* Add additional information if needed */}
                </div>
              </div>
            ))}
          </div>

            </div>
            <div className="right-list">
<div className="top-contact">
<img
              alt='profile'
                src={currentUser.profileImage}
                className="profile-chat-contact"
                />
    <h2 style={{margin:"14px"}}>{currentUser.name}</h2>
</div>
<div className="chat-message-display">
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
<div className="chat-message-send">
  <div className="chat-message-text">
<MdOutlineEmojiEmotions id='icon-in-message'/>
    <input type='text' id='input-in-message' placeholder='Send some messages'></input>
  </div>
  <IoSend id='chat-send-icon' onClick={sendMessage}/>
</div>
            </div>
        </div>
        </div>
  )
}

export default Chat