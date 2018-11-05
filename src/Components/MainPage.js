import React, { Component } from "react";
import Tile from './Tile';
import Detail from './Detail';
import './MainPage.css'
class MainPage extends Component{
/*
  <Tile name = 'Rohan' />
	  <Detail rank = '1' name = 'Rocco' token = '50' descrription  = 'I am MS student'/>
*/
constructor(props){
super(props);
}

setReview = event =>{

}
render(){
return (
	<div className = "mContainer" >
		<div className="nameDivStyle">
			<div className="nameStyle"><Tile name = 'Rohan' /></div>
			<div className="nameStyle"><Tile name = 'Praneta' /></div> 
		</div>
		<div className="detailStyle">
			<div>
			<Detail rank = '1' name = 'Rocco' token = '50' descrription  = 'I am MS student'/>
			</div>
		</div>
	 </div>

	);
}
}

export default MainPage;