import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../UserContext';

function Index() {
  const {setUserInfo, userInfo} = useContext(UserContext);

  const username = userInfo?.username;

  useEffect(() => {
    fetch('http://localhost:4000/profile',{
      credentials: 'include'
    }).then(res => res.json()).then(data => setUserInfo(data.username)
      )
  },[]);

  function logout(){
    fetch('http://localhost:4000/logout',{
      credentials: 'include',
      method: "POST",
    }).then(res => res.json()).then(data => setUserInfo(null)
    )
  }
  return (
    <header>
      <Link to="/" className="logo">Welcome to my blog</Link>
      <nav>
        {username && (<>
        <span>Hi, {userInfo.username}</span>
          <Link to="/create">Create new post</Link>
          <a onClick={logout}>Logout</a>
        </>)}
        {!username && (<>
          <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        </>)
        }
       
      </nav>
    </header>
  )
}

export default Index