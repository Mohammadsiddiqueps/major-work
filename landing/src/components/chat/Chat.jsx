import React, { useEffect, useRef, useState } from 'react';
import './Chat.scss';
import EmojiPicker from 'emoji-picker-react';
import { CiSearch } from "react-icons/ci";
import { IoSend } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import axios from 'axios';
import { useMainUsername } from '../../context/Authcontext';
import { io } from 'socket.io-client';

const Chat = () => {
  const [fetchedMessages, setFetchedMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [usernameResults, setUsernameResults] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [chatLister, setChatLister] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [message, setMessage] = useState('');
  const [lastDisplayedDate, setLastDisplayedDate] = useState('');
  const { mainUsername, setMainUsername } = useMainUsername();
  const [emojiOpen, setEmojiOpen] = useState(false);
  const socket = useRef(null);

  const ha = localStorage.getItem('userData');
  const userData = JSON.parse(ha);

  const sendMessage = async () => {
    if (!message) return;
  
    const today = new Date();
    const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
  
    try {
      await socket.current.emit("message-room", userData.email, message, currentUser.email, time, today);
      await fetchChatMessages(); // Wait for fetching messages to complete
    } catch (error) {
      console.error('Error sending message:', error);
    }
  
    // Reset message state after sending
    setMessage('');
    scrollToBottom();
  };
  
  const fetchChatMessages = () => {
    socket.current.on('room-messages', (messages) => {
      setFetchedMessages(messages);
    });

    socket.current.emit('get-messages', userData.email);
  };

  useEffect(() => {
    socket.current = io('http://localhost:5000');

    // Clean up socket on unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    console.log(userData.username);
    fetchChatList();
    fetchChatMessages();
    scrollToBottom();
    console.log(currentUser);
  }, [currentUser,fetchedMessages]); // Updated dependency

  const fetchChatList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get');
      setChatList(response.data);
      setChatLister(response.data.map((chat) => ({ id: chat._id, name: chat.username, email: chat.email })));
    } catch (error) {
      console.error('Error fetching chat list:', error);
    }
  };

  const handleSearch = async () => {
    try {
      console.log(searchQuery);
      if (searchQuery.trim() === '') {
        setChatLister(chatList.map((chat) => ({ id: chat._id, name: chat.username })));
      } else {
        const response = await axios.post('http://localhost:5000/searchchat', {
          username: searchQuery,
        });

        if (Array.isArray(response.data)) {
          setUsernameResults(response.data);
          setChatLister(
            response.data.map((chat) => ({ id: chat._id, name: chat.username, email: chat.email }))
          );
          console.log(response.data);
        } else {
          setUsernameResults([response.data]);
          console.log(response.data.name);
          setChatLister([
            { id: response.data._id, name: response.data.username, email: response.data.email },
          ]);
        }
      }
    } catch (error) {
      console.error('Error fetching username search results:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  // useEffect(() => {
    // if (fetchedMessages.length > 0) {
    //   const firstMessageDate = new Date(fetchedMessages[0].date).toLocaleDateString();
    //   const lastMessageDate = new Date(fetchedMessages[fetchedMessages.length - 1].date).toLocaleDateString();

    //   setLastDisplayedDate(firstMessageDate);

    //   if (lastDisplayedDate !== lastMessageDate) {
    //     scrollToBottom();
    //   }
    // }
  // }, [fetchedMessages, lastDisplayedDate]);

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
  socket.current.on('room-messages', (messages) => {
    console.log('Received new messages:', messages);
    setFetchedMessages((prevMessages) => [...prevMessages, ...messages]);
    scrollToBottom(); // Scroll to bottom when new messages are received
  });

  // Fetch initial messages when component mounts
  fetchChatMessages();
}, []);

  return (
    <div>
      <style>
        {currentUser &&
          `
          @media (max-width: 768px) {
            .right-list {
              display: block;
              width: 100%;
            }
            .left-list {
              display: none;
            }
          }
        `}
      </style>
      <div className="large-section">
        <div className="left-list">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Work House</h1>
            <h1>{userData?.username}</h1>
          </div>
          <div className="search-chat">
            <CiSearch id="chat-icon-search" onClick={handleSearch} />
            <input
              type="text"
              className="search-chat-input"
              placeholder="Search for a Chat"
              onChange={(e) => setSearchQuery(e.target.value)}
            ></input>
          </div>
          <div className="chat-list">
          {chatLister.map((chat) => (
  // Check if chat email exists in fetchedMessages
  userData.email !== chat.email  && (
    <div
      key={chat.id}
      className="chat-item"
      onClick={() => setCurrentUser(chat)}
    >
      <div className="profile-circle-left">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSofPxnJT4MLpeCDPJV85tCX7nivJRk22P5fGXq8oGX15Sy2ajQwnEV9vmckA&s"
          alt={`${chat.name} Profile`}
          className="profile-image-chat"
        />
      </div>
      <div className="chat-info">
        <div className="chat-name">{chat.name}</div>
      </div>
    </div>
  )
))}


          </div>
          <div className="onlythischat">
            <h6>No more chats</h6>
          </div>
        </div>
        <div className="right-list" style={{ backgroundRepeat:'no-repeat',backgroundPosition:'center', backgroundImage: currentUser === '' ? 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFw-_-q0OyGIQipESgDKUP4aZsqETFhcyCGQlRBOLMfZYkRAHLduyZLTYirRZpV7Vcg90&usqp=CAU)' : 'none' }}>

          <div className="top-contact" style={currentUser === '' ? { display: 'none' } : {}}>
            <img
              onClick={() => setCurrentUser('')}
              alt="profile"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSofPxnJT4MLpeCDPJV85tCX7nivJRk22P5fGXq8oGX15Sy2ajQwnEV9vmckA&s"
              className="profile-chat-contact"
            />
            <h2 style={{ margin: '14px' }}>{currentUser.email}</h2>
          </div>
          <div className="chat-message-display"  style={currentUser === '' ? { display: 'none' } : {}} ref={chatContainerRef}>
          {fetchedMessages.map((message) => (
  <div key={message._id}>
    {(currentUser.email === message.sender || currentUser.email === message.receiver) && (
      <div>
        {lastDisplayedDate !== new Date(message.date).toLocaleDateString() && (
          <div className="chat-date-display">
            <h6>{new Date(message.date).toLocaleDateString()}</h6>
          </div>
        )}
      </div>
    )}

    {message.sender === currentUser.email ? (
      // Display receive messages
      <div className="chat-message-recieve">
        <img
          alt='profile'
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbIhi9l4npCGPNWMAc6szDbxp75kjB3c0R5w&s'
          className="profile-chat-message-recieve"
        />
        <div className="chat-message-box-recieve">
          {message.content}<p className='message-time'>{message.time}</p>
        </div>
      </div>
    ) : message.receiver === currentUser.email ? (
      // Display sent messages
      <div className="just">
        <div className="chat-message-box-send">
          {message.content}<p className='message-time'>{message.time}</p>
        </div>
      </div>
    ) : null}
  </div>
))}
          </div>
<div>

              {emojiOpen && (
              <EmojiPicker style={{ zIndex: 1000, position: 'absolute', bottom: '60px', right: '40%' }}
              onEmojiClick={
                (emoji) => {
                  setMessage((prevMessage) => prevMessage + emoji.emoji);
                  console.log(emoji);
                  setEmojiOpen(!emojiOpen);
                }}/>
              )}
                </div>
          <div className="chat-message-send" style={currentUser === '' ? { display: 'none' } : {}}>
            <div className="chat-message-text">
            <MdOutlineEmojiEmotions
            id="icon-in-message"
            onClick={() => {
              setEmojiOpen(!emojiOpen);
              console.log(emojiOpen);
            }}
          />
              <input
  type="text"
  id="input-in-message"
  placeholder="Send some messages"
  value={message}  // Add this line to bind the input value to the message state
  onChange={(e) => setMessage(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default behavior (e.g., newline character)
      sendMessage(); // Call the sendMessage function
    }
  }}
/>
</div>
<IoSend id="chat-send-icon" onClick={sendMessage} />


          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
