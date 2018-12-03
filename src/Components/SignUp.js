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
      confirmpassword:{
        value :"",
        isValid : false,
        error : ""
      },
      loginFlag : false,
      error_message : "",
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
  }
  handleChangeUserName(event) {
    let newState = Object.assign({}, this.state);
    newState.loginFlag = false;
    if(event.target.value == ""){
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
  handleSearch = (event) => {
    event.preventDefault();
    const username = this.state.username.value;
    const password = this.state.password.value;
    const confirmpassword = this.state.confirmpassword.value;
    console.log(username +"" + password)
    console.log(confirmpassword)
    var loginData = {
      "username": username,
      "password": password
    };

    if (password != confirmpassword)
    {
        this.setState({loginFlag:true, error_message:"Passwords don't match. Please try again!"})
    }  

    // axios
    //   .post("https://localhost:55555/login", loginData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //       crossDomain: true
    //     }
    //   })
    //   .then(
    //     function (res) {
    //       // console.log(res['data']['status_code']);
    //       if( res['data']['status_code'] != 200){
    //         // alert("Invalid credentials");  
    //         // window.location.assign('/'); 
    //         this.setState({loginFlag:true});
    //         this.setState({error_message:res['data']['log']}); 
    //       }  
    //     }.bind(this)
    //   )
    //   .catch(function (err) {
    //     console.log(err);
    //   });

  };
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <h2>Welcome to CSCI-P 532/632 Evaluation Software</h2>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
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
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Confirm Password</InputLabel>
              <Input name="password" className = {this.state.confirmpassword.isValid? "pass":"fail"} type="password" id="password" autoComplete="current-password" onChange={this.handleChangeConfirmPassword} />
              {!this.state.confirmpassword.isValid && <Typography variant ="body2" color = "error">{this.state.confirmpassword.error}</Typography>}
              {this.state.loginFlag && <Typography variant ="body2" color = "error">{this.state.error_message}</Typography>}
            </FormControl>
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={(event) => this.handleSearch(event)}
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);
