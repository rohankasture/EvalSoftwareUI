import React, { Component } from "react";
import "./Tile.css";

class Tile extends Component{

constructor(props){
	super(props);
	this.state = {
		id : this.props.id,
	}
}

render(){
return (
	<div onClick = {this.props.onClick} className="nameStyle">
	<p>{this.props.name}
	<span>{this.props.rank}</span>
	</p> 
	</div>
	);
}
}

export default Tile;