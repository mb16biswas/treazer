import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import "./Navbar.css"
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          
          <Link to = "/dashboard">
            <h3>Dashboard</h3>
          </Link>
          <Link to = "/map">
            <h3>Map</h3>
          </Link>
          <Link to = "/user">
            <h3>Account</h3>
          </Link>
          <Link  onClick = {() => {localStorage.removeItem("mydata")}} to = "/">
            <h3  >logout</h3>
          </Link>
     
           




         
         
     
        </Toolbar>
      </AppBar>
    </div>
  );
}