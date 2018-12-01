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
import Manager from "./Manager";

const styles = theme => ({
	card: {
		height: '90%',
		maxHeight:'600px',
		width: '100%',
		minWidth: '750px',
		overflowY: 'auto',
	},
	content: {
		height: '80%'
	},
	actions: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing.unit * 3,
		marginLeft: theme.spacing.unit,
	},

	text: {
		verticalAlign: "top",
		textAlign: "left"
	},

	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: "100%",
	}

});

class Detail extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleChangeDropDown = this.handleChangeDropDown.bind(this);
		this.state = {
			id: this.props.id,
			next: false
		};

	}
	handleClick = event => {
		console.log('Clicked1');
	}

	handleChangeDropDown = event => {
		console.log('Changed');
	}
	handleNext = event => {
		this.setState({ next: true })
	}

	render() {
		const { classes, is_manager } = this.props;
		if(this.state.next){
			console.log("next")
			return(
				<Manager handleDone={this.props.handleDone} handleChange={this.props.handleChange} selectedUser ={this.props.selectedUser}/>
			);
		}
		const button = is_manager === "1" ? (
			<Button color="secondary" variant='contained' className="buttonStyle" onClick={this.handleNext}> Next</Button>
		) : (
			<Button color="secondary" variant='contained' className="buttonStyle" onClick={this.props.handleDone}> Done</Button>
			)
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
									value={this.props.token}
									onBlur={(event) => { this.props.handleTokenSum(event.target.defaultValue) }} //event.persist();
									onChange={(event) => this.props.handleTokenChange(event.target.value)}
									margin="normal"
								/>
							</div>
							<div>
								{this.props.sumTokenFlag && <span className="tokenStyle">{this.props.error}</span>}
							</div>
						</Grid>
						<Grid item>
							<div className="labelStyle">
								<Typography variant="h6" color="textPrimary" className={classes.text} >
									Adjective
									</Typography>
							</div>
							<div className="inputStyle">
								<Dropdown options={this.props.options} onChange={this.props.handleAdjectiveChange} value={this.props.adjective} placeholder="Select an adjective" ></Dropdown>
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
									value={this.props.description}
									onChange={(event) => this.props.handleDescriptionChange(event.target.value)}
									margin="normal"
									multiline={true}
									rows={7}
									rowsMax={7}
									className={classes.textField}
								/>
							</div>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions className={classes.actions}>
					{button}
				</CardActions>
			</Card>
		);
	}
}
Detail.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Detail);
