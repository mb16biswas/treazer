import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar"

class Map extends Component {
  constructor() {
    super();
    let a = "";
    let data = localStorage.getItem("mydata");
    data = JSON.parse(data);


    if (data !== null) {
      a = "admin";
    }

    this.state = {
      status: a,
    };
   
  }
  

  render() {
   

    if(this.state.status === "admin"){
      return (
        <div> 
              <Navbar/>
              <h2 >map </h2>



                
        </div>

      
    );

    }
    else{
      return <Redirect to="/" />;
    }
    
  }
}
export default  Map ;