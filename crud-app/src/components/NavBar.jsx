import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const NavBar=()=> {
    return (
      <div>
      <AppBar position="static">
        <Toolbar>
            <Typography variant="h6">
              Aplicación CRUD con API externa
            </Typography>
        </Toolbar>
      </AppBar>
    </div>
    );
  }

  