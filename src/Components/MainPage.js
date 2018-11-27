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
		overflowY: 'auto',
	}

});

class MainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{ rank: 1, initials: 'RK', name: 'Rohan Kasture', token: '', adjective: '', description: '', userId: 'rkasture' },
				{ rank: 2, initials: 'AA', name: 'Ankita Alshi', token: '', adjective: '', description: '', userId: 'aralshi' },
				{ rank: 3, initials: 'RM', name: 'Rocco Manzo', token: '', adjective: '', description: '', userId: 'rmanzo' },
				{ rank: 4, initials: 'SB', name: 'Shradha Baranwal', token: '', adjective: '', description: '', userId: 'sbaranwa' },
				{ rank: 5, initials: 'RD', name: 'Ramya DG', token: '', adjective: '', description: '', userId: 'ramyaDG' },
				{ rank: 6, initials: 'SK', name: 'Shweta Kulkarni', token: '', adjective: '', description: '', userId: 'svkul' },
				
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
		this.handleDone = this.handleDone.bind(this);
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
		this.setState({ selected: this.state.data[id] });
	}
	handleTokenChange = (token) => {
		let selected = Object.assign({}, this.state.selected);
		selected.token = token;
		this.setState({selected});
	}
	handleAdjectiveChange = (adjective) => {
		let selected = Object.assign({}, this.state.selected);
		selected.adjective = adjective;
		this.setState({selected});
	}

	handleDone = () =>{
		let data = this.state.data;
		data[this.state.selected.rank-1] = this.state.selected;
		this.setState({data});
	}
	
	handleDescriptionChange = (description) => {
		// const { target: { name, value } } = event;
		//this.setState(() => ({ description: event.target.value }))
		let selected = Object.assign({}, this.state.selected);
		selected.description = description;
		this.setState({selected});
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

	render() {
		const { classes } = this.props;
		var name = localStorage.getItem('name');
		return (
			<MuiThemeProvider theme={muiTheme}>
				<ButtonAppBar />
				<br />
				<Grid container direction="column" justify="flex-start" alignItems="" spacing="40">
					<Grid item direction="row" justify="center" alignItems="center" >

						<Typography variant="h4" color="textPrimary">
							Hello {name}
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
																					<Tile name={user.name} initials={user.initials} rank ={user.rank} onClick={() => this.handleOnClick(index)} />
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
										 handleDescriptionChange = {this.handleDescriptionChange}						
										 handleDone = {this.handleDone} 
										 handleAdjectiveChange = {this.handleAdjectiveChange}
								options={this.state.options} rank={this.state.selected.rank} name={this.state.selected.name} token={this.state.selected.token} adjective={this.state.selected.adjective} description={this.state.selected.description} 
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid item direction="row" justify="center" alignItems="center" >
						<Button color="primary" variant='contained' className="buttonStyle" onClick={this.handleSubmit}> Submit</Button>
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


