import React, { Component } from "react";
import Tile from './Tile';
import Detail from './Detail';
import Dropdown from 'react-dropdown';
import './MainPage.css';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


  
class MainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{ rank: 1, name: 'Rohan Kasture', token: '50', adjective: 'Brilliant', description: 'Best', userId: 'rkasture' },
				{ rank: 2, name: 'Praneta Paithankar', token: '50', adjective: 'Friendly', description: 'Good', userId: 'ppaithan' },
				{ rank: 3, name: 'Rocco Manzo', token: '30', adjective: 'Smart', description: 'Pokemon player', userId: 'rmanzo' }
			],
			selected: {},
			options: [
				// { value: 'one', label: 'Ok' },
				// { value: 'two', label: 'Dependable' },
				// {
				//  type: 'group', name: 'Good Adjectives', items: [
				//    { value: 'three', label: 'Brilliant' },
				//    { value: 'four', label: 'Professional' }
				//  ]
				// },
				// {
				//  type: 'group', name: 'Bad Adjectives', items: [
				//    { value: 'five', label: 'Unreliable' },
				//    { value: 'six', label: 'Useless' }
				//  ]
				// }
			]
		};
	}

	componentWillMount() {
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

	reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		
		var mapUser = result.map((user, index) =>{ 
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

	render() {

		return (
			<div className="mContainer" >
				{/* iterate through data and show tile */}
				<div className="nameDivStyle">
					<DragDropContext onDragEnd={this.onDragEnd}>
						<Droppable droppableId="droppable">
							{
								(provided, snapshot) => (
								<div
									ref={provided.innerRef}>
									{this.state.data.map((user, index) => (
										<Draggable key={user.userId} draggableId={user.userId} index={index}>
											{(provided, snapshot) => (
												<div 
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}>
													<Tile name={user.name} onClick={()=>this.handleOnClick(index)}/>
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>


					</DragDropContext>

				</div>
				<div className="detailStyle">
					<div>
						{/* give selected item properties to the details view */}
						<Detail options={this.state.options} rank={this.state.selected.rank} name={this.state.selected.name} token={this.state.selected.token} adjective={this.state.selected.adjective} description={this.state.selected.description} />
					</div>
				</div>
			</div>
		);
	}
}
export default MainPage;