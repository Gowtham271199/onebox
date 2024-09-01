import React from 'react';
import '../App.css'; // Ensure you import the CSS file

const TrashPage = ({ trashedThreads, restoreThread }) => {
  return (
    <div className="trash">
      <header className="trash-header">
        <h1>Trash</h1>
      </header>
      <ul className="trash-list">
        {trashedThreads.length > 0 ? (
          trashedThreads.map((thread) => (
            <li key={thread.id} className="trash-item">
              <h3>{thread.subject}</h3>
              <p>From: {thread.fromName} ({thread.fromEmail})</p>
              <p>To: {thread.toEmail}</p>
              <p>Sent At: {new Date(thread.sentAt).toLocaleString()}</p>
              <div className="thread-body">{thread.body}</div>
              <button onClick={() => restoreThread(thread.id)}>Restore</button>
            </li>
          ))
        ) : (
          <p>No threads in trash</p>
        )}
      </ul>
    </div>
  );
};

export default TrashPage;
