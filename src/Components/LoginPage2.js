import React from 'react';
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
let uname = {};
function handleSearch(event){
    event.preventDefault();
    // window.location.assign('/mainpage');
    const formData = {};
    // for (const field in innerRef) {
    //   formData[field] = innerRef[field].value;
    // }    
    console.log(uname);
    alert(uname);
    var loginData = {};
    // loginData["email"] = formData["email"];; //pass INPUT value
    // loginData["password"] = formData["password"];
    axios
      .post("https://localhost:55555/login", loginData, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              crossDomain: true
            }
          })
          .then(
            function(res) {
              console.log(res);
              window.location.assign('/mainpage');
            }.bind(this)
          )
          .catch(function(err) {
            alert("Invalid credentials");
            console.log(err);
          });
        event.target.reset();
  };
  
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

let isSubmitted = false;


function SignIn(props) {
  const { classes } = props;
  // const {isSubmitted}  = this.state;
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
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" innerRef = {e1 => uname = e1} name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password"  type="password" id="password" autoComplete="current-password" />
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
            onClick = {handleSearch}
            className={classes.submit}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </main>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
