import React, { useState } from 'react'
import './LoginSignUp.css'

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'


const LoginSignUp = () => {
    const [action,setAction] = useState("Login");
  return (
    <div className='container'>
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            {action==="Login"?<div></div>: <div className="input">
                <img src={user_icon} alt="" />
                <input type="text" placeholder='Username' />
            </div>}

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
            <div className={action === "Login"?"submit gray":"submit"}onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
            <div className={action === "Sign Up"?"submit gray":"submit"}onClick={()=>{setAction("Login")}}>Login</div>
        </div>
      </div>
  )
}

export default LoginSignUp;
