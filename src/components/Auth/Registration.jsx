import React, {Component} from 'react'
import classNames from 'classnames'
import {connect} from 'react-redux'
import {signup} from '../../actions/user'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      validationErrors: {name: '', email: '', password: '', confirmPassword: ''},
    }
  }

  handlerFormSubmit = (event) => {
    event.preventDefault();
    let validationErrors = this.state.validationErrors
    validationErrors.name = !!this.state.name? '' : 'Обязателбное поле';
    validationErrors.email = /.+@.+\..+/.test(this.state.email)? '' : 'Некорректный E-mail';
    validationErrors.password = (this.state.password && this.state.password.length >= 6)? '' : 'Пароль д.б. больше или равен 6 симвлов';
    validationErrors.confirmPassword = this.state.confirmPassword === this.state.password? '' : 'Пароли д.б. равны';

    if(validationErrors.name || validationErrors.email || validationErrors.password || validationErrors.confirmPassword) {
      this.setState({validationErrors});
      return
    }
    this.props.signin({name: this.state.name, email: this.state.email, password:this.state.password});
  }

  changeField = event => this.setState({[event.target.name]:event.target.value})

  render() {
    if(this.props.auth.user) {
      return <Redirect to="/tasks"/>;
    }

    return (
      <section className="registration container shadow p-3 mb-5 bg-white rounded">
        <h2>Регистрация</h2>
        {this.props.auth.error &&
          <div className="alert alert-danger">
            {this.props.auth.error}
          </div>
        }
        <form onSubmit={this.handlerFormSubmit}>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-prepend">
                <div className="input-group-text bg-transparent"><i className="fas fa-user"></i></div>
              </span>
              <input 
                className= {classNames("form-control pl-0 pt-0",
                  {'border-left-0': !this.state.validationErrors.name,
                   'is-invalid': !!this.state.validationErrors.name})}
                type="text" 
                name="name" 
                placeholder="Введите ваше имя"
                onChange={this.changeField}
                value={this.name}
                ref={(input) => { this.firstInput = input; }}/>
              {this.state.validationErrors.name &&
                <div className="invalid-feedback">
                  {this.state.validationErrors.name}
                </div>
              }
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-prepend">
                <div className="input-group-text bg-transparent"><i className="fas fa-envelope"></i></div>
              </span>
              <input 
                className= {classNames("form-control pl-0 pt-0",
                  {'border-left-0': !this.state.validationErrors.email,
                  'is-invalid': !!this.state.validationErrors.email})}
                type="email" 
                name="email" 
                placeholder="Введите email"
                onChange={this.changeField}
                value={this.email}/>
              {this.state.validationErrors.email &&
                <div className="invalid-feedback">
                  {this.state.validationErrors.email}
                </div>
              }
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-prepend">
                <div className="input-group-text bg-transparent"><i className="fas fa-lock"></i></div>
              </span>
              <input 
                className= {classNames("form-control pl-0 pt-0",
                  {'border-left-0': !this.state.validationErrors.password,
                  'is-invalid': !!this.state.validationErrors.password})}
                type="password" 
                name="password" 
                placeholder="Введите пароль"
                onChange={this.changeField}
                value={this.password}/>
              {this.state.validationErrors.password &&
                <div className="invalid-feedback">
                  {this.state.validationErrors.password}
                </div>
              }
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-prepend">
                <div className="input-group-text bg-transparent"><i className="fas fa-lock"></i></div>
              </span>
              <input 
                className= {classNames("form-control pl-0 pt-0",
                  {'border-left-0': !this.state.validationErrors.confirmPassword,
                  'is-invalid': !!this.state.validationErrors.confirmPassword})}
                type="password" 
                name="confirmPassword" 
                placeholder="Подтвердите пароль"
                onChange={this.changeField}
                value={this.confirmPassword}/>
              {this.state.validationErrors.confirmPassword &&
                <div className="invalid-feedback">
                  {this.state.validationErrors.confirmPassword}
                </div>
              }
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block" 
          disabled={this.props.auth.loading}>Зарегистрироваться</button>
        </form>
      </section>
    )
  }

  componentDidMount(){
    this.firstInput.focus(); 
  }

  componentWillUnmount() {
    this.props.clearError();
  }
}

export default connect(
  state => ({auth: state.auth}),
  dispatch => ({
    signin: form => dispatch(signup(form)),
    clearError: () => dispatch({type: 'CLEAR_ERROR'})
  })
)(Login);