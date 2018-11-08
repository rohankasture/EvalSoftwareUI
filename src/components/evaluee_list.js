import React, { Component } from "react";
import {connect} from 'react-redux';
import {selectEvaluee} from '../actions/index';
import {bindActionCreators} from 'redux';

class EvalueeList extends Component{

	renderList(){
        return this.props.evaluees.map((evaluee)=>{
            return(
                <li 
                    key = {evaluee.name} 
                    onClick= {()=> this.props.selectEvaluee(evaluee)}
                    className ="nameStyle">
                    {evaluee.name}
                </li>
            );
        });
    }
    
	render(){
        return(
            <ul className = "list-group col-sm-4">
                {this.renderList()}
            </ul>
        );
    }
}

function mapStateToProps(state){
	console.log('map');
    return{
        evaluees:state.evaluees
    };
}
function mapDispatchToProps(dispatch){
    //whenever slectbook is called send result to all reducers
    return bindActionCreators({selectEvaluee},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(EvalueeList);