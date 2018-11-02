import React, { Component } from "react";
import axios from "axios";
import styled, { css } from 'styled-components';
import Draggable from 'react-draggable'; 

class MainPage extends Component {
  constructor(props) {
    super(props);
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
        </div>
      </Draggable>

     ); 
  }
  }
export default MainPage; 
