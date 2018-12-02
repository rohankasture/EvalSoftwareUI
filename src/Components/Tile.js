import React, { Component } from "react";
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import iconImg from '../Images/icon.png'
 
const styles = theme => ({
	avatar: {
		margin: 10,
		color: '#fff',
    	backgroundColor: deepPurple[500],
	},

	tilecolor: {
		margin: 10,
		color: '#fff',
		backgroundColor: "#fff",
	},

	tilecolor2: {
		margin: 10,
		color: '#fff',
		backgroundColor: "#4fb3bf",
	},

	imageavatar:{
		width:20,
		height:20,
	},
	greenAvatar: {
		// margin: 10,
		color: '#fff',
		backgroundColor: '#006400',
		width : 10,
		height :10,
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
		const { classes } = this.props;
		const name = this.props.first_name +" "+ this.props.last_name
		return (

			<React.Fragment> 
				<ListItem className= {(this.props.id == this.props.selected_id)?classes.tilecolor2:classes.tilecolor} button onClick={this.props.onClick} >
					<Avatar className={classes.avatar}>
						{this.props.initials}
					</Avatar>
					<ListItemText primary={name} />
					{this.props.is_complete && <Avatar alt="No" src={iconImg} className={classes.imageavatar}/>}
				</ListItem>
				<Divider className={classes.divider} backgroundcolor="#00838f" />
			</React.Fragment>
		);
	}
}
Tile.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tile);

