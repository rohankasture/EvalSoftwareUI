import React, { Component } from "react";
import "./Detail.css";
import Dropdown from 'react-dropdown';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import muiTheme from './Theme.js';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Input, Typography, TextField, FormControl } from "@material-ui/core";

const styles = theme => ({
	card: {
		height: '90%',
		width: '100%',
		minWidth: '600px',
		overflowY: 'auto',
	},
	content: {
		height: '80%'
	},
	actions: {
		display: 'flex',
		justifyContent: 'center',
	},
	button: {
		marginTop: theme.spacing.unit * 3,
		marginLeft: theme.spacing.unit,
	},
	
	text: {
		verticalAlign: "top",
		textAlign: "left"
	},
	description: {
		width: '100%',
		minWidth: '300px'
	}

});

class Detail extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleChangeDropDown = this.handleChangeDropDown.bind(this);
		this.state = {
			id: this.props.id,
		};

	}
	handleClick = event => {
		console.log('Clicked1');
	}

	handleChangeDropDown = event => {
		console.log('Changed');
	}

	render() {
		const { classes } = this.props;

		return (
			<Card className={classes.card}>
				<CardContent className={classes.content}>
				<Grid container direction="column" spacing={24}>
						<Grid item>
								<div className="labelStyle">
									<Typography variant="h6" color="textPrimary" className={classes.text} >
											Rank
									</Typography>
								</div>
								<div className="inputStyle">
									<Input
										required
										name="Rank"
										value={this.props.rank}
										onChange={this.handleChange}
										margin="normal"
										InputProps={{
											readOnly: true,
										  }}
									/>
								</div>
						</Grid>
						<Grid item>
								<div className="labelStyle">
									<Typography variant="h6" color="textPrimary" className={classes.text} >
										Token
									</Typography>
								</div>
								<div className="inputStyle">
									<Input
										required
										name="Token"
										value = {this.props.token}
										onChange={(event) => this.props.handleTokenChange(event.target.value)}
										margin="normal"
									/>
								</div>
						</Grid>
						<Grid item>
								<div className="labelStyle">
									<Typography variant="h6" color="textPrimary" className={classes.text} >
										Adjective
									</Typography>
								</div>
								<div className="inputStyle">
									<Dropdown  options={this.props.options} onChange={this.handleChangeDropDown} value={this.state.adjective} placeholder="Select an adjective" ></Dropdown>
								</div>
						</Grid>
						<Grid item>
								<div className="labelStyle">
									<Typography variant="h6" color="textPrimary" className={classes.text} >
										Description
									</Typography>
								</div>
								<div className="desInputStyle">
									<TextField
										required
										id="outlined-textarea"
										multiline
										variant="outlined"
										name="Description"
										value ={this.props.description}
										onChange={(event) => this.props.handleDescriptionChange(event.target.value)}
										margin ="normal"
										multiline={true}
										rows={4}
										rowsMax={5}
									/>
								</div>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions className={classes.actions}>
					<Button color="secondary" variant='contained' className="buttonStyle" onClick={this.props.handleDone}> Done</Button>
				</CardActions>
			</Card>
		);
	}
}
Detail.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Detail);
