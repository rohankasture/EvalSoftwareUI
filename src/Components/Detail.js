import React, {Component } from "react";
import "./Detail.css";
import Dropdown from 'react-dropdown';
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import purple from '@material-ui/core/colors/purple';

const muiTheme = createMuiTheme({ palette: { primary: {main:purple[500]}, secondary: {main:'#9b59b6'},},})	
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
			<div className="labelStyle"><label> Description:</label></div>
			<div className="desInputStyle"> <textarea rows = {5} value={this.props.description} /></div>
		</div>	

		<div className="buttonDivStyle">
			<MuiThemeProvider theme = {muiTheme}>
			<Button color = "secondary" variant ='contained' className="buttonStyle"  onClick = {this.handleClick}> Done</Button>
			</MuiThemeProvider>
		</div>
			
		</div>
		);
}

}

export default Detail;