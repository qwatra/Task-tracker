import React, {Component} from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout } from '../actions/user';

class App extends Component {
  render() {
    return (
      <div>
        <header>
            <nav className="navbar navbar-expand navbar-light bg-light">
                <span className="navbar-brand mb-0 h1">Task Tracker</span>
                <div className="navbar-nav ml-auto">
                  {this.props.auth.user && 
                    <button className="btn btn-info" onClick={this.signout}>Выйти</button> ||
                    [<NavLink key="login" className="nav-item nav-link" to="/login" activeClassName="active">Войти</NavLink>,
                    <NavLink key="logout" className="nav-item nav-link" to="/registration" activeClassName="active">Зарегистрироваться</NavLink>]
                  }
                </div>
            </nav>
        </header>
        <main className="app-main containr">
          {this.props.children}
        </main>
      </div>
    )
  }

  signout = () => {
    this.props.signout();
  } 
}

export default withRouter(connect(
  state => ({auth: state.auth}),
  dispatch => ({
    signout: () => dispatch(signout())
  })
)(App));