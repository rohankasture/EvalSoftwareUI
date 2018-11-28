import React, { Component } from "react";
import "./Tile.css";
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

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
    	backgroundColor: "#00838f",
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
		const { classes } = this.props;
		return (

			<React.Fragment> 
				<ListItem className= {(this.props.id == this.props.selected_id)?classes.tilecolor2:classes.tilecolor} button onClick={this.props.onClick} >
					<Avatar className={classes.avatar}>{this.props.rank}
					</Avatar>
					<ListItemText primary={this.props.name} />
				</ListItem>
				<Divider className={classes.divider} backgroundColor="#00838f" />
			</React.Fragment>
		);
	}
}
Tile.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tile);

