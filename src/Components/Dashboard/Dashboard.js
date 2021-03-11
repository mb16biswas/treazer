import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar"

class Dashboard extends Component {
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
      test : 0 , 
      
    };
  }
  

  render() {

    if(this.state.status === "admin"){
      return (
        <div> 
            
              <Navbar/>
              <h2 >dash board</h2>



                
        </div>

      
    );

    }
    else{
      return <Redirect to="/" />;
    }
    
  }
}
export default  Dashboard;