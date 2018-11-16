import React, {Component } from "react";
import "./Detail.css";
import Dropdown from 'react-dropdown';
class Detail extends Component{
constructor(props){
	/*<button  onClick = {this.handleClick}> Done</button><br/>*/ 
	super(props);
	this.handleClick = this.handleClick.bind(this);
	this.state = {
		id : this.props.id,
	};
	
}
handleClick = event =>{
console.log('Clicked');
}

handleChange = event =>{
	console.log('Changed');
	}
render(){
	return(
		<div className="mainContainer">

		<div className="container">
			<div className="labelStyle"><label> Rank:</label></div>
			<div className="inputStyle"><input type={Text} value={this.props.rank}/></div>
		</div>

		<div className="container">
			<div className="labelStyle"><label> Token:</label></div>
			<div className="inputStyle"><input type={Text} value={this.props.token} /></div>
		</div>

		<div className="container">
			<div className="labelStyle"><label> Adjective:</label></div>
			<div className="inputStyle">
			<Dropdown options = {this.props.options} onChange = {this.handleChange} value = {this.props.adjective} placeholder = "Select an adjective" ></Dropdown>
			</div>
			{/* <input type={Text} value={this.props.adjective} /></div> */}
		</div>	

		<div className="descriptionContainer">
			<div className="descriptionStyle"><label> Description:</label></div>
			<div className="desInputStyle"> <textarea  value={this.props.description} /></div>
		</div>	

		<div className="buttonDivStyle">
			<button className="buttonStyle"  onClick = {this.handleClick}> Done</button>
		</div>
			
		</div>
		);
}

}

export default Detail;