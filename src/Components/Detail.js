import React, {Component } from "react";
import "./Detail.css";
import Dropdown from 'react-dropdown';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import muiTheme from './Theme.js';
import {MuiThemeProvider} from '@material-ui/core/styles';

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
		<MuiThemeProvider theme = {muiTheme}>
		<CssBaseline/>
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
			<div className="labelStyle"><label> Description:</label></div>
			<div className="desInputStyle"> <textarea onDrag = {false} rows = {5} value={this.props.description} /></div>
		</div>	

		<div className="buttonDivStyle">
			<Button color = "secondary" variant ='contained' className="buttonStyle"  onClick = {this.handleClick}> Done</Button>
		</div>
		</div>
		</MuiThemeProvider>
		);
}

}

export default Detail;