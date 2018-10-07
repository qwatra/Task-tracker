import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Select from 'react-select';
import Table from './Table';
import Scrum from './Scrum';

const options = [
  { value: [0, 'план'], label: 'План' },
  { value: [1, 'процессе'], label: 'В процессе' },
  { value: [2, 'готово'], label: 'Готово' }
];

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {filter: []};
  };

  getTasksView() {
    if(this.props.userOpt.view==0 || this.props.userOpt.view==1) {
      let fields = this.props.userOpt.view == 0? 
        ['name', 'description', 'planned_time', 'elapsed_time', 'priority_text', 'status_text']:
        ['name', 'priority_text', 'status_text']
      return <Table 
          data={this.state.filter.length ? this.props.tasks.filter( elm => this.state.filter.indexOf(elm.status) >= 0):
            this.props.tasks} 
          fields={fields} 
          labels={{
            name:'Имя', 
            description: 'Описание',
            planned_time: 'Планируемое время',
            elapsed_time: 'Затраченное время',
            priority_text: 'Приоритет',
            status_text: 'Статус'}}
            onClickRow={this.clickTable}/>
    } else {
      return (
        <div className="d-flex justify-content-center">
          <Scrum/>
        </div>
      )
    }
  }

  render() {
    
    return (
      <div>
        <div className="row">
          <h3 className="col">Мои задачи</h3>
          <Select
            options={options}
            isMulti
            placeholder="Фильтр по статусу"
            className="col"
            onChange={this.handleChange}
          />
        </div>

        <nav className="nav nav-pills justify-content-end mb-3">
          <Link className="btn btn-primary mr-auto" role="button" to="/tasks/edit/new">Добавить задачу</Link>
          <span className="nav-item nav-link"><b>Вид:</b></span> 
          <a className="nav-item nav-link" onClick={this.changeView}
            href={this.props.userOpt.view!=0?'/tasks?detailed':null} id="view_0">Подробный</a>
          <a className="nav-item nav-link" onClick={this.changeView}
            href={this.props.userOpt.view!=1?'/tasks?short':null} id="view_1">Краткий</a>
          <a className="nav-item nav-link" onClick={this.changeView}
            href={this.props.userOpt.view!=2?'/tasks?scrum':null} id="view_2">scrum доска</a>
        </nav>

        {this.getTasksView()}
      </div>
    )
  };

  changeView = (event) => {
    this.props.setView(event.target.id.split('_')[1])
  }

  handleChange = (selectedOption) => {
    this.setState({ filter: selectedOption.map( elm => elm.value[0]) });
  };

  clickTable = (record) => {
    this.props.history.push(`/tasks/${record.id}`);
  }
}

export default withRouter(connect(
  state => ({
    tasks: state.tasks,
    userOpt: state.userOpt}),
  dispatch => ({
    setView: (val) => dispatch({type: 'SET_VIEW', payload: val})
  })
)(Tasks));