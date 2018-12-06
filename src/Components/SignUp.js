import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import "./LoginPage.css";
import muiTheme from './Theme.js';
import { MuiThemeProvider } from '@material-ui/core/styles';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 6,
  },
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OTP:{
        value : "",
        isValid: true,
        error : ""
      }, 
      password: {
        value :"",
        isValid : false,
        error : ""
      },
      confirmpassword:{
        value :"",
        isValid : false,
        error : ""
      },
      loginFlag : false,
      error_message : "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeOTP = this.handleChangeOTP.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
  }
  handleChangeOTP(event) {
    let newState = Object.assign({}, this.state);
    newState.loginFlag = false;
    if(event.target.value == ""){
      newState.OTP.error = "OTP is Required";
      newState.OTP.isValid = false;
    }
    else{
      newState.OTP.value = event.target.value;
      newState.OTP.error = "";
      newState.OTP.isValid = true;
       }
    this.setState(newState);
  }
  handleChangePassword(event) {
    let newState = Object.assign({}, this.state);
    newState.loginFlag = false;
    if(event.target.value == ""){
      newState.password.error = "Password is Required";
      newState.password.isValid = false;
      
    }
    else{
      newState.password.value = event.target.value;
      newState.password.error = "";
      newState.password.isValid = true;
       }
    this.setState(newState);
  }
  handleChangeConfirmPassword(event) {
    let newState = Object.assign({}, this.state);
    newState.loginFlag = false;
    if(event.target.value == ""){
      newState.confirmpassword.error = "Confirm Password field can't be empty";
      newState.confirmpassword.isValid = false;
      
    }
    else{
      newState.confirmpassword.value = event.target.value;
      newState.confirmpassword.error = "";
      newState.confirmpassword.isValid = true;
       }
    this.setState(newState);
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const OTP = this.state.OTP.value;
    const password = this.state.password.value;
    const confirmpassword = this.state.confirmpassword.value;
    var loginData = {
      "otp": OTP,
      "password": password,
      "username": localStorage.getItem("username"),
    };

    if (password != confirmpassword)
    {
        this.setState({loginFlag:true, error_message:"Passwords don't match. Please try again!"})
    }  

    axios
      .post("https://localhost:55555/check-otp", loginData, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          crossDomain: true
        }
      })
      .then(
        function (res) {
          if (res['data']['status_code'] != 200) {
            localStorage.setItem("errorMessage", res['data']['log'])
            window.location.assign("/error")
          }
          else {
            window.location.assign("/")
          }
        }.bind(this)
      )
      .catch(function (err) {
        localStorage.setItem("errorMessage", err)
        window.location.assign("/error")
      });

  };
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={muiTheme}>
			<CssBaseline />
      <main className={classes.main}>
        <h2>Welcome to CSCI-P 532/632 Evaluation Software</h2>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Hello {localStorage.getItem("username")}
          </Typography>
          <form className={classes.form}>
            
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" className = {this.state.password.isValid? "pass":"fail"} type="password" id="password" autoComplete="current-password" onChange={this.handleChangePassword} />
              {!this.state.password.isValid && <Typography variant ="body2" color = "error">{this.state.password.error}</Typography>}
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Confirm Password</InputLabel>
              <Input name="password" className = {this.state.confirmpassword.isValid? "pass":"fail"} type="password" id="password" autoComplete="current-password" onChange={this.handleChangeConfirmPassword} />
              {!this.state.confirmpassword.isValid && <Typography variant ="body2" color = "error">{this.state.confirmpassword.error}</Typography>}
              {this.state.loginFlag && <Typography variant ="body2" color = "error">{this.state.error_message}</Typography>}
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="OTP">OTP</InputLabel>
              <Input id="OTP" className = {this.state.OTP.isValid ? "pass":"fail"} name="OTP" autoComplete="email" autoFocus onChange={(event) => this.handleChangeOTP(event)} />
              {!this.state.OTP.isValid && <Typography variant ="body2" color = "error">{this.state.OTP.error}</Typography>}
              
            </FormControl>
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={(event) => this.handleSubmit(event)}
              className={classes.submit}
            >
              Register
            </Button>
          </form>
        </Paper>
      </main>
      </MuiThemeProvider>
      
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);
