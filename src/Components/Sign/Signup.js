import { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import MuiPhoneNumber from "material-ui-phone-number"
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import "./Signup.css"

//   "@material-ui/core": "^4.11.3",
//"@material-ui/icons": "^4.11.2",

class Sign extends Component {
  constructor(props) {
    super();
    let a = "sign";
    let data = localStorage.getItem("mydata");
    data = JSON.parse(data);

    if (data !== null) {
      a = "admin";
    }

    this.state = {
      name: "",
      password: "",
      test: a,
      email: "",
      ph : "" , 
      address : ""
    };
  }

 

  submit = (e) => {
    e.preventDefault()
    let a;
    if (this.state.name !== "" && this.state.password !== "") {
      // let obj = { name: this.state.name, auth: "true" };

      // localStorage.setItem("mydata", JSON.stringify(obj));

      const user = {
        username: this.state.name,
        password: this.state.password,
        email: this.state.email,
        address : this.state.address , 
        ph : this.state.ph
      };

     


      axios
        .post("http://localhost:9000/users/add", user)
        .then((res) => {
          a = res.data;
          if (a === "false") {
            this.setState({ test: "sign" });
            alert("looks like you are alredy resistered ..");
          } else {
            
              let obj = { email: this.state.email, auth: "true" };
              localStorage.setItem("mydata", JSON.stringify(obj));
              this.setState({ test: "admin" });

          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
 
  login = () => {
    this.setState({ test: "login", name: "", password: "", email: "" });
  };

  demo = () => {
    this.setState({ test: "sign", name: "", password: "", email: "" });
  };
  log_in = (e) => {
    e.preventDefault()
    // let data = localStorage.getItem("mydata");
    // data = JSON.parse(data);

    // if (data !== null) {
    //   localStorage.removeItem("mydata");
    // }
    let pass;


    const url =
      "http://localhost:9000/users/login/" +
      this.state.email +
      "/" +
      this.state.password;

    axios
      .get(url)
      .then((res) => {
        pass = res.data;
       

        if (pass === "true") {
          let obj = { email: this.state.email , auth: "true" };
          localStorage.setItem("mydata", JSON.stringify(obj));
          this.setState({ test: "admin" });
        } else {
          alert("invalid");
        }
      })
      .catch((err) => console.log(err));
  };

  handlePhoneChange = (value) => {
    if (value) {
      this.setState({ ph: value });
    }
  }

  render() {
    const paperStyle = {
      padding: 20,
      height: "100vh",
      // width: "60%",
      margin: "auto",
     
    };
    const avatarStyle = { backgroundColor: "#1bbd7e" };
    const btnstyle = { margin: "8px 0" };
    
    if (this.state.test === "admin") {
      return <Redirect to="/dashboard" />;
    }
    if (this.state.test === "sign") {
      return (
        <div className = "sign">
          <Grid>
            <Paper elevation={15} style={paperStyle}>
              <Grid align="center">
                <Avatar style={avatarStyle}>
                  <LockOutlinedIcon />
                </Avatar>
                <h2>Sign In</h2>
              </Grid>
              <form onSubmit = {this.submit}>
              <TextField
                label="Username"
                placeholder="username"
                onChange={(e) => {this.setState({name : e.target.value})}}
                value={this.state.name}
                fullWidth
                required
                style={{ padding: 13 }}
              />

              <TextField
                label="Emaili"
                placeholder="email"
                onChange= {(e) => {this.setState({email : e.target.value})}}
                value={this.state.email}
                type="email"
                fullWidth
                required
                style={{ padding: 13 }}
              />
              <TextField
                label="Password"
                placeholder="password"
                onChange= {(e) => {this.setState({password : e.target.value})}}
                value={this.state.password}
                type="password"
                fullWidth
                required
                style={{ padding: 13 }}
              />
              <TextField
                label="address"
                placeholder="address"
                onChange={(e) => {this.setState({address : e.target.value})}}
                value={this.state.address}
                type="text"
                fullWidth
                required
                style={{ padding: 13 }}
              />
            
               <MuiPhoneNumber
                    name="phone"
                    label="Phone Number"
                    data-cy="user-phone"
                    defaultCountry={"in"}
                    value={this.state.ph}
                    onChange={this.handlePhoneChange} 
                  />
              <FormControlLabel
                control={<Checkbox name="checkedB" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
              
                style={btnstyle}
                fullWidth
              >
                Sign in
              </Button>

              <Typography>
                {" "}
                Do you have an account ?
                <Link onClick={this.login} style={{ cursor: "pointer" }}>
                  login
                </Link>
              </Typography>
                

             
              </form> 
             
              
            </Paper>
          </Grid>
        </div>
      );
    }
    if (this.state.test === "login") {
      return (
        <div className = "sign">
          <Grid>
            <Paper elevation={15} style={paperStyle}>
              <Grid align="center">
                <Avatar style={avatarStyle}>
                  <LockOutlinedIcon />
                </Avatar>
                <h2>Log in </h2>
              </Grid>
              <form onSubmit = {this.log_in}>
              <TextField
                label="email"
                placeholder="email"
                type = "email"
                onChange={(e) => {this.setState({email : e.target.value})}}
                value={this.state.email}
                fullWidth
                required
                style={{ padding: 13 }}
              />

              <TextField
                label="Password"
                placeholder="password"
                type="password"
                onChange= {(e) => {this.setState({password : e.target.value})}}
                value={this.state.password}
                fullWidth
                required
                style={{ padding: 13 }}
              />
              <FormControlLabel
                control={<Checkbox name="checkedB" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                onClick={this.log_in}
                style={btnstyle}
                fullWidth
              >
                LogIn
              </Button>

              <Typography>
                {" "}
                want to go the SignIn page ?
                <Link onClick={this.demo} style={{ cursor: "pointer" }}>
                  SignIn
                </Link>
              </Typography>
          

              </form>
              
            </Paper>
          </Grid>
        </div>
      );
    }
  }
}
export default Sign;
