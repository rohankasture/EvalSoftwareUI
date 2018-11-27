import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';

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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleChangeUserName = this.handleChangeUserName.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
  }
  handleChangeUserName(event) {
    this.setState({ username: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }
  handleSearch = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    console.log(username +"" + password)
    var loginData = {
      "username": username,
      "password": password
    };
    axios
      .post("https://localhost:55555/login", loginData, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          crossDomain: true
        }
      })
      .then(
        function (res) {
          // console.log(res['data']['status_code']);
          if( res['data']['status_code'] != 200){
            alert("Invalid credentials");  
            window.location.assign('/');  
          }  
          else {
            let name = res['data']['first_name'] + ' ' + res['data']['last_name'] + '!'
            localStorage.setItem('name',name);   
            window.location.assign('/mainpage');
          
          }
        }.bind(this)
      )
      .catch(function (err) {
        alert("Invalid credentials");
        console.log(err);
      });

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
            Sign in
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">IU Username</InputLabel>
              <Input id="email" value={this.state.username} name="email" autoComplete="email" autoFocus onChange={this.handleChangeUserName} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" value={this.state.password} type="password" id="password" autoComplete="current-password" onChange={this.handleChangePassword} />
            </FormControl>
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={(event) => this.handleSearch(event)}
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
