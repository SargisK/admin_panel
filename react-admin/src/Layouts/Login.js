import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import indigo from '@material-ui/core/colors/indigo';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText'
import Typography from '@material-ui/core/Typography';

const styles={
  root: {
    backgroundColor:indigo[50], 
    flexGrow: 1     
  },
  login: {
    background: `linear-gradient(to top, ${indigo[900]},  ${indigo[100]})`,
    width: 400,
    height: 300,
    padding: '20px 40px 0 40px',
    borderRadius: 10,
    position: 'absolute',
    top: 'calc(50% - 150px)'
  },
  button: {
    margin: '15px 15px'
  }

}

class Login extends Component {
  
  state = {
    email: '',
    password: '',
    errors: {
      email: '',
      password: ''
    }
  }

  clearForm() {
    this.setState({
      email: '',
      password: '',
      errors: {
        email: '',
        password: ''
      }  
    })
  }

  sendForm() {

    let email = this.state.email;
    let password = this.state.password;
    let errors = {};
    let formData = {};
    let regLength = /^.{6,}$/; 
    let regEmail = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/;
    let user = null;

    if (!password) { errors.password = 'This field must be filled!';}
    else if (!regLength.test(password)) {  errors.password = 'password must be at least 6 characters!';}

    if (!email) { errors.email = 'This field must be filled!';}
    else if (!regEmail.test(email)) { errors.email = 'Invalid e-mail!';}


    if (!!Object.keys(errors).length) {
      this.setState({
        errors: {
          email: errors.email,
          password: errors.password
        }
      })
      return false     
    }  
    else {  
        formData.email = email;
        formData.password = password;
        let self = this;
        
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/authorization', true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.onreadystatechange = function() {
          if (this.readyState !== 4) return
          else {
            let response = JSON.parse(xhr.responseText);
            if(xhr.status !== 200) {
              self.setState({
                errors: {
                  email: '',
                  password: response.message
                } 
              })
            } else {
              
              self.setState({
                errors: {
                  email: '',
                  password: ''
                } 
              })

              user = response.user;

              self.props.onLogin({
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName
              })  
            }            
          }
        }     
         
        xhr.send(JSON.stringify(formData));
    }      
  }
  
  render() {
    const {classes} = this.props;

    return <div className={classes.root}>
      <Grid justify='center' container sm={12} className={classes.root}>
        <Paper  className={classes.login}>
          <form method='post'>
            <div style={{marginBottom: 40}}>
              <Typography color='primary' variant="title" gutterBottom>
               Sign in
              </Typography>
              <Typography variant="caption" gutterBottom>
                Please enter your email and password
              </Typography>
            </div>
            
            <FormControl className={classes.margin}  fullWidth>
              <InputLabel htmlFor="custom-css-input" >           
                  E - mail
              </InputLabel>               
              <Input  
                value={this.state.email} 
                autoFocus          
                id="em"
                name='email'
                onChange = {(event) => {this.setState({email: event.target.value})}}
               
              /> 
              <FormHelperText error id="name-helper-text">{this.state.errors.email}</FormHelperText>
            </FormControl>  
            <br />   
            <FormControl className={classes.margin} fullWidth>
              <InputLabel htmlFor="email" >             
                password
              </InputLabel>
              <Input  
                value={this.state.password}              
                type='password'           
                id="password"
                name='password'
                onChange={(event) => {this.setState({password: event.target.value})}}
                fullWidth
              /> 
              
              <FormHelperText error={true} id="name-helper-text">{this.state.errors.password}</FormHelperText>
            </FormControl>  
            <Grid container justify='flex-end'>
              <Button onClick={this.sendForm.bind(this)} className={classes.button} variant="contained" color="primary" >
                Send
              </Button>
              <Button onClick={this.clearForm.bind(this)}  className={classes.button} variant="contained" color="secondary" >
                Cancel
              </Button>
            </Grid>
            
          </form>
        </Paper>
      </Grid>
    </div>
  }
}

export default withStyles(styles)(Login);