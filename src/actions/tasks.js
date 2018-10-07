import data from '../db.json';

export function loadTask(id) {
  return dispatch => {
    //запрос к бд
    //fetch().then(response => {}).catch(...)
    setTimeout(
      () => {
        let tasks = data.tasks.filter(task => task.user == id);
        dispatch({type: 'LOADED_TASKS', payload: tasks});
      }, 200
    )
  }
}