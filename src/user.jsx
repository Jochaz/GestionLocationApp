import { useState } from 'react';

export const useUser = (token) => {
    const [user, setUser] = useState();

    fetch("http://localhost:4001/users?id=" + token, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'APIGestionLocation123'
        }}).then((response) => {
      response.json().then((data) => {
        setUser(data.doc);
      })
    })

    if(user) return user;
}
