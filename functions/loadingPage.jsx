"use client";
import React from 'react';
import './loadingPage.css';

function LoadingPage() {
  return (
    <div className="loading-screen">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
}

export default LoadingPage;

// Usage in AppContent:
