export const EVALUEE_SELECTED = 'evaluee_selected';

export function selectEvaluee(evaluee){
    //ActionCreator 
    //Return an action, an object with a type property
    return {
        type: EVALUEE_SELECTED,
        payload: evaluee
    };
} 