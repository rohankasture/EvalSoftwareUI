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

//This is used to save new password 

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: {
        value: "",
        isValid: true,
        error: ""
      },

      loginFlag: false,
      error_message: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
  }

  handleChangeUsername(event) {
    let newState = Object.assign({}, this.state);
    newState.loginFlag = false;
    if (event.target.value == "") {
      newState.username.error = "Username is Required";
      newState.username.isValid = false;
    }
    else {
      newState.username.value = event.target.value;
      newState.username.error = "";
      newState.username.isValid = true;
    }
    this.setState(newState);
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username.value;
    localStorage.setItem("username", username)
    var loginData = {
      "username": username
    };

    axios
      .post("https://snowy.sice.indiana.edu:55556/verify-user", loginData, {
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
            localStorage.setItem("firstname",res['data']['first_name'])
            window.location.assign("/signup")
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
              Forget Password
          </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">UserName</InputLabel>
                <Input id="username" className={this.state.username.isValid ? "pass" : "fail"} name="username" autoComplete="username" autoFocus onChange={(event) => this.handleChangeUsername(event)} />
                {!this.state.username.isValid && <Typography variant="body2" color="error">{this.state.username.error}</Typography>}
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={(event) => this.handleSubmit(event)}
                className={classes.submit}
              >
                Next
            </Button>
            </form>
          </Paper>
        </main>
      </MuiThemeProvider>
    );
  }
}

UserLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserLogin);
