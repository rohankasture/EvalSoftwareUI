import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Detail from './Detail';
import ButtonAppBar from './ButtonAppBar';
import './MainPage.css';
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
		overflowY: 'auto',
	}

});

class MainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{ rank: 1, initials: 'RK', name: 'Rohan Kasture', token: '50', adjective: 'Brilliant', description: 'Best', userId: 'rkasture' },
				{ rank: 2, initials: 'PP', name: 'Praneta Paithankar', token: '50', adjective: 'Friendly', description: 'Good', userId: 'ppaithan' },
				{ rank: 3, initials: 'RM', name: 'Rocco Manzo', token: '30', adjective: 'Smart', description: 'Pokemon player', userId: 'rmanzo' },
				{ rank: 4, initials: 'SB', name: 'Shradha Baranwal', token: '30', adjective: 'Energetic', description: 'Smart', userId: 'sbaranwa' },
				{ rank: 5, initials: 'MK', name: 'Murtaza Khambaty', token: '10', adjective: 'Professional', description: 'Workaholic', userId: 'mkhambaty' },

			],
			selected: "",
			options: [
				{
					type: 'group', name: 'Good Adjectives', items: [
						{ value: 'three', label: 'Brilliant' },
						{ value: 'four', label: 'Professional' }
					]
				},
				{
					type: 'group', name: 'Bad Adjectives', items: [
						{ value: 'five', label: 'Unreliable' },
						{ value: 'six', label: 'Useless' }
					]
				}
			],
		};
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleTokenChange = this.handleTokenChange.bind(this);
	}

	componentWillMount() {
		this.setState({selected:this.state.data[0]});
		axios
			.get(`https://localhost:55555/team/rkasture`, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					crossDomain: true
				}
			})
			//   .then(res => this.setState({ posts: res.data }))
			.then(res => //console.log(res.data.BadAjectives)) 
				this.setState({ options: res.data.BadAjectives }))
			.catch(err => console.log(err))
	}

	// handleOnClick(id) - > will set the selected property in state to the selected id from data. eg selected = data[id]
	handleOnClick = (id) => {
		console.log("OnClick" + id);
		// console.log("data[id]"+ this.state.data[id].token);
		this.setState({ selected: this.state.data[id] });
	}
	handleTokenChange = (id,token) => {
		let selected = Object.assign({}, this.state.selected);
		selected.token = token;
		
		this.setState({selected});
		console.log({selected});
		let data = this.state.data;
		data[selected.rank-1].token = selected.token;
		this.setState({data});
		console.log({data});
		// this.setState({data[id]:token});
		// this.setState({selected.token:token})
		console.log("MainPage Handle Token Change method");		
	}
	
	handleDescriptionChange = (id,desc) => {
		// const { target: { name, value } } = event;
		//this.setState(() => ({ description: event.target.value }))
		let newState = Object.assign({}, this.state);
		newState.data[id].description = desc;
		this.setState(newState);
		console.log("MainPage handleDescriptionChange");
	}
	
	
	reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);


		var mapUser = result.map((user, index) => {
			user.rank = index + 1
			return user;
		});

		this.handleOnClick(startIndex);
		return mapUser;
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

	// onUpdate = (e) => {
	// 	console.log("On Update")
	// 	let newState = Object.assign({}, this.state);
	// 	newState.data[id].token = 99;
	// 	this.setState(newState);
	// };

	render() {
		const { classes } = this.props;
		return (
			<MuiThemeProvider theme={muiTheme}>
				<ButtonAppBar />
				<br />
				<Grid container direction="column" justify="flex-start" alignItems="" spacing="40">
					<Grid item direction="row" justify="center" alignItems="center" >

						<Typography variant="h4" color="textPrimary" >
							Hello FirstName LastName
						</Typography>

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
																					<Tile name={user.name} initials={user.initials} onClick={() => this.handleOnClick(index)} />
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
							{/* onUpdate = {this.onUpdate} */}
								<Detail  handleTokenChange = {this.handleTokenChange}
										 
								options={this.state.options} rank={this.state.selected.rank} name={this.state.selected.name} token={this.state.selected.token} adjective={this.state.selected.adjective} description={this.state.selected.description} 
								/>
							</Grid>
						</Grid>


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


// <div>
// 					<ButtonAppBar />
// 					<br />
// 					<Typography variant="h4" color="textPrimary" >
// 						Hello FirstName LastName
// 				</Typography>
// 					<div >
// 						{/* iterate through data and show tile */}
// 						<div >
// 							<DragDropContext onDragEnd={this.onDragEnd}>
// 								<Droppable droppableId="droppable">
// 									{
// 										(provided, snapshot) => (
// 											<div className="scrollable"
// 												ref={provided.innerRef}>
// 												<List className={classes.root} component="nav">
// 													{this.state.data.map((user, index) => (
// 														<Draggable key={user.userId} draggableId={user.userId} index={index}>
// 															{(provided, snapshot) => (

// 																<div 
// 																	ref={provided.innerRef}
// 																	{...provided.draggableProps}
// 																	{...provided.dragHandleProps}>
// 																	<Tile name={user.name}  initials={user.initials} onClick={() => this.handleOnClick(index)} />
// 																</div>
// 															)}
// 														</Draggable>
// 													))}
// 												{provided.placeholder}
// 												</List>

// 											</div>
// 										)}
// 								</Droppable>


// 							</DragDropContext>

// 						</div>
// 						<div className="detailStyle">
// 							<div>
// 								{/* give selected item properties to the details view */}
// 								<Detail options={this.state.options} rank={this.state.selected.rank} name={this.state.selected.name} token={this.state.selected.token} adjective={this.state.selected.adjective} description={this.state.selected.description} />
// 							</div>
// 						</div>
// 					</div>
// 				</div>