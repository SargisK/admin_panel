import React, {Component} from 'react';
import { withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = {

} 

class Registration extends Component {
    state = {
      users: [],
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      email: '',
      errors: {
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        email: '' 
      }   
    } 

    handleClose = () => {
      this.setState({
        openDialog: false, 
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        email: '',
        errors: {
          firstName: '',
          lastName: '',
          password: '',
          confirmPassword: '',
          email: '' 
        } 
      })

      this.props.handleClose()
    }
      handleValidationForm = () => {
        
        let errors = {};
        let regLetters = /^[A-Za-z]+$/; 
        let regLength = /^.{6,}$/; 
        let regEmail = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/;

        let firstName = this.state.firstName.trim()
        let lastName = this.state.lastName.trim()
        let password = this.state.password.trim()
        let confirmPassword = this.state.confirmPassword.trim()
        let email = this.state.email.trim()

        if (!firstName) { errors.firstName = 'This field must be filled!'; }
        else if (!regLetters.test(this.state.firstName.trim())) errors.firstName= 'You can only use letters of the Latin alphabet!';
        
        if (!lastName) { errors.lastName = 'This field must be filled!';}
        else if (!regLetters.test(lastName)) { errors.lastName = 'You can only use letters of the Latin alphabet!';}
        
        if (!password) { errors.password = 'This field must be filled!';}
        else if (!regLength.test(password)) {  errors.password = 'password must be at least 6 characters!';}
        
        if (!confirmPassword) {  errors.confirmPassword = 'This field must be filled!';}
        else if (password !== confirmPassword) { errors.confirmPassword = 'Passwords do not match!';}

        if (!email) { errors.email = 'This field must be filled!';}
        else if (!regEmail.test(email)) { errors.email = 'Invalid e-mail!';}
      
        this.setState({ errors});
        if (Object.keys(errors).length !== 0)  return false;
        else {

          let formData = {
            firstName: firstName,
            lastName: lastName, 
            password: password, 
            email: email, 
          }
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/registration', true);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            var self = this;
            xhr.onreadystatechange = function() {
              if (this.readyState !== 4) return;  

              let response = JSON.parse(xhr.responseText);
              
              if (xhr.status !== 200) {
              
              self.setState({             
                  openDialog: true, 
                  firstName: '',
                  lastName: '',
                  password: '',
                  confirmPassword: '',
                  email: '',
                  errors: {
                    firstName: '',
                    lastName: '',
                    password: '',
                    confirmPassword: '',
                    email: response.message 
                  } 
                }); 
                      
              } else {
                  self.handleClose()
              }
            }         
            xhr.send(JSON.stringify(formData));
        }
    }


  render() {
    let {classes} = this.props;

    return (

        <Dialog
            open={this.props.openDialog}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Registration</DialogTitle>         
            <DialogContent>
              <DialogContentText>
                Please enter your registration details corresponding fields.
              </DialogContentText>
              <form name='userForm' >                        
                <TextField
                  autoFocus
                  required
                  error={!!this.state.errors.firstName}
                  helperText={this.state.errors.firstName}
                  id="firstName"
                  name="firstName"
                  label="First name"
                  placeholder="First name"  
                  className={classes.textField}           
                  margin="normal"
                  onChange={(event) => {
                    this.setState({firstName: event.target.value})
                  }}
                  fullWidth
                />
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  placeholder="Last name"    
                  className={classes.textField}  
                  onChange={(event) => {this.setState({lastName: event.target.value})}}       
                  margin="normal"
                  error={!!this.state.errors.lastName}
                  helperText={this.state.errors.lastName}
                  fullWidth
                />
                <TextField
                  id="password"
                  label="Password"
                  name='password'
                  className={classes.textField}
                  type="password"
                  autoComplete="current-password"
                  onChange={(event) => {this.setState({password: event.target.value })}}
                  margin="normal"
                  error={!!this.state.errors.password}
                  helperText={this.state.errors.password}
                  fullWidth
                />
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm password"
                  className={classes.textField}
                  type="password"
                  autoComplete="current-password"
                  onChange={(event) => {this.setState({confirmPassword: event.target.value})}}
                  margin="normal"
                  error={!!this.state.errors.confirmPassword}
                  helperText={this.state.errors.confirmPassword}
                  fullWidth
                />
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email Address"
                  className={classes.textField}
                  type="email"
                  onChange={(event) => {this.setState({email: event.target.value})}}
                  margin="normal"
                  error={!!this.state.errors.email}
                  helperText={this.state.errors.email}
                  fullWidth
                />                     
            </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleValidationForm.bind(this)}  color="primary">
                Send
              </Button>
            </DialogActions>
          </Dialog>  

    )
  }
}
export default withStyles(styles)(Registration);