import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Assessment from '@material-ui/icons/Assessment';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },

  assesment: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function handleClick(){
  localStorage.removeItem('auth_token');
  window.location.assign('/');
}
function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.assesment} color="inherit" aria-label="Assessment">
            <Assessment  />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow} align = "left">
            Evaluation Software
          </Typography>
          <Button color="inherit" onClick = {handleClick}>Log out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);