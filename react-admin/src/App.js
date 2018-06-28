import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {Login, PrivateRoute, Home} from './Layouts';


 class App extends Component {

  state={
    user: null
  }

  login = user => {
    this.setState({user}, () => this.props.history.push('/'));
  } 

  logout = () => {
    this.setState({user: null}, () => this.props.history.push('/login'));
  }

  render(){
    return(
        <div>
          <PrivateRoute exact path='/' onLogout={this.logout.bind(this)} user={this.state.user} component={Home}/>
          <Route path='/login' render={() => <Login onLogin={this.login.bind(this)}/>} />
        </div>       
    )
  }
}

export default withRouter(App);