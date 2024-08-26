import React, { useState } from 'react'
import './LoginSignUp.css'


import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'


const LoginSignUp = () => {
 
  return (
    <div className='container'>
        <div className="header">
            <div className="text">Login</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            <div className="input">
                <img src={email_icon} alt="" />
                <input type="Email"placeholder='Email' />
            </div>
            <div className="input">
                <img src={password_icon} alt="" />
                <input type="Password" placeholder='Password'/>
            </div>
        </div>
        <div className="submitContainer">
  
            <div className="submit">Login</div>
        </div>
      </div>
  )
}

export default LoginSignUp;
