import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { Box, Button, TextField } from "@mui/material";
import Sheet from '@mui/joy/Sheet';

async function loginUser(credentials) {
 return fetch('http://localhost:3000/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
     'authorization': 'APIGestionLocation123'
   },
   
   body: JSON.stringify(credentials)
 })
   .then( data => (data.json()) /* data.json()*/ )
}


export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });

    setToken(token);
  }

  return(
    <div>
      <Header title="Logestion" subtitle="L'application qui vous permet de gérer vos biens immobilier."/>
      <Box    
        sx={{
 
          minWidth: 300,
        }}>
        <Sheet sx={{width: "20%",
          mx: 'auto', // margin left & right
          my: 10, // margin top & botom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',}}> 
          <Header subtitle="Se connecter" />
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onChange={e => setEmail(e.target.value)}
                name="email"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Mot de passe"
                onChange={e => setPassword(e.target.value)}
                name="password"
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="start" mt="20px">
              <Button type="submit" color="primary" variant="contained">
                Se connecter
              </Button>             
            </Box>
            <p class="register">Mot de passe oublié ? <a href="/resetpassword">Cliquez ici !</a></p> 
            <p class="register">Pas encore de compte ? <a href="/register">Inscrivez-vous ici !</a></p> 
          </form> 
        </Sheet>
      </Box>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};