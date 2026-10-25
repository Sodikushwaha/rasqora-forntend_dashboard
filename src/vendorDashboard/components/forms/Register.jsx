import React, { useState } from "react";
import {API_URL} from '../../data/ApiPath';

export const Register = ({showLoginHandler}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading , setLoading] = useState(true);

  const handleSubmit = async(e) =>{
    e.preventDefault ();
   try{
const response = await fetch (`${API_URL}/vendors/register`,
  {
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({username , email , password})
  })
  const data = await response.json()
  if(response.ok){
    console.log(data);
    setUsername("");
    setEmail("");
    setPassword("");
    alert("Vendor Register success ")
    showLoginHandler();
  }
   }catch(error){
    console.error("Registration failed!" , error)
    alert("Registration Failed");

   }

  }

  return (
    <div className="registerSection">
      <form className="authForm" onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>
        <label>Name</label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}  placeholder="Enter your name" />
        <br />
        <label>Email</label>
        <input type="text" name="email"value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
        <br />
        <label>Password</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
        <br />
        <div className="btnSubmit">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};
