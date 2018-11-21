import React, { Component } from "react";
import "./Tile.css";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const theme = createMuiTheme({
	palette: {
	  primary: { main: '#009688' }, // Purple and green play nicely together.
	  secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
	},
  });
class Tile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id: this.props.id,
		}
	}
	setRef = ref => {
		// keep a reference to the dom ref as an instance property
		this.ref = ref;
		// give the dom ref to react-beautiful-dnd
		this.props.innerRef(ref);
	};

	render() {
		const { provided, innerRef } = this.props;
		return (
			<div
				
				onClick={this.props.onClick} className="nameStyle">
				<MuiThemeProvider theme={theme}>
     				 <Button variant ='contained' color="primary" fullWidth value = "rkasture" ></Button>
					<p>{this.props.name}</p>
				</MuiThemeProvider> 	
			</div>
		);
	}
}

export default Tile;

