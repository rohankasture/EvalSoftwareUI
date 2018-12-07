import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import ButtonAppBar from './ButtonAppBar';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import muiTheme from './Theme.js';
import { MuiThemeProvider } from '@material-ui/core/styles';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            width: 600,
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
    }
});
// This is used to show message . It can be used to show other message
// it reads from localstorage . key should be errorMessage while setting it up 
class ErrorPage extends Component {

    render() {

        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={muiTheme}>
                <CssBaseline />
                <ButtonAppBar />
                <main className={classes.main}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            {localStorage.getItem("errorMessage")}
                        </Typography>
                    </Paper>
                </main>
            </MuiThemeProvider>
        );
    }
}

ErrorPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ErrorPage);