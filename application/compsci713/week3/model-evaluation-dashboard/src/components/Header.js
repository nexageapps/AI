import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="uoa-branding">
          <div className="uoa-logo">
            <svg viewBox="0 0 100 100" width="50" height="50">
              <circle cx="50" cy="50" r="45" fill="#00467F" />
              <text x="50" y="60" fontSize="40" fill="white" textAnchor="middle" fontWeight="bold">U</text>
            </svg>
          </div>
          <div className="course-info">
            <h1>Model Evaluation Dashboard</h1>
            <p className="course-code">COMPSCI 713 - Week 3 | Basic Lesson 7</p>
          </div>
        </div>
        <div className="header-description">
          <p>Interactive exploration of model evaluation metrics and performance analysis</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
