import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Detail from './Detail';
import ButtonAppBar from './ButtonAppBar';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import muiTheme from './Theme.js';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Tile from './Tile'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


const styles = theme => ({
	listRoot: {
		width: '100%',
		maxWidth: '360px',
		backgroundColor: theme.palette.background.paper,
		height: '100%',
	},
	gridRoot: {
		marginLeft: '5%',
	},
	card: {
		height: '90%',
		maxHeight: '600px',
		overflowY: 'auto',
	},
	button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        width: '100px',
        height: '30px',

	},
	tokenDiv:{
		display: 'flex',
		justifyContent: 'flex-end',
	},
	token:{
		marginRight : theme.spacing.unit*3
	}

});
class MainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			selected: {},
			options: [],
			total : 0,
			sumTokenFlag : false,
			error : "",
			next : false,
			back:false,
			token:{
				value : "",
				isValid: true,
				error : ""
			  }, 
			description:{
				value : "",
				isValid: true,
				error : ""
			  }, 
			adjective:{
				value : "",
				isValid: true,
				error : ""
			}, 
		};
		this.handleTokenChange = this.handleTokenChange.bind(this);
		this.handleDone = this.handleDone.bind(this);
		this.handleAdjectiveChange = this.handleAdjectiveChange.bind(this);
	}
	 
	addAdjective= (adjectiveName,adjectiveList)=>{
		var adjectives =[]
		adjectiveList.forEach(function(element) {
			var item ={ value: element, label: element}
			adjectives.push(item)
		});
		var option = {
			type: 'group', name: adjectiveName, items: adjectives
		}
		let options = this.state.options
		options.push(option)
		this.setState({options: options})
	}

	componentWillMount() {
		var token ={
			"auth_token" : localStorage.getItem('auth_token')
		};
		this.setState({selected:this.state.data[0]});
		axios
			.post(`https://localhost:55555/team`,token,{
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					crossDomain: true
				}
			})
			.then(res => {
				this.setState({data: res.data.team})
				this.setState({selected:JSON.parse(JSON.stringify(res.data.team[0])) })
				this.addAdjective('Good Adjectives',res.data.good_adjectives)
				this.addAdjective('Bad Adjectives',res.data.bad_adjectives)
			}) 
			.catch(err => console.log(err))
	}

	// handleOnClick(id) - > will set the selected property in state to the selected id from data. eg selected = data[id]
	handleOnClick = (id) => {
		let newState = Object.assign({}, this.state);
		newState.token.isValid = true;
		newState.adjective.isValid = true;
		newState.description.isValid = true;
		this.setState(newState);
		
		this.setState({next:false})
		this.setState({ selected: JSON.parse(JSON.stringify(this.state.data[id])) });
	}
	handleNext = ()=>
	{
		this.setState({back:false})
		this.setState({next:true})
	}
	handleBack = () =>{
		this.setState({next:false})
		this.setState({back:true})
	}
	handleTokenChange = (token) => {
		let newState = Object.assign({}, this.state);
		if(token === ""){
		newState.token.error = "Token is Required";
		newState.token.isValid = false;
		}
		else{
		newState.token.value = token;
		newState.token.error = "";
		newState.token.isValid = true;
		}
		this.setState(newState);
		var sum = parseInt(token);
		sum = sum + this.state.total;
		if(sum > 100){
			this.setState ({error:"Sum of tokens should be 100",sumTokenFlag:true});
		}	
		else{
			this.setState ({sumTokenFlag:false});
		}	
		let selected = Object.assign({}, this.state.selected);
		selected.evaluation.tokens = token;
		this.setState({selected});
	}
	handleAdjectiveChange = (event) => {
		let newState = Object.assign({}, this.state);
		if(event.label !== ""){
		newState.adjective.value = event.label;
		newState.adjective.error = "";
		newState.adjective.isValid = true;
		}
		this.setState(newState);

		let selected = Object.assign({}, this.state.selected);
		selected.evaluation.adjective = event.label;
		this.setState({selected});
	}

	handleDone = () =>{
		// console.log(this.state.selected.evaluation)
		// console.log(this.state.selected.is_complete)
		let selected = Object.assign({}, this.state.selected);
		let newState = Object.assign({}, this.state);
		let flag = false;
		if(selected.evaluation.tokens === ""){
			newState.token.error = "Token is Required";
			newState.token.isValid = false;
			flag = true;
		}
		if(selected.evaluation.description === ""){
			newState.description.error = "Description is Required";
			newState.description.isValid = false;			
			flag = true	;
		}
		if(selected.evaluation.adjective === ""){
			newState.adjective.error = "Adjective is Required";
			newState.adjective.isValid = false;			
			flag = true	;
		}

		this.setState(newState);
		
		if(!flag){
		//For Done Avatar
		let selected = this.state.selected;
		selected.is_complete = true;
		this.setState({selected})
		let total = this.state.total
		total = total + parseInt(this.state.selected.evaluation.tokens)
		this.setState({total}) 
		let data = this.state.data;
		data[this.state.selected.evaluation.rank-1] = this.state.selected;
		this.setState({data});
		}
	}
	handleDescriptionChange = (event) =>{
		let newState = Object.assign({}, this.state);
		if(event.target.value === ""){
		newState.description.error = "Description is Required";
		newState.description.isValid = false;
		}
		else{
		newState.description.value = event.target.value;
		newState.description.error = "";
		newState.description.isValid = true;
		}
		this.setState(newState);

		
		let selected = Object.assign({}, this.state.selected);
		selected.evaluation.description = event.target.value
        this.setState({selected})
	}
	
	handleManagerChange =(event) =>{
		let selected = Object.assign({}, this.state.selected);
		selected.manager[event.target.name] = event.target.value
        this.setState({selected})
	}

	reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);


		var mapUser = result.map((user, index) => {
			user.evaluation.rank = index + 1
			return user;
		});

		this.handleOnClick(startIndex);
		return mapUser;
	};

	handleSubmit = (event)=>{
			console.log(event)
	};

	onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}

		const data = this.reorder(
			this.state.data,
			result.source.index,
			result.destination.index
		);

		this.setState({
			data,
		});
	};

	render(){
		const { classes } = this.props;
		var name = localStorage.getItem('name');
		var total = 0;
		// var token_flag = false;
		{this.state.data.map((d,i)=>{
			if(d.is_complete == true){
					if(d.evaluation.tokens!=""){
						total = total + parseInt(d.evaluation.tokens);
						}
			}	
		})}

		var remaining = 100 -parseInt(total);
		var selected = this.state.selected;
		if (selected === undefined){
			return(<div>
			</div>)
		}
		return(
			<MuiThemeProvider theme={muiTheme}>
				<ButtonAppBar />
				<br />
				<Grid container direction="column" justify="flex-start"  spacing={40}>
					<Grid item >

						<Typography variant="h4" color="textPrimary">
							Hello {name}
						</Typography>
						<div className={classes.tokenDiv}>
							<Typography className={classes.token} variant="h6" color="textPrimary">
								Tokens Left: {remaining}
							</Typography>
						</div>
					</Grid>
					<Grid item className={classes.gridRoot}>
						<Grid container direction="row" justify="center" alignItems="center" alignContent="center" spacing={40}>
							<Grid item>
								<Card className={classes.card}>
									<CardContent>
										<DragDropContext onDragEnd={this.onDragEnd}>
											<Droppable droppableId="droppable">
												{
													(provided, snapshot) => (
														<div
															ref={provided.innerRef}>
																<List className={classes.listRoot} component="nav">
																	{this.state.data.map((user, index) => (
																		<Draggable key={user.username} draggableId={user.username} index={index}>
																			{(provided, snapshot) => (
																				<div
																					ref={provided.innerRef}
																					{...provided.draggableProps}
																					{...provided.dragHandleProps}>		
																					<Tile  is_complete={user.is_complete}  selected_id = {this.state.selected.evaluation.rank-1} id = {user.evaluation.rank-1}  first_name={user.first_name} last_name ={user.last_name} initials={user.initials} onClick={() => this.handleOnClick(index)} />
																				</div>
																			)}
																		</Draggable>
																	))}
																	{provided.placeholder}
																</List>
														</div>
													)}
											</Droppable>
										</DragDropContext>
									</CardContent>
								</Card>
							</Grid>
							<Grid item className={classes.cardGrid} >
								<Detail  handleTokenChange = {this.handleTokenChange}
										 handleAdjectiveChange ={this.handleAdjectiveChange}
										 handleDone = {this.handleDone} 
										 handleDescriptionChange = {this.handleDescriptionChange}
										 handleManagerChange = {this.handleManagerChange}
										 sumTokenFlag = {this.state.sumTokenFlag}
										 error = {this.state.error}
										 selectedUser = {this.state.selected}
										 options={this.state.options}   
										 handleNext ={this.handleNext}
										 handleBack = {this.handleBack}
										 back = {this.state.back}
										 next ={this.state.next}
										 token = {this.state.token}
										 description ={this.state.description}
										 adjective = {this.state.adjective}
								/>
								</Grid>
						</Grid>
					</Grid>
					<Grid item  >
						<Button color="primary" variant='contained' className={classes.button} onClick={this.handleSubmit}> Submit</Button>
					</Grid>
				</Grid>
			</MuiThemeProvider>
		);
		
	}
	render1() {
		const { classes } = this.props;
		var name = localStorage.getItem('name');
		var remaining = 100 - this.state.total;
		return (
			<MuiThemeProvider theme={muiTheme}>
				<ButtonAppBar />
				<br />
				<Grid container direction="column" justify="flex-start" alignItems="" spacing="40">
					<Grid item direction="row" justify="center" alignItems="center" >

						<Typography variant="h4" color="textPrimary">
							Hello {name}
						</Typography>
						<div className={classes.tokenDiv}>
							<Typography className={classes.token} variant="h6" color="textPrimary">
								Tokens Left: {remaining}
							</Typography>
						</div>
					</Grid>

					<Grid item className={classes.gridRoot} direction="row" justify="center" alignItems="" alignContent="center">
						<Grid container direction="row" justify="" alignItems="" alignContent="center" spacing={40}>
							<Grid item direction="row" justify="center" alignItems="flex-start">
								<Card className={classes.card}>
									<CardContent>
										<DragDropContext onDragEnd={this.onDragEnd}>
											<Droppable droppableId="droppable">
												{
													(provided, snapshot) => (
														<div
															ref={provided.innerRef}>
																<List className={classes.listRoot} component="nav">
																	{this.state.data.map((user, index) => (
																		<Draggable key={user.userId} draggableId={user.userId} index={index}>
																			{(provided, snapshot) => (
																				<div
																					ref={provided.innerRef}
																					{...provided.draggableProps}
																					{...provided.dragHandleProps}>																			
																					<Tile is_complete = {user.doneFlag} selected_id = {this.state.selected.rank-1} name={user.name} initials={user.initials} rank ={user.rank} id = {user.rank-1} onClick={() => this.handleOnClick(index)} />
																				</div>
																			)}
																		</Draggable>
																	))}
																	{provided.placeholder}
																</List>
														</div>
													)}
											</Droppable>
										</DragDropContext>
									</CardContent>
								</Card>
							</Grid>
							<Grid item className={classes.cardGrid} direction="row" justify="center" alignItems="center">
								<Detail  handleTokenChange = {this.handleTokenChange}
										 handleAdjectiveChange ={this.handleAdjectiveChange}
										 handleDone = {this.handleDone} 
										 handleChange = {this.handleChange}
										 sumTokenFlag = {this.state.sumTokenFlag}
										 error = {this.state.error}
										 selectedUser = {this.state.selected}
										 options={this.state.options}   
										 handleNext ={this.handleNext}
										 handleBack = {this.handleBack}
										 back = {this.state.back}
										 next ={this.state.next}
										 token = {this.state.token}
										 description ={this.state.description}
										 adjective = {this.state.adjective}
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid item direction="row" justify="center" alignItems="center" >
						<Button color="primary" variant='contained' className={classes.button} onClick={this.handleSubmit}> Submit</Button>
					</Grid>
				</Grid>
			</MuiThemeProvider>
		);
	}
}
MainPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainPage);


