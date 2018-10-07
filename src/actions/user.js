import data from '../db.json';
import {loadTask} from './tasks.js'

function isLoading(v) {
  return {type: 'LOADING', payload: v}
}

export function signin(form) {
  return dispatch => {
    dispatch(isLoading(true)); 
    //запрос к бд
    //fetch().then(response => {}).catch(...)
    setTimeout(
      () => {
        let user = data.users.filter(user => user.email==form.email && user.password==form.password)[0];
        if(user) {
          dispatch({type: 'SIGNEDIN', payload: {id: user.id, name: user.name}});

          var timerId = setInterval(() => dispatch(loadTask(user.id)), 180*1000);
          dispatch(loadTask(user.id));
          dispatch({type: 'SET_TIMER', payload: timerId});
        } else {
          dispatch({type: 'SIGNIN_ERROR', payload: 'Неправильный email или пароль'});
        }
        dispatch(isLoading(false));
      }, 1000
    )
  }
}

export function signup(form) {
  return dispatch => {
    dispatch(isLoading(true)); 
    //запрос к бд
    //fetch().then(response => {}).catch(...)
    setTimeout(
      () => {
        let user = data.users.filter(user => user.email==form.email);
        if(user.length == 0) {
          //сохранияем запись в бд
          //...
          let id = Math.max.apply(null, data.users.map(elm => elm.id)) + 1;
          dispatch({type: 'SIGNEDUP', payload: {id, name: form.name}});

          var timerId = setInterval(() => dispatch(loadTask(user.id)), 180*1000);
          dispatch(loadTask(user.id));
          dispatch({type: 'SET_TIMER', payload: timerId});
        } else {
          dispatch({type: 'SIGNUP_ERROR', payload: 'Пользователь с таким именем уже существует'});
        }
        dispatch(isLoading(false));
      }, 1000
    )
  }
}

export function signout() {
  return dispatch => {
    //запрос к бд
    //fetch().then(response => {}).catch(...)
    setTimeout(
      () => {
        dispatch({type: 'SIGNEDOUT'});
        dispatch({type: 'CLEAR_TIMER'});
      }, 1000
    )
  }
}