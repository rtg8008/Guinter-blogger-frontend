import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './components/login';
import SignUp from './components/sign-up';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import Posts from './components/view-posts';
import ProfileProvider from './components/ProfileContext';
import Home from './components/home'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ProfileProvider>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/login" element={<Login />}/>
        <Route path = "/signup" element={<SignUp />}/>
        <Route path = "/posts" element={<Posts />}/>
      </Routes>
    </BrowserRouter>
  </ProfileProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
