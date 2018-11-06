import React, { Component } from "react";
import Tile from './Tile';
import Detail from './Detail';
import './MainPage.css'
class MainPage extends Component{
/*
  <Tile name = 'Rohan' />
	  <Detail rank = '1' name = 'Rocco' token = '50' descrription  = 'I am MS student'/>
*/
// let data = [{},{}]

constructor(props){
super(props);
this.state= {
	data : [{rank:'1',name : 'Rohan',token : '50', adjective :'Brilliant',description :'Best'},
	{rank:'2',name : 'Praneta',token : '50', adjective :'Friendly',description :'Good'}],
	selected : {},
};
// this.handleOnClick = this.handleOnClick.bind(this);
}

// handleOnClick(id) - > will set the selected property in state to the selected id from data. eg selected = data[id]
handleOnClick = (id) =>{
	// event.preventDefault();
	console.log("id= ", id);
	//this.state.selected = this.state.data[id]; 
	this.setState({selected:this.state.data[id]});
	console.log('selected');
}

render(){
return (
	<div className = "mContainer" >
	{/* iterate through data and show tile */}
		<div className="nameDivStyle">
			<div className="nameStyle" ><Tile name =' Rohan' onClick={() =>this.handleOnClick(0)}/></div>
			<div className="nameStyle"><Tile name = 'Praneta' onClick={()=>this.handleOnClick(1)}/></div> 
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