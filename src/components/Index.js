import { useNavigate } from 'react-router-dom';
import React from 'react'

export default function Index() {
  const navigate = useNavigate();
  
  return (
    <div>
      <button onClick={()=>{navigate('/login')}} style={{background: "white", width: "300px"}}>Login</button>
      <button onClick={()=>{navigate('/register')}} style={{background: "white", width: "300px"}}>Register</button>
    </div>
  )
}
