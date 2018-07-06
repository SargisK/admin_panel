import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import deepOrange from '@material-ui/core/colors/deepOrange';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {blueGrey, indigo} from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import EditDialog from './EditDialog';

const styles = {
  root: {
    padding: 5
  },
  content: {
    marginTop: 50,
   
  },
  paperRoot: {
    width: '100%',
  },
  title: {
    margin: 10,
    fontSize: '30px',
  },
  orange: {
    backgroundColor: deepOrange[500],
  },
  lightBlueGrey: {
    color: indigo[200]
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: indigo[500],
    textTransform: 'uppercase'
  },
  fabButton: {
    margin: 10, 
  },
  textCenter: {
    textAlign: 'center', 
    padding: '10px 0'
  },
  avatar: {
    width: 50,
    height: 50,
    margin: 'auto',
  },
  tableHead: {
    backgroundColor: blueGrey[900],
    color: blueGrey[200]
  }
}

export default  withStyles(styles)(class User extends Component {

  componentDidMount() {
   var xhr = new XMLHttpRequest();
    xhr.open('GET', '/users', false);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send()
    this.setState({users: JSON.parse(xhr.responseText)}) 
  }

  componentDidUpdate(nextProps, nextState, nextContext) {

    if (this.state.userUpdate) {
      fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({users}))
      this.setState({
        userUpdate: false
      })
    }
  }

  state = {
    userUpdate: false,
    users: [],
    num: 0,
    openDialog: false, 
    editDialogOpen: false, 
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

  handleDialogOpen = () => {
    this.setState({ openDialog: true });
  };

  handleDialogClose = () => {  
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
  };

  handleEditDialogOpen = (num) => {
    
    this.setState({
      num: num,
      editDialogOpen: true,
     
    })
  }

  handleEditDialogClose = () => {
    this.setState({
      editDialogOpen: false,
    })
  }

  handleUpdateUser = () => {
    this.setState({
      userUpdate: true
    })
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
            self.setState({userUpdate: true})
              self.handleDialogClose()
           }
          }         
          xhr.send(JSON.stringify(formData));
      }
  }

  handleDeleteUser(userId) {

      let xhr = new XMLHttpRequest();
      xhr.open('POST', '/userdelete', true);
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      let self = this;
      xhr.onreadystatechange = function() {
        if (this.readyState !== 4) return;        
          self.setState({userUpdate: true});  
      }     
      xhr.send(JSON.stringify({id: userId}));       
  } 

  render() {
    const users = this.state.users;
    const {classes} = this.props;
    const {openDialog} = this.state;
    const id = this.props.userId
    return (
      
      <Grid direction='column' className={classes.content}  container>
          <Paper className={classes.paperRoot}>
            <Grid justify='space-between'  direction='row' container>           
                <Typography className={classes.title} color='primary' variant="title" component="h3">
                  Users List
                </Typography>          
                <Tooltip  id="tooltip-fab"  title="Add">
                  <Button onClick={this.handleDialogOpen} variant="fab" color='secondary' className={classNames(classes.fabButton)} aria-label="Add" >
                    <AddIcon />
                  </Button>            
                </Tooltip> 
                <Dialog
                    open={openDialog}
                    onClose={this.handleDialogClose}
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
                      <Button onClick={this.handleDialogClose.bind(this)} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={this.handleValidationForm.bind(this)}  color="primary">
                        Send
                      </Button>
                    </DialogActions>
                  </Dialog>  
            </Grid>  
            <Grid>
            <Table className={classes.table}>
                <TableHead>
                  <TableRow className={classes.tableHead}>
                    <TableCell className={classNames(classes.textCenter, classes.lightBlueGrey)}  >Image</TableCell>
                    <TableCell className={classNames(classes.textCenter, classes.lightBlueGrey)} >Name</TableCell>
                    <TableCell className={classNames(classes.textCenter, classes.lightBlueGrey)} >Last Name</TableCell>
                    <TableCell className={classNames(classes.textCenter, classes.lightBlueGrey)} >E-mail</TableCell>    
                    <TableCell className={classNames(classes.textCenter, classes.lightBlueGrey)} >Edit data</TableCell>  
                    <TableCell className={classNames(classes.textCenter, classes.lightBlueGrey)}>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>                
                  {
                 users.map((user, i) => {
                                    
                   return <TableRow key={user._id} className={classes.textCenter} >
                      <TableCell className={classes.textCenter} >              
                        <Avatar className={classNames(classes.avatar, classes.purpleAvatar)}>{user['firstName'][0]+user['lastName'][0] }</Avatar>                  
                      </TableCell>
                      <TableCell className={classes.textCenter} >{user['firstName']}</TableCell>
                      <TableCell className={classes.textCenter} >{user.lastName}</TableCell>
                      <TableCell className={classes.textCenter} >{user['email']}</TableCell>
                      <TableCell className={classes.textCenter} >
                        <IconButton onClick={this.handleEditDialogOpen.bind(this, i)} className={classes.button} aria-label="Edit">
                          <Edit />
                        </IconButton>
                        
                      </TableCell>
                      <TableCell className={classes.textCenter} >
                        <IconButton onClick={this.handleDeleteUser.bind(this, user._id)} className={classes.button} aria-label="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  })}
                 
                </TableBody>
                
              </Table>
                  
             {this.state.editDialogOpen && <EditDialog userId={id} updateUser={this.props.regUserUpdate} handleUpdateUser={this.handleUpdateUser.bind(this)}  handleClose={this.handleEditDialogClose.bind(this)} editDialogOpen={this.state.editDialogOpen} user={users[this.state.num]} />}
            </Grid>         
          </Paper>
      </Grid>
    )
  }

}) 