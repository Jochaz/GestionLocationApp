import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
  
    const tokenString = localStorage.getItem('token');
    
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const getUser = () => {
    return localStorage.getItem('user');
  }

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    localStorage.setItem('user', JSON.stringify(userToken));
    
    setToken(JSON.stringify(userToken.token));
    setUser(JSON.stringify(userToken.user));
  };

  const deleteToken = () => {
    localStorage.clear();
    window.location = "/";
  }
  
  return {
    setToken: saveToken,
    unsetToken: deleteToken,
    token,
    setUser,
    user
  }
}