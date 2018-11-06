import React, { Component } from "react";
import Tile from './Tile';
import Detail from './Detail';
import './MainPage.css'
class MainPage extends Component{

constructor(props){
super(props);
this.state= {
	data : [{rank:'1',name : 'Rohan',token : '50', adjective :'Brilliant',description :'Best'},
	{rank:'2',name : 'Praneta',token : '50', adjective :'Friendly',description :'Good'},
	{rank:'3',name : 'Rocco',token : '30', adjective :'Smart',description :'Pokemon player'}],
	selected : {},
};
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
			<div className="nameChildStyle">{rows}</div>
		</div>
		<div className="detailStyle">
			<div>
				{/* give selected item properties to the details view */}
			<Detail rank = {this.state.selected.rank} name = {this.state.selected.name} token = {this.state.selected.token} adjective = {this.state.selected.adjective} description  = {this.state.selected.description}/>
			</div>
		</div>
	 </div>

	);
}
}

export default MainPage;