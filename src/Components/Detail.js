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
		
	}

	handleChangeDropDown = event => {
		
	}
	handleNext = event => {
		this.setState({ next: true })
	}

	render() {
		const { classes } = this.props;
		var {is_manager} = this.props.selectedUser;
		if(this.props.next){
			return(
				<Manager handleDone={this.props.handleDone} handleChange={this.props.handleChange} selectedUser ={this.props.selectedUser}/>
			);
		}
		const button = is_manager === "1" ? (
			<Button color="secondary" variant='contained' className="buttonStyle" onClick={this.props.handleNext}> Next</Button>
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
									value={this.props.selectedUser.rank}
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
									value={this.props.selectedUser.token}
									onBlur={(event) => { this.props.handleTokenChange(event.target.defaultValue) }} //event.persist();
									onChange={(event) => this.props.handleTokenChange(event.target.value)}
									margin="normal"
								/>
							</div>
							<div>
								{!this.props.token.isValid && <span className="tokenStyle">{this.props.token.error}</span>}	
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
								<Dropdown options={this.props.options} onChange={this.props.handleAdjectiveChange} value={this.props.selectedUser.adjective} placeholder="Select an adjective" ></Dropdown>
								{!(this.props.adjective.isValid) && <span className="adjectiveStyle">{this.props.adjective.error}</span>}	
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
									name="description"
									value={this.props.selectedUser.description}
									onBlur = {this.props.handleChange}
									onChange={this.props.handleChange}
									margin="normal"
									multiline={true}
									rows={7}
									rowsMax={7}
									className={classes.textField}
								/>
							</div>
							<div>{!this.props.description.isValid && <span className="tokenStyle">{this.props.description.error}</span>}	</div>
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
