import React from 'react';
import './HomePage.css';

const HomePage = ({ onNewNoteClick }) => {
  return (
    <div className="home-container">
      <h1>Welcome to the Note-Taking App</h1>
      <p>Click the button below to start taking notes.</p>
      <button className="start-button" onClick={onNewNoteClick}>
        Start Note-Taking
      </button>
    </div>
  );
};

export default HomePage;
