import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ReplyBox from './components/ReplyBox';
import SentPage from './components/SentPage';
import TrashPage from './components/TrashPage';
import LoginPage from './components/LoginPage';
import OneboxScreen from './components/OneboxScreen';
import SpamPage from './components/SpamPage'; // Import SpamPage
import DraftsPage from './components/DraftsPage'; // Import DraftsPage
import ThemeProvider, { useTheme } from './components/ThemeProvider';
import './App.css';

const AppContent = ({ handleSendEmail, sentEmails, trashedThreads, handleRestoreThread }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`app-container ${theme}`}>
      <Sidebar />
      <div className="main-content">
        <button onClick={toggleTheme} className="theme-toggle-btn">
          Toggle Theme
        </button>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/google-login" element={<OneboxScreen />} />
          <Route 
            path="/sent" 
            element={<SentPage sentEmails={sentEmails} />} 
          />
          <Route 
            path="/reply/:threadId" 
            element={<ReplyBox onSendEmail={handleSendEmail} />} 
          />
          <Route 
            path="/trash" 
            element={<TrashPage trashedThreads={trashedThreads} restoreThread={handleRestoreThread} />} 
          />
          <Route 
            path="/spam" 
            element={<SpamPage />} 
          />
          <Route 
            path="/drafts" 
            element={<DraftsPage />} 
          />
          {/* Add other routes here */}
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  const [sentEmails, setSentEmails] = useState([]);
  const [trashedThreads, setTrashedThreads] = useState([]);

  const handleSendEmail = (email) => {
    setSentEmails([...sentEmails, email]);
  };

  const handleRestoreThread = (threadId) => {
    const threadToRestore = trashedThreads.find(thread => thread.id === threadId);
    setSentEmails([...sentEmails, threadToRestore]);
    setTrashedThreads(trashedThreads.filter(thread => thread.id !== threadId));
  };

  return (
    <ThemeProvider>
      <Router>
        <AppContent 
          handleSendEmail={handleSendEmail} 
          sentEmails={sentEmails} 
          trashedThreads={trashedThreads} 
          handleRestoreThread={handleRestoreThread} 
        />
      </Router>
    </ThemeProvider>
  );
};

export default App;
