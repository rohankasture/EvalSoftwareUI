import React, {Component } from "react";
import {connect} from 'react-redux';
import './evaluee_detail.css';

class EvalueeDetail extends Component{
constructor(props){
	super(props);
	this.handleClick = this.handleClick.bind(this);
}
handleClick = event =>{
console.log('Clicked');
}
render(){
	const evaluee = this.props.evaluee;
	if(!this.props.evaluee){
		return <div>Select a evaluee to get started </div> ;
	}
	return(
		<div className="mainContainer">
			<div>{evaluee.name}</div>
			<div className="container">
				<div className="labelStyle"><label> Rank:</label></div>
				<div className="inputStyle"><input type="Text" value={evaluee.rank}/></div>
			</div>

			<div className="container">
				<div className="labelStyle"><label> Token:</label></div>
				<div className="inputStyle"><input type="Text" value={evaluee.token} /></div>
			</div>

			<div className="container">
				<div className="labelStyle"><label> Adjective:</label></div>
				<div className="inputStyle"><input type="Text" value={evaluee.adjective} /></div>
			</div>	

			<div className="descriptionContainer">
				<div className="descriptionStyle"><label> Description:</label></div>
				<div className="desInputStyle"> <input type="Text"  value={evaluee.description} /></div>
			</div>	

			<div className="buttonDivStyle">
				<button className="buttonStyle"  onClick = {this.handleClick}> Done</button>
			</div>
			
		</div>
		);
}
}

function mapStateToProps(state){
	console.log(state.activeEvaluee)
	return{
		evaluee: state.activeEvaluee
	}
}
export default connect(mapStateToProps)(EvalueeDetail);