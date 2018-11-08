import {EVALUEE_SELECTED} from '../actions'

export default function(state =null,action){
    switch(action.type){
    case EVALUEE_SELECTED:
        console.log(action.payload)
        return action.payload;
    default:
        return state;
    }
}
