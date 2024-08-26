import React, { useState } from 'react'
import './LoginSignUp.css'


import person_icon from '../Assets/person.png'
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
                <img src={person_icon} alt="" />
                <input type="text"placeholder='Username' />
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
