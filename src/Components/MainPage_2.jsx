import React, { Component } from "react";
import axios from "axios";
import styled, { css } from 'styled-components';
import Draggable from 'react-draggable'; 

class UserDetails extends Component{
  constructor(props) {
    super(props);
  }
  render(){
  return(
    <div>
    <p>The current name is ({this.props.name})</p>
    <p>Rank is ({this.props.rank})</p>
    </div>
  )  
  }
}
class Item extends Component{
  constructor(props) {
    super(props);
    //this.handleDrag = this.handleDrag.bind(this);
    this.state = { x : 0, y: 0};
  }
   

  render() {
    return (
      <div style={{ height: '100%' }}>
        <h1>Move the mouse around!</h1>
        <p>The current details are ({this.props.x}, {this.props.y})</p>
      </div>
    );
  }
}

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = { x : 0, y: 0};
  }

  handleDrag = (event) => {
    console.log(event);
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
        <Draggable
        axis="y"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        grid={[25, 25]}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div>
          <div className="handle">Drag from here</div>
          <div>This readme is really dragging on...</div>
         <Item x = {this.state.x} y = {this.state.y}/>
          <UserDetails name = "Rohan" rank = "1"/>
          <UserDetails name="Ameya" rank = "2"/>
          <UserDetails name="Sid" rank = "3"/>
        </div>
      </Draggable>

     ); 
  }
  }
export default MainPage; 
