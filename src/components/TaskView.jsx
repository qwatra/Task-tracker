import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Redirect } from 'react-router-dom';

class TaskView extends Component {
  render() {
    let task = this.props.getTask(this.props.match.params.id);
    if(!task) {
      return <Redirect to="/NotFound404"/>
    }

    let btnGroup = this.getButtonGroup(task.status); 

    return (
      <div className="container">
        <h3 className="mb-3"><NavLink to="/tasks">Список задач</NavLink> / {task.name}</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <div className="row">
              <div className="col-2">Статус:</div>
              <div className="col-10">{task.status_text}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col-2">Описание:</div>
              <div className="col-10">{task.description}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row align-items-center">
              <div className="col-2">Дата создания:</div>
              <div className="col-10">{task.create_date.split('T').join(' ')}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row">
              <div className="col-2">Приоритет:</div>
              <div className="col-10">{task.priority_text}</div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="row align-items-center">
              <div className="col-2">Планируемое время:</div>
              <div className="col-10">{task.planned_time}</div>
            </div>
          </li>
          <li className="list-group-item mb-2">
            <div className="row align-items-center">
              <div className="col-2">Затраченное время:</div>
              <div className="col-10">{task.elapsed_time}</div>
            </div>
          </li>
          <li className="list-group-item">
            {btnGroup}
          </li>
        </ul>
      </div>      
    )
  };

  editHandler = () => this.props.history.push(`/tasks/edit/${this.props.match.params.id}`);
  completeHandler = () => this.props.changeStatus({id: this.props.match.params.id, status: 2});
  startHandler = () => this.props.changeStatus({id: this.props.match.params.id, status: 1});
  pauseHandler = () => this.props.changeStatus({id: this.props.match.params.id, status: 0});

  getButtonGroup(status) {
    switch(status) {
      case 0: return [
        <button key={1} type="button" className="btn btn-primary ml-2 mr-2" onClick={this.startHandler}>Начать выполнения</button>,
        <button key={2} type="button" className="btn btn-success mr-4" onClick={this.completeHandler}>Завершить</button>,
        <button key={3} type="button" className="btn btn-light" onClick={this.editHandler}>Редактировать</button>
      ];
      case 1: return [
        <button key={1} type="button" className="btn btn-primary ml-2 mr-2" onClick={this.pauseHandler}>Приостановить</button>,
        <button key={2} type="button" className="btn btn-success mr-4" onClick={this.completeHandler}>Завершить</button>,
        <button key={3} type="button" className="btn btn-light" onClick={this.editHandler}>Редактировать</button>
      ];
      case 2: return [
        <button key={1} type="button" className="btn btn-info ml-2 mr-4" onClick={this.startHandler}>Возобновить</button>,
        <button key={3} type="button" className="btn btn-light" onClick={this.editHandler}>Редактировать</button>
      ];
    }
  }
}

export default  withRouter(connect(
  state => ({
    getTask: taskId => state.tasks.filter(task => task.id == taskId)[0]}),
  dispatch => ({
    changeStatus: payload => dispatch({type: 'CHANGE_STATUS', payload})})
)(TaskView));