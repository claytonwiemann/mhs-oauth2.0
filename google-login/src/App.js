import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './App.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);
    // Sending the token to the backend
    fetch('http://localhost:5000/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: response.credential }),
    })
      .then((res) => res.json())          
      .then((data) => {                   // Data sent to the backend, remove this when done testing
        console.log('User data:', data);
      })
      .catch((error) => {
        console.error('Error during authentication:', error);
      });
  };

  const handleLoginFailure = (error) => {
    console.log('Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <div className="login-container">
          <img src={`${process.env.PUBLIC_URL}/images/mission-hydrosci-logo.png`} alt="Mission HydroSci Logo" className="logo" />
          <h1>Mission HydroSci</h1>
          <h2>Welcome</h2>
          <p>Please sign in with Google to continue</p>
          <div id="signInDiv">
            <GoogleLogin
              onSuccess={handleLoginSuccess}      // Callback function 
              onError={handleLoginFailure}        // Callback function
              text="signin_with"
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
