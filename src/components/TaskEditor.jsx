import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

class Task extends Component {
  constructor(props) {
    super(props);
    this.taskId = this.props.match.params.id != 'new'? this.props.match.params.id : ''; //ссылка
    
    let task;
    if(!this.taskId) {
      task = {
        name: '',
        description: '',
        priority: 0,
        elapsed_time: '',
        planned_time: '',
        status: 0,
        create_date: ''
      };
    } else {
      task = this.props.getTask(this.taskId);
      if(!task) {
        this.props.history.push('/NotFound404');
        return;
      }
    };
    
    this.state = {
      name: task.name,
      description: task.description,
      priority: task.priority,
      elapsed_time: task.elapsed_time,
      planned_time: task.planned_time,
      status: task.status
    };
  };

  render() {
    return (
      <form className="container">
        <h3 className="row align-items-center mb-3">
          <NavLink to="/tasks" className="col-auto">Список задач</NavLink> / 
          <div className="col-md col-auto">
            <input type="text" className="form-control" name="name" placeholder="Название" 
              value={this.state.name} onChange={this.changeField}/>
          </div>
        </h3>
        <fieldset className="fields list-group-item mb-2">
          <div className="form-group row">
            <label htmlFor="statusField" className="col-2 col-form-label">Статус:</label>
            <div className="col-10">
              <select className="form-control" name="status" id="statusField" 
                value={this.state.status} onChange={this.changeField}>
                <option value="0">План</option>
                <option value="1">В процессе</option>
                <option value="2">Готово</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="descriptionField" className="col-2 col-form-label">Описание:</label>
            <div className="col-10">
              <textarea className="form-control" name="description" id="descriptionField" rows="3" 
                value={this.state.description} onChange={this.changeField}></textarea>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="priorityField" className="col-2 col-form-label">Приоритет:</label>
            <div className="col-10">
              <select className="form-control" name="priority" id="priorityField" 
                value={this.state.priority} onChange={this.changeField}>
                <option value="0">Низкий</option>
                <option value="1">Средний</option>
                <option value="2">Высокий</option>
              </select>
            </div>
          </div>
          <div className="form-group row align-items-center">
            <label htmlFor="plannedTimeField" className="col-2 col-form-label">Планируемое время:</label>
            <div className="col-10">
              <input type="text" className="form-control" name="planned_time" id="plannedTimeField" 
                value={this.state.planned_time} onChange={this.changeField}/>
            </div>
          </div>
          <div className="form-group row align-items-center">
            <label htmlFor="elapsedTimeField" className="col-2 col-form-label">Затраченное время:</label>
            <div className="col-10">
              <input type="text" className="form-control" name="elapsed_time" id="elapsedTimeField" 
                value={this.state.elapsed_time} onChange={this.changeField}/>
            </div>
          </div>
        </fieldset>
        <fieldset className="buttons list-group-item">
          <button key={1} type="button" className="btn btn-success ml-2 mr-2" onClick={this.saveHandler}>Сохранить</button>
          <button key={2} type="button" className="btn btn-light mr-4" onClick={this.cancelHandler}>Отмена</button>
        </fieldset>
      </form>

      
    )
  };

  changeField = event => this.setState({[event.target.name]:event.target.value})

  cancelHandler = () => this.props.history.push(`/tasks/${this.taskId}`);
  saveHandler = () => {
    if(this.taskId) {
      this.props.editTask(Object.assign({}, this.state, {id: this.taskId}))
    } else {
      this.props.newTask(Object.assign({}, this.state))
    }
    this.props.history.push(`/tasks/${this.taskId}`);
  };
}

export default  withRouter(connect(
  state => ({
    getTask: taskId => state.tasks.filter(task => task.id == taskId)[0]}),
  dispatch => ({
    editTask: payload => dispatch({type: 'EDIT_TASK', payload}),
    newTask: payload => dispatch({type: 'NEW_TASK', payload})
  })
)(Task));