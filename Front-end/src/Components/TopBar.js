import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';

import { Button } from '@mui/material';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';








export default function TopBar() {
    const navigate=useNavigate();


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  sx={{backgroundColor:"grey"}} position="sticky" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton  onClick={()=>{navigate("/")}} >
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, color:"white", display: { xs: 'none', sm: 'block' } }}
                >
                Elliot-AI
            </Typography>
           </IconButton>
          <Button  onClick={()=>navigate("/create")}
                sx={{ color: "white", marginX:"10px",position:"absolute",right:"0px"}}
                width="20%"
                startIcon={<AddCircleOutline />}
            >
                Create
            </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

