import React, { Component } from "react";
import "./Detail.css";
import Dropdown from 'react-dropdown';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Input, Typography, TextField} from "@material-ui/core";
import Manager from "./Manager";

const styles = theme => ({
	card: {
		height: '90%',
		maxHeight:'700px',
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
		width: '100px',
    	height: '30px',
	},

	text: {
		verticalAlign: "top",
		textAlign: "left",
		marginLeft: theme.spacing.unit *3,
		marginRight : theme.spacing.unit
	},

	textField: {
		marginLeft: theme.spacing.unit*3,
		marginRight: theme.spacing.unit,
		width: "100%",
	},

	label:{
		display: 'flex',
		justifyContent: 'flex-end',
		width: '40%'
	},

	inputDiv:{
		display: 'flex',
		justifyContent: 'flex-start',
		width: '50%'
	},
	input:{
		marginLeft: theme.spacing.unit*3,
		marginRight: theme.spacing.unit,
	}

});

class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.id
		};

	}
	

	render() {
		const { classes } = this.props;
		var {is_manager} = this.props.selectedUser;
		if(this.props.next){
			return(
				<Manager back = {this.props.back} handleDone={this.props.handleDone} handleDescriptionChange={this.props.handleDescriptionChange} selectedUser ={this.props.selectedUser} handleBack = {this.props.handleBack}
										handleTokenChange = {this.props.handleTokenChange}
										 handleAdjectiveChange ={this.props.handleAdjectiveChange}
										 sumTokenFlag = {this.props.sumTokenFlag}
										 error = {this.props.error}
										 options={this.props.options}   
										 handleNext ={this.props.handleNext}
										 next ={this.props.next}
										 token = {this.props.token}
										 description ={this.props.description}
										 handleManagerChange = {this.props.handleManagerChange}
				
				/>
			);
		}
		const button = is_manager === "1" ? (
			<Button color="secondary" variant='contained' className={classes.button} onClick={this.props.handleNext}> Next</Button>
		) : (
			<Button color="secondary" variant='contained' className={classes.button} onClick={this.props.handleDone}> Done</Button>
			)
		return (
			<Card className={classes.card}>
				<CardContent className={classes.content}>
					<Grid container direction="column" spacing={24}>
						<Grid item>
							<Grid container direction ="row">
									<div className={classes.label}>
										<Typography variant="h6" color="textPrimary" className={classes.text} >
											Rank
										</Typography>
									</div>
									<div className={classes.inputDiv}>
										<Input
											required
											name="Rank"
											value={this.props.selectedUser.evaluation.rank}
											className ={classes.input}
											InputProps={{
												readOnly: true,
											}}
										/>
									</div>
									
							</Grid>
						</Grid>
						<Grid item>
							<Grid container direction="row">
								<div className={classes.label}>
									<Typography variant="h6" color="textPrimary" className={classes.text} >
										Token
									</Typography>
									
								</div>
								<div className={classes.inputDiv}>
									<Input
										required
										name="Token"
										value={this.props.selectedUser.evaluation.token}
										onBlur={(event) => { this.props.handleTokenChange(event.target.defaultValue) }} //event.persist();
										onChange={(event) => this.props.handleTokenChange(event.target.value)}
										className={classes.input}
									/>
									{!this.props.token.isValid && <Typography variant="body2" color="error">{this.props.token.error}</Typography>}
									{this.props.sumTokenFlag && <Typography variant="body2" color="error">{this.props.error}</Typography>}
								</div>
							</Grid>
							
						</Grid>
						<Grid item>
							<Grid container direction="row">
								<div className={classes.label}>
										<Typography variant="h6" color="textPrimary" className={classes.text} >
											Adjective
										</Typography>
								</div>
								<div className={classes.input}>
									<Dropdown options={this.props.options} onChange={this.props.handleAdjectiveChange} value={this.props.selectedUser.evaluation.adjective} placeholder="Select an adjective" ></Dropdown>
									{!this.props.adjective.isValid && <Typography  variant="body2" color="error">{this.props.adjective.error}</Typography>}
								</div>
							</Grid>
							
						</Grid>
						<Grid item>
							<Grid container direction="row">
								<div className={classes.label}>
									<Typography variant="h6" color="textPrimary" className={classes.text} >
										Description
									</Typography>
								</div>
								<div className ={classes.inputDiv}>
									<TextField
										required
										id="outlined-textarea"
										multiline
										variant="outlined"
										name="description"
										value={this.props.selectedUser.evaluation.description}
										onBlur={this.props.handleDescriptionChange}
										onChange={this.props.handleDescriptionChange}
										margin="normal"
										rows={7}
										rowsMax={7}
										className={classes.textField}
									/>
									{!this.props.description.isValid && <Typography variant="body2" color="error">{this.props.description.error}</Typography>}
								</div>
							</Grid>
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
