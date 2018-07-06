import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {Login, PrivateRoute, Home} from './Layouts';


 class App extends Component {

  
  componentWillMount() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/checkUser', false);
    xhr.withCredentials = true;
    xhr.send(null)
    
    if (xhr.status === 200) {
      let accessibleUser = JSON.parse(xhr.responseText);
      this.setState({user: accessibleUser});
    } else return
   
  }

  state={
    user: null
  }

  login = user => {
    this.setState({user}, () => this.props.history.push('/'));
  } 

  logout = () => {

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/logout', false);
    xhr.withCredentials = true;
    xhr.send(null)
    this.setState({user: null}, () => this.props.history.push('/login'));
  }
 
  render(){

    return(
        <div>
          <PrivateRoute exact path='/'  onLogout={this.logout.bind(this)} user={this.state.user} component={Home}/>
          <Route path='/login' render={() => <Login onLogin={this.login.bind(this)}/>} />
        </div>       
    )
  }
}

export default withRouter(App);