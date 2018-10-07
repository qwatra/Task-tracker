export default function(state=[], action) {
  let status = ['План', 'В процессе', 'Готово'];
  let priority = ['Низкий', 'Средний', 'Высокий'];
  switch(action.type) {
    case 'LOADED_TASKS':
      return action.payload;
    case 'EDIT_TASK': 
      return state.map(
        elm => {
          if(elm.id == action.payload.id) {
            Object.assign(elm, action.payload);
            elm.status_text = status[elm.status];
            elm.priority_text = priority[elm.priority];
          }
          return elm;
        });
    case 'NEW_TASK':
      let id = Math.max.apply(null, state.map(elm => elm.id)) + 1;
      let task = Object.assign({}, action.payload, {id, create_date: new Date().toISOString().split('.')[0]});
      task.status_text = status[task.status];
      task.priority_text = priority[task.priority];
      return [...state, task];
    case 'CHANGE_STATUS':
      return state.map(
        elm => {
          if(elm.id == action.payload.id) {
            elm.status = action.payload.status;
            elm.status_text = status[action.payload.status];
          }
          return elm;
        }
      );
  }
  return state;
}