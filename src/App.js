import React, { Component } from "react";
// import Navbar from "./Navbar"
// import Signup from "./Container/Signup";
import Signup from "./Components/Sign/Signup"
import Dashboard from "./Components/Dashboard/Dashboard"
import Map from "./Components/Map/Map"
import Userprofile from "./Components/Userprofile/Userprofile"
import {  Route, BrowserRouter } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
       
        
          <Route exact path="/" component={Signup} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/map" component={Map} />
          <Route exact path="/user" component={Userprofile} />

         
      
      </BrowserRouter>
    );
  }
}
export default App;
