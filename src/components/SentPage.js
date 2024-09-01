import React from 'react';

const SentPage = ({ sentEmails }) => {
  return (
    <div className="sentpage">
      <h2>Sent Emails</h2>
      <ul>
        {sentEmails.map((email, index) => (
          <li key={index} className="sent-email-item">
            <strong>To:</strong> {email.to}<br />
            <strong>Subject:</strong> {email.subject}<br />
            <strong>Body:</strong> <div dangerouslySetInnerHTML={{ __html: email.body }} /><br />
            <small><strong>Sent at:</strong> {new Date(email.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SentPage;
