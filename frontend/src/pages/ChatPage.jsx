import React, { useState, useEffect, useRef } from 'react';

const ChatPage = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Mock conversations data
  useEffect(() => {
    const mockConversations = [
      {
        id: 1,
        user: {
          id: 'user1',
          name: 'Local Guide',
          avatar: 'https://via.placeholder.com/50x50',
          status: 'online'
        },
        lastMessage: 'Looking forward to showing you around!',
        timestamp: '10:30 AM',
        unread: 2
      },
      {
        id: 2,
        user: {
          id: 'user2',
          name: 'Sri Lanka Crafts',
          avatar: 'https://via.placeholder.com/50x50',
          status: 'offline'
        },
        lastMessage: 'Your custom order is ready',
        timestamp: 'Yesterday',
        unread: 0
      },
      {
        id: 3,
        user: {
          id: 'user3',
          name: 'Heritage Tours',
          avatar: 'https://via.placeholder.com/50x50',
          status: 'online'
        },
        lastMessage: 'Can we reschedule?',
        timestamp: 'Jan 12',
        unread: 1
      }
    ];
    
    setConversations(mockConversations);
    
    // Set first conversation as active by default
    if (mockConversations.length > 0) {
      setActiveConversation(mockConversations[0]);
    }
  }, []);

  // Mock messages for active conversation
  useEffect(() => {
    if (activeConversation) {
      const mockMessages = [
        {
          id: 1,
          sender: 'other',
          content: 'Hi there! I heard you are interested in our cultural tour package.',
          timestamp: '10:15 AM'
        },
        {
          id: 2,
          sender: 'me',
          content: 'Yes, I would love to learn more about it. What does the tour include?',
          timestamp: '10:17 AM'
        },
        {
          id: 3,
          sender: 'other',
          content: 'Great! The tour includes visits to ancient temples, traditional craft demonstrations, and authentic local cuisine tasting.',
          timestamp: '10:20 AM'
        },
        {
          id: 4,
          sender: 'me',
          content: 'That sounds perfect! Is transportation included?',
          timestamp: '10:22 AM'
        },
        {
          id: 5,
          sender: 'other',
          content: 'Transportation is available as an add-on service for an additional fee.',
          timestamp: '10:25 AM'
        }
      ];
      
      setMessages(mockMessages);
    }
  }, [activeConversation]);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    const message = {
      id: messages.length + 1,
      sender: 'me',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="chat-page-container">
      <div className="container">
        <h1>Messages</h1>
        <p>Connect with locals, service providers, and fellow travelers</p>
        
        <div className="chat-layout">
          <div className="conversations-panel">
            <div className="search-conversations">
              <input type="text" placeholder="Search conversations..." />
            </div>
            
            <div className="conversations-list">
              {conversations.map(conversation => (
                <div 
                  key={conversation.id}
                  className={`conversation-item ${activeConversation?.id === conversation.id ? 'active' : ''}`}
                  onClick={() => setActiveConversation(conversation)}
                >
                  <div className="conversation-user">
                    <img src={conversation.user.avatar} alt={conversation.user.name} />
                    <div className="user-status">
                      <span className={`status-indicator ${conversation.user.status}`}></span>
                    </div>
                  </div>
                  
                  <div className="conversation-info">
                    <h4>{conversation.user.name}</h4>
                    <p>{conversation.lastMessage}</p>
                  </div>
                  
                  <div className="conversation-meta">
                    <span className="timestamp">{conversation.timestamp}</span>
                    {conversation.unread > 0 && (
                      <span className="unread-count">{conversation.unread}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="chat-area">
            {activeConversation ? (
              <>
                <div className="chat-header">
                  <div className="chat-user-info">
                    <img src={activeConversation.user.avatar} alt={activeConversation.user.name} />
                    <div>
                      <h3>{activeConversation.user.name}</h3>
                      <span className={`status ${activeConversation.user.status}`}>
                        {activeConversation.user.status === 'online' ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="chat-actions">
                    <button className="btn-icon">
                      <i className="icon-call"></i>
                    </button>
                    <button className="btn-icon">
                      <i className="icon-video"></i>
                    </button>
                    <button className="btn-icon">
                      <i className="icon-more"></i>
                    </button>
                  </div>
                </div>
                
                <div className="chat-messages">
                  {messages.map(message => (
                    <div 
                      key={message.id} 
                      className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
                    >
                      <div className="message-content">
                        <p>{message.content}</p>
                        <span className="message-time">{message.timestamp}</span>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                
                <form className="chat-input-form" onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                  />
                  <button type="submit" className="btn btn-primary">
                    Send
                  </button>
                </form>
              </>
            ) : (
              <div className="empty-chat-state">
                <h3>Select a conversation</h3>
                <p>Choose a conversation from the list to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;