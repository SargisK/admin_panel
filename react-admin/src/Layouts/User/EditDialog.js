import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  button: {
    margin: '15px 15px'
  }
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class EditDialog extends Component {

  state = {
    handleUpdateUser: this.props.handleUpdateUser,
    handleClose: this.props.handleClose,
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    password: '',
    confirmPassword: '',
    email:  this.props.user.email,
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
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      password: '',
      confirmPassword: '',
      email:  this.props.user.email,
      errors: {
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        email: '' 
      }   
    });

    this.props.handleClose()
  } 

  handleUpdateUserData = () => {

      let errors = {};
      let regLetters = /^[A-Za-z]+$/; 
      let regLength = /^.{6,}$/; 
      let regEmail = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/;

      let firstName = this.state.firstName.trim()
      let lastName = this.state.lastName.trim()
      let password = this.state.password.trim()
      let confirmPassword = this.state.confirmPassword.trim()
      let email = this.state.email.trim()
      let id = this.props.user._id

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
          _id: id,
          firstName: firstName,
          lastName: lastName, 
          password: password, 
          email: email, 
        }
          
          var xhr = new XMLHttpRequest();
          xhr.open('POST', '/userUpdate', true);
          xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
          let self = this;
          xhr.onreadystatechange = function() {
            if (xhr.status !== 200) {
              let response = JSON.parse(xhr.responseText)
              self.setState({             
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
              self.setState({             
               firstName: self.props.user.firstName,
               lastName: self.props.user.lastName,
               password: '',
               confirmPassword: '',
               email:  self.props.user.email,
               errors: {
                 firstName: '',
                 lastName: '',
                 password: '',
                 confirmPassword: '',
                 email: ''   
               }   
             }, () => {
                self.state.handleUpdateUser()
                self.state.handleClose() 
                if (self.props.userId === id) self.props.updateUser(formData);
                
             });                      
            }
          }
          xhr.send(JSON.stringify(formData));  
         
          }               
      }
  

  render() { 
    var { classes, editDialogOpen, user} = this.props;

    return (
      <div>
        <Dialog
          fullScreen
          open={editDialogOpen}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Edit user data
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid container justify='center' >
            <Grid item xs={8}> 
              <form name='userForm' >                        
                <Grid>
                  <TextField
                    required
                    defaultValue={user.firstName}
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
                    defaultValue={user.lastName}
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
                    required
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
                    required
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
                    defaultValue={user.email}
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
                </Grid> 
                <Grid container justify='flex-end'>
                  <Button onClick={this.handleUpdateUserData} className={classes.button} variant="contained" color="primary" >
                    Save
                  </Button>
                </Grid>                    
              </form> 
            </Grid>          
          </Grid>
        </Dialog>
      </div>
    ); 
  }
}

export default withStyles(styles)(EditDialog)