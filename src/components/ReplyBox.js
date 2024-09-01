import React, { useState } from 'react';
import axios from 'axios';
import CustomTextEditor from './CustomTextEditor';
import '../App.css'; // Ensure that App.css does not conflict with component styles

const ReplyBox = ({ threadId }) => {
  const [reply, setReply] = useState('');
  const [subject, setSubject] = useState('');
  const [to, setTo] = useState(''); // Add state for recipient email

  const handleSend = async () => {
    if (!reply.trim() || !subject.trim()) {
      alert('Subject and Body cannot be empty.');
      return;
    }
  
    try {
      await axios.post(`http://localhost:3001/api/reply/${threadId}`, {
        from: 'your-email@example.com', // Replace with actual sender email
        to: 'recipient@example.com',    // Replace with actual recipient email
        subject: subject,
        body: reply,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      alert('Reply sent successfully!');
      setReply('');
      setSubject('');
    } catch (error) {
      console.error('Failed to send reply:', error);
      alert('Failed to send reply.');
    }
  };
  

  return (
    <div className="reply-box">
      <h4>Reply</h4>
      <input
        type="text"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="Recipient Email"
        className="reply-recipient"
      />
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
        className="reply-subject"
      />
      <CustomTextEditor 
        editorState={reply}
        setEditorState={setReply}
      />
      <button onClick={handleSend} className="send-reply-btn">Send</button>
    </div>
  );
};

export default ReplyBox;
