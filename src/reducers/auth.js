export default function(state={user:null, error:'', timer:null, loading:false}, action) {
  switch(action.type) {
    case 'SIGNEDIN': return {...state, user:action.payload, error: ''};
    case 'SIGNIN_ERROR': return {...state, user: null, error: action.payload};
    case 'SIGNEDUP': return {...state, user:action.payload, error: ''};
    case 'SIGNUP_ERROR': return {...state, user: null, error: action.payload};
    case 'SIGNEDOUT': return {...state, user: null, error: ''};
    case 'LOADING': return {...state, loading: action.payload};
    case 'SET_TIMER': return {...state, timer: action.payload};
    case 'CLEAR_TIMER': 
      clearInterval(state.timer);
      return {...state, timer: null};
    case 'CLEAR_ERROR': return {...state, error: ''};
  }
  return state;
}