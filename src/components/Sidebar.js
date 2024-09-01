import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Ensure styles are in App.css

const categories = [
  { name: 'Home', icon: 'fas fa-home', path: '/' },
  { name: 'Sent', icon: 'fas fa-paper-plane', path: '/sent' },
  { name: 'Drafts', icon: 'fas fa-file-alt', path: '/drafts' },
  { name: 'Spam', icon: 'fas fa-exclamation-triangle', path: '/spam' },
  { name: 'Trash', icon: 'fas fa-trash', path: '/trash' },
];

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <button
        className={`sidebar-toggle-btn ${isVisible ? 'hidden' : 'visible'}`}
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars"></i> {/* Hamburger icon */}
      </button>
      <div className={`sidebar ${isVisible ? 'visible' : 'hidden'}`}>
        {/* <h3>Categories</h3> */}
        <ul>
          {categories.map((category, index) => (
            <li key={index} className="sidebar-item">
              <Link to={category.path}>
                <i className={category.icon}></i> {/* Font Awesome icon */}
                <span>{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
