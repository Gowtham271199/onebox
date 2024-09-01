import React, { useEffect, useState, useCallback } from 'react';
import ReplyBox from './ReplyBox';
import { useTheme } from './ThemeProvider';
import '../App.css';
import TrashPage from './TrashPage'; // Import TrashPage component

const OneboxScreen = () => {
  const [threads, setThreads] = useState([]);
  const [trashedThreads, setTrashedThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  // Dummy/mock data
  const mockData = [
    
      {
        id: 1,
        fromName: 'Shaw Adley',
        fromEmail: 'shaw@getmemeetings.com',
        toName: '',
        toEmail: 'mitrajit2022@gmail.com',
        subject: 'Shaw - following up on our meeting last week... | 7ZG2ZTV 6KG634E',
        body: 'Hi Mitrajit, Just wondering if you’re still interested. Regards, Shaw Adley',
        sentAt: '2023-11-23T04:08:45.000Z',
      },
      {
        id: 2,
        fromName: 'Shaw Adley',
        fromEmail: 'shaw@getmemeetings.com',
        toName: '',
        toEmail: 'mitrajit2022@gmail.com',
        subject: 'Test mail',
        body: 'Test mail',
        sentAt: '2023-11-23T04:08:45.000Z',
      },
      {
        id: 3,
        fromName: 'John Doe',
        fromEmail: 'john@example.com',
        toName: 'Alice Smith',
        toEmail: 'alice@example.com',
        subject: 'Meeting Reminder',
        body: 'Hi Alice, Just a reminder about our meeting tomorrow at 10 AM.',
        sentAt: '2023-11-22T14:30:00.000Z',
      },
      {
        id: 4,
        fromName: 'Jane Smith',
        fromEmail: 'jane@example.com',
        toName: 'Bob Johnson',
        toEmail: 'bob@example.com',
        subject: 'Project Update',
        body: 'Hi Bob, The project is progressing well. We expect to complete it by the end of this week.',
        sentAt: '2023-11-22T09:15:00.000Z',
      },
      {
        id: 5,
        fromName: 'Marketing Team',
        fromEmail: 'marketing@example.com',
        toName: '',
        toEmail: 'customer@example.com',
        subject: 'New Product Launch',
        body: 'Dear Customer, We are excited to announce the launch of our new product. Check it out on our website!',
        sentAt: '2023-11-21T11:45:00.000Z',
      },
      {
        id: 6,
        fromName: 'Support',
        fromEmail: 'support@example.com',
        toName: 'User',
        toEmail: 'user@example.com',
        subject: 'Your Support Ticket Has Been Resolved',
        body: 'Hi User, We are happy to inform you that your support ticket has been resolved. Thank you for your patience.',
        sentAt: '2023-11-20T08:00:00.000Z',
      },
      {
        id: 7,
        fromName: 'Emma Watson',
        fromEmail: 'emma@example.com',
        toName: 'Tom Hardy',
        toEmail: 'tom@example.com',
        subject: 'Event Invitation',
        body: 'Hi Tom, You are invited to our annual event next Friday. Hope to see you there!',
        sentAt: '2023-11-19T07:30:00.000Z',
      },
      {
        id: 8,
        fromName: 'HR Department',
        fromEmail: 'hr@example.com',
        toName: 'All Employees',
        toEmail: 'all@example.com',
        subject: 'Policy Update',
        body: 'Dear All, Please review the attached document for the latest updates to our company policies.',
        sentAt: '2023-11-18T10:00:00.000Z',
      },
      {
        id: 9,
        fromName: 'Finance Team',
        fromEmail: 'finance@example.com',
        toName: '',
        toEmail: 'accounts@example.com',
        subject: 'Invoice Payment Due',
        body: 'Dear Accounts, Please be advised that invoice #12345 is due for payment by the end of this week.',
        sentAt: '2023-11-17T12:00:00.000Z',
      },
      {
        id: 10,
        fromName: 'Jane Doe',
        fromEmail: 'jane@example.com',
        toName: 'John Smith',
        toEmail: 'john@example.com',
        subject: 'Weekend Plans',
        body: 'Hi John, Are we still on for the hiking trip this weekend?',
        sentAt: '2023-11-16T16:45:00.000Z',
      },
  ];

  // Set threads directly from mock data
  useEffect(() => {
    setThreads(mockData);
  }, []);

  // Handle thread selection
  const selectThread = (thread) => {
    setSelectedThread(thread);
  };

  // Handle Delete (Move to Trash)
  const handleDelete = (threadId) => {
    const threadToDelete = threads.find(thread => thread.id === threadId);
    setTrashedThreads([...trashedThreads, threadToDelete]);
    setThreads(threads.filter(thread => thread.id !== threadId));
    if (selectedThread && selectedThread.id === threadId) {
      setSelectedThread(null);
    }
  };

  // Handle Keyboard Shortcuts
  const handleKeyDown = useCallback((e) => {
    if (selectedThread) {
      if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        handleDelete(selectedThread.id);  // Move to Trash
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        const replyBox = document.getElementById(`reply-box-${selectedThread.id}`);
        if (replyBox) {
          replyBox.scrollIntoView({ behavior: 'smooth' });  // Scroll to the reply box
        }
      }
    }
  }, [selectedThread, threads, trashedThreads]);

  // Add and remove event listeners for keyboard shortcuts
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={`onebox-container ${theme}`}>
      <header className="onebox-header">
        <h1>Onebox Threads</h1>
        <a href="/trash" className="trash-link">Trash</a>
      </header>
      {error && <p className="error">{error}</p>}
      <ul className="thread-list">
        {threads.length > 0 ? (
          threads.map((thread) => (
            <li 
              key={thread.id} 
              onClick={() => selectThread(thread)}
              className={`thread-item ${selectedThread && selectedThread.id === thread.id ? 'selected' : ''}`}
              tabIndex={0} // Make it focusable
            >
              <h3>{thread.subject}</h3>
              <p>From: {thread.fromName} ({thread.fromEmail})</p>
              <p>To: {thread.toEmail}</p>
              <p>Sent At: {new Date(thread.sentAt).toLocaleString()}</p>
              <div className="thread-body">{thread.body}</div>

              {selectedThread && selectedThread.id === thread.id && (
                <ReplyBox threadId={thread.id} />
              )}
            </li>
          ))
        ) : (
          <p>No threads available</p>
        )}
      </ul>
    </div>
  );
};

export default OneboxScreen;
