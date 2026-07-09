import React from 'react';
import './NewPage.css'; // Import the CSS
import { someFunction } from './newLogic.js';

function NewPage() {
  someFunction();
  return (
    <div>
      <h1>Welcome to the New Page</h1>
      <p>Background logic handled through JS</p>
    </div>
  );
}

export default NewPage;