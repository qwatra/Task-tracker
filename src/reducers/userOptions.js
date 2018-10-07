export default function(state={filter:[], view:'0'}, action) {
  switch(action.type) {
    case 'SET_FILTER': return {...state, filter: action.payload};
    case 'SET_VIEW': return {...state, view: action.payload};
  }
  return state;
}