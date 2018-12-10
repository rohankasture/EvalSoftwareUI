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
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 8}px`,
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
// Login page

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:{
        value : "",
        isValid: true,
        error : ""
      }, 
      password: {
        value :"",
        isValid : false,
        error : ""
      },
      loginFlag : false,
      error_message : "",
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }
  handleChangeUserName(event) {
    let newState = Object.assign({}, this.state);
    newState.loginFlag = false;
    if(event.target.value === ""){
      newState.username.error = "Username is Required";
      newState.username.isValid = false;
    }
    else{
      newState.username.value = event.target.value;
      newState.username.error = "";
      newState.username.isValid = true;
       }
    this.setState(newState);
  }
  handleChangePassword(event) {
    let newState = Object.assign({}, this.state);
    newState.loginFlag = false;
    if(event.target.value === ""){
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
  handleSignIn = (event) => {
    event.preventDefault();
    const username = this.state.username.value;
    const password = this.state.password.value;
    var loginData = {
      "username": username,
      "password": password
    };
   
    axios
      .post("https://snowy.sice.indiana.edu:55556/login", loginData, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          crossDomain: true
        }
      })
      .then(
        function (res) {
          if( res['data']['status_code'] !== 200){
            this.setState({loginFlag:true});
            this.setState({error_message:res['data']['log']}); 
          }  
          else {
            let name = res['data']['first_name'] + ' ' + res['data']['last_name'] + '!'
            localStorage.setItem('name',name);   
            localStorage.setItem('auth_token',res['data']['auth_token']);
            window.location.assign('/mainpage');
          
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
            Sign in
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">IU Username</InputLabel>
              <Input id="email" className = {this.state.username.isValid ? "pass":"fail"} name="email" autoComplete="email" autoFocus onChange={(event) => this.handleChangeUserName(event)} />
              {!this.state.username.isValid && <Typography variant ="body2" color = "error">{this.state.username.error}</Typography>}
              
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" className = {this.state.password.isValid? "pass":"fail"} type="password" id="password" autoComplete="current-password" onChange={this.handleChangePassword} />
              {!this.state.password.isValid && <Typography variant ="body2" color = "error">{this.state.password.error}</Typography>}
              {this.state.loginFlag && <Typography variant ="body2" color = "error">{this.state.error_message}</Typography>}
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={(event) => this.handleSignIn(event)}
              className={classes.submit}
            >
              Sign in
            </Button>
            <span><br/><br/><a href ="/register">Forget password</a></span>
          </form>
        </Paper>
      </main>
      </MuiThemeProvider>
     
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
