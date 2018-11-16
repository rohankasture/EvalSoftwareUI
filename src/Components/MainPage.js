import React, { Component } from "react";
import Tile from './Tile';
import Detail from './Detail';
import Dropdown from 'react-dropdown';
import './MainPage.css';
import axios from 'axios';
import Draggable from 'react-draggable';
class MainPage extends Component{
constructor(props){
super(props);
this.state= {
	data : [{rank:'1',name : 'Rohan Kasture',token : '50', adjective :'Brilliant',description :'Best'},
	{rank:'2',name : 'Praneta Paithankar',token : '50', adjective :'Friendly',description :'Good'},
	{rank:'3',name : 'Rocco Manzo',token : '30', adjective :'Smart',description :'Pokemon player'}],
	selected : {},
	options : [
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
      .get(`https://localhost:55555/team/rkasture`,{
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          crossDomain: true
      }
      })
    //   .then(res => this.setState({ posts: res.data }))
	.then(res => //console.log(res.data.BadAjectives)) 
		this.setState({options : res.data.BadAjectives}))
      .catch(err => console.log(err))
}
  
// handleOnClick(id) - > will set the selected property in state to the selected id from data. eg selected = data[id]
handleOnClick = (id) =>{
	this.setState({selected:this.state.data[id]});
}
render(){
	let rows = [];
	for (let i=0; i<this.state.data.length; i++){
		console.log('i == ',this.state.data[i].name);
		rows.push(<Tile name = {this.state.data[i].name} onClick={()=>this.handleOnClick(i)} />)
	}
return (
	<div className = "mContainer" >
	{/* iterate through data and show tile */}
		<div className="nameDivStyle">
		<Draggable
			axis="y"
			handle=".handle"
			defaultPosition={{x: 0, y: 0}}
			position={null}
			grid={[25, 25]}
			onStart={this.handleStart}
			onDrag={this.handleDrag}
			onStop={this.handleStop}>
			<div className="nameChildStyle">{rows}</div>
		</Draggable>
		</div>
		<div className="detailStyle">
			<div>
				{/* give selected item properties to the details view */}
			<Detail options = {this.state.options} rank = {this.state.selected.rank} name = {this.state.selected.name} token = {this.state.selected.token} adjective = {this.state.selected.adjective} description  = {this.state.selected.description}/>
			</div>
		</div>
	 </div>
	);
}
}
export default MainPage;