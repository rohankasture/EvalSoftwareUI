import React, { Component } from "react";
import "./Tile.css";

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
				<p>{this.props.name}
					<span>{this.props.rank}</span>
				</p>
			</div>
		);
	}
}

export default Tile;

