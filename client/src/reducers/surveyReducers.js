import {FETCH_SURVEY} from '../actions/type';

export default function(state = [],action) {

  switch(action.type){
    case FETCH_SURVEY:
      return action.payload || false;

    default:
      return state;
  }
}
