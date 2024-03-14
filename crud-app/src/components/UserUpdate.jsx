import React, { useState } from "react";
import { Container, Typography, Grid, TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const UserUpdate =()=>{
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetch("https://www.melivecode.com/api/users/"+id)
      .then(res => res.json())
      .then(
        (result) => {
          setFname(result.user.fname)
          setLname(result.user.lname)
          setUsername(result.user.username)
          setEmail(result.user.email)
          setAvatar(result.user.avatar)
        }
      )
  }, [id])

  const handleSubmit = event => {
    event.preventDefault();
    var data = {
      'id': id,
      'fname': fname,
      'lname': lname,
      'username': username,
      'email': email,
      'avatar': avatar,
    }
    fetch('https://www.melivecode.com/api/users/update', {
      method: 'PUT',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (result) => {
        alert(result['message'])
        if (result['status'] === 'ok') {
          window.location.href = '/';
        }
      }
    )
  }
  return (
   <Container
      maxWidth="xs"
      sx={{
        marginTop: "8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography sx={{ p: 5 }} component="h1" variant="h5">
        Usuario:
      </Typography>
      <form onSubmit={handleSubmit} sx={{ width: "100%", marginTop: "3" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              variant="outlined"
              required
              label="Nombre"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              variant="outlined"
              required
              label="Apellido"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="username"
              variant="outlined"
              required
              label="Nombre de Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              fullWidth 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              variant="outlined"
              required
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              fullWidth 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="avatar"
              variant="outlined"
              required
              label="Avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              autoFocus
              fullWidth 
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="submit"
        >
          Actualizar Usuario
        </Button>
      </form>
    </Container>
);
}
