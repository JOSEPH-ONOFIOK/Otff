import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // Import the external CSS
import TwitterLogo from './Vector.png'; // Import as an image
import TelegramLogo from './dis.png'; // Import as an image
import sign from './plus-sign.png'; // Import the plus sign image

const MyComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0); // Time remaining in seconds
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if the form has been submitted
  const formRef = useRef(null); // Reference for the form container

  const TIMER_DURATION = 48 * 60 * 60 * 1000; // 48 hours in milliseconds

  // Get start time from localStorage or set to current time if not set
  const getStartTime = () => {
    const storedStartTime = localStorage.getItem('startTime');
    if (storedStartTime) {
      return parseInt(storedStartTime, 10);
    } else {
      const currentTime = Date.now();
      localStorage.setItem('startTime', currentTime.toString());
      return currentTime;
    }
  };

  const startTime = getStartTime();

  // Calculate the remaining time
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timePassed = currentTime - startTime;
      const timeLeft = TIMER_DURATION - timePassed;

      if (timeLeft <= 0) {
        setIsTimeUp(true);
        setRemainingTime(0);
      } else {
        setRemainingTime(timeLeft);
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [startTime]);

  // Handle the form submission
  const handleSubmit = () => {
    if (!isSubmitted && !isTimeUp) {
      setIsSubmitted(true);
      setShowForm(false);
    }
  };

  // Format the countdown time
  const formatCountdown = () => {
    const hours = Math.floor(remainingTime / 1000 / 60 / 60);
    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    const seconds = Math.floor((remainingTime / 1000) % 60);

    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const handleJoinClick = () => {
    setShowForm(!showForm); // Toggle the form visibility
  };

  // Handle clicks outside the form to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="container">
      <div className="header">
        <div className="title">Scribbles</div>
        <div className="nav">
          <div className="nav-item">Home</div>
          <div className="nav-item" style={{ opacity: 0.5 }}>Media</div>
          <div className="nav-item" style={{ opacity: 0.5 }}>Staking</div>
        </div>
        <div className="social-icons">
          <div className="social-icon">
            <img src={TwitterLogo} alt="Twitter" />
          </div>
          <div className="social-icon">
            <img src={TelegramLogo} alt="Telegram" />
          </div>
        </div>
      </div>
      <div className="main-content-wrapper">
        <div className="subtitle">Scribbles where creativity meets fun</div>
        <div className="join-button" onClick={handleJoinClick}>
          <div className="join-text">Join the Verse</div>
        </div>
      </div>
      <div className="footer">Copyright 2025</div>

      {/* Form Container */}
      <div className={`form-container ${showForm ? 'show' : ''}`} ref={formRef}>
        <div className="form-heading">
          READY TO DISCOVER THE MYSTERY
          <br />
          ending in <span style={{ color: 'blue' }}>{formatCountdown()}</span>
        </div>
        <div className="form-body">
          {/* Row for buttons */}
          <div className="form-row">
            <a
              href="https://x.com/scribblenfts_s=21"
              className="form-button left-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>FOLLOW ON X</div>
            </a>
            <div className="plus-icon">
              <img src={sign} alt="plus" className="plus-sign" />
            </div>
            <button
              className="form-button rt-button"
              onClick={handleSubmit}
              disabled={isSubmitted || isTimeUp}
            >
              {isTimeUp ? "Time's Up" : isSubmitted ? 'Submitted' : 'RT'}
            </button>
          </div>

          {/* Wallet Address Input */}
          <input
            type="text"
            className="form-input"
            placeholder="Your wallet address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            disabled={isSubmitted || isTimeUp}
          />

          {/* Submit Button */}
          <div
            className="form-submit"
            onClick={handleSubmit}
            style={{ cursor: isSubmitted || isTimeUp ? 'not-allowed' : 'pointer' }}
          >
            {isTimeUp ? "Time's Up" : isSubmitted ? 'Submitted' : 'Submit'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
