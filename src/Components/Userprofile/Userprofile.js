import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar"
import "./Userprofile.css"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiPhoneNumber from "material-ui-phone-number"
import axios from "axios";
class Userprofile extends Component {
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
      open : false , 
      name : "" , 
      address : "" , 
      ph : ""  , 
      email : "" , 
      name1 : "" , 
      address1 : "" , 
      ph1 : ""  , 
      email1 : ""
    };
  }
  logout = () => {
    localStorage.removeItem("mydata");
    this.setState({ status: "logout" });
  };
  onhandleclick = () =>{
    this.setState({open : true})
  }
  onhandleclose = () =>{
    this.setState({open : false})
  }

  handlePhoneChange = (value) => {
    if (value) {
      this.setState({ ph1: value });
    }
  }

  onupdate = () =>{
    let data = localStorage.getItem("mydata")
    data = JSON.parse(data)
    const link = "http://localhost:9000/users/update/" + data.email
    const user = {
      username: this.state.name1,
      address : this.state.address1 , 
      ph : this.state.ph1
    };
    axios.post(link, user)
    .then((res) => {
      if(res.data === "true"){
        window.location = "/dashboard"
      }
      else{
        alert("database is not updated")
        this.setState({open : false})
      }


    })
    .catch((err) => {
      console.log(err)
      this.setState({open : false})


    })




  }

   componentDidMount() {
    let data = localStorage.getItem("mydata")
    data = JSON.parse(data)
   

    const link = "http://localhost:9000/users/curr/" + data.email
    axios.get(link)
    .then((res) => {
          this.setState({name : res.data.username})
          this.setState({email : res.data.email})
          this.setState({address : res.data.address})
          this.setState({ph : res.data.ph})
        


    })
    .catch((err) =>{
      console.log(err)

    })

    
  }



  render() {

    if(this.state.status === "admin"){
      return (
        <div  className = "change"> 
              <Navbar/>
              <div className="container darker">
                <h2>name</h2>
                <p>{this.state.name}</p>
                <h2>email</h2>
                <p>{this.state.email}</p>
                <h2>address</h2>
                <p>{this.state.address}</p>
                <h2>phone</h2>
                <p>{this.state.ph}</p>
                  <div>
                    <Button variant="outlined" color="primary" onClick={this.onhandleclick}>
                      change
                    </Button>
                    <Dialog open={this.state.open} onClose={this.onhandleclose} aria-labelledby="form-dialog-title">
                      
                      <DialogContent>
                        <DialogContentText>
                           if you want to change your name , location or phone number you can change here 
                        </DialogContentText>
                        <TextField
                            label="Username"
                            placeholder="username"
                            onChange={(e) => {this.setState({name1 : e.target.value})}}
                            value={this.state.name1}
                            fullWidth
                            required
                            style={{ padding: 13 }}
                        />
                      </DialogContent>
                  
                      <DialogContent>
                        <TextField
                            label="address"
                            placeholder="address"
                            onChange={(e) => {this.setState({address1 : e.target.value})}}
                            value={this.state.address1}
                            fullWidth
                            required
                            style={{ padding: 13 }}
                        />
                      </DialogContent>
                     
                      <DialogContent>
          
                       <MuiPhoneNumber
                          name="phone"
                          label="Phone Number"
                          data-cy="user-phone"
                          defaultCountry={"in"}
                          value={this.state.ph1}
                          onChange={this.handlePhoneChange} 
                        />
                      </DialogContent>
                      
                      <DialogActions>
                        <Button onClick={this.onhandleclose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={this.onupdate} color="primary">
                          update
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>

              </div>
              


                
        </div>

      
    );

    }
    else{
      return <Redirect to="/" />;
    }
    
  }
}
export default  Userprofile;
