import React, { Component } from "react";

class Tile extends Component{

constructor(props){
	super(props);
	this.state = {
		id : this.props.id,
	}
}

render(){
return (
	<div>
	<p>{this.props.name}
	<span>{this.props.rank}</span>
	</p> 
	</div>
	);
}
}

export default Tile;