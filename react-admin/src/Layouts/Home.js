import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Dashboard from '@material-ui/icons/Dashboard'
import Pageview from '@material-ui/icons/Pageview'
import ArrowRight from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {indigo, blueGrey, deepOrange}  from '@material-ui/core/colors';
import menu from '../data.js'
import User from './User/index'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: blueGrey[500]
  },
  appFrame: {
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    'overflow-x': 'hidden',
    flexGrow: 1,
    position: 'fixed',
    backgroundColor: indigo[500]
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  avatar: {
    flexGrow: 1
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
    textTransform: 'uppercase'
  },
  orange: {
    color: deepOrange[500],
  },
  indigo: {
    color: indigo[300],
  },
  blueGrey: {
    color: blueGrey[50],
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    backgroundColor: blueGrey[900],
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: blueGrey[50],
    padding: theme.spacing.unit * 3,
  },

  contentShift: {
    marginLeft: -drawerWidth,
  },

  listItem: {   
    backgroundColor: blueGrey[900],
    '&:hover': {
      backgroundColor: indigo[100],
      color: indigo[100]    
    },
    '&:hover div p': {
      color: indigo[900]     
    },
    '&:hover svg': {
      color: indigo[800]
    } 
  },

  listText: {
    color: indigo[200]
  }
  
});

class Home extends PureComponent {

  state = {
    open: true,
    anchorEl: null,
    user: this.props.user
  };

  updateUser = (user) => {
    this.setState({user:  user});
  }

  handleOpenToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleClickIconLog = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClickIconClose = () => {
    this.setState({ anchorEl: null });
  };
  
  render() {

    const {classes} = this.props;
    const {open, anchorEl, user} = this.state;

    return (
      <div className={classes.root} >
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,

            })}
          >
            <Toolbar disableGutters={!open}>
           
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleOpenToggle}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
             
              <Typography variant="title" color="inherit" style={{flex: 1}} noWrap>
                Admin Panel
              </Typography>
              <Typography variant="caption" color="inherit" style={{textTransform:'capitalize'}}>
                {user.firstName +' '+ user.lastName}
              </Typography>
              <Avatar className={classes.orangeAvatar}>{user.firstName[0] + user.lastName[0]}</Avatar> 
              <div>
                <IconButton
                  aria-owns={anchorEl ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleClickIconLog}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="fade-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClickIconClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={this.props.onLogout}>Logout</MenuItem>
                </Menu>
              </div> 
             
            </Toolbar> 
          </AppBar>
          <Drawer style={{backgroundColor: blueGrey[50]}}
            variant="persistent"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
              <div className={classes.drawerHeader}>
                <IconButton className={classes.indigo} onClick={this.handleOpenToggle}>
                  <ChevronLeftIcon  />
                </IconButton>
              </div>
              <Divider style={{backgroundColor: indigo[300]}}/>
              
              <List  component="nav">
              {menu['menuContent'].map(function(item, i) {
               
              let icon = (item === 'Dashboard') ? <Dashboard /> : <Pageview />; 
          
                return  <ListItem className={classes.listItem}  component='a' href='#' button key={i}>
                          <ListItemIcon className={classes.indigo} >
                            {icon}
                          </ListItemIcon>
                          <ListItemText    primary={
                            <Typography className={classes.listText}>
                              {item}
                            </Typography>}           
                          />                                             
                        </ListItem>
                        
                })}
              </List>
              <Divider style={{backgroundColor: indigo[300]}}/>
              <List>
                {menu.menuContent2.map(function(item, i) {
                  return <ListItem className={classes.listItem} component='a' href='#' key={i} button>
                            <ListItemIcon className={classes.indigo} >
                              < ArrowRight />
                            </ListItemIcon>
                          
                            <ListItemText  primary={
                              <Typography  className={classes.listText}>
                                {item}
                              </Typography>
                            } />
                                                    
                          </ListItem> 
                        })}
              </List>
          </Drawer>
          <main 
            className={classNames(classes.content, {
              [classes.contentShift]: !open   
            })}
          >
             <User userId={user._id}  regUserUpdate={this.updateUser.bind(this)} /> 
          </main>

        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

 export default withStyles(styles, { withTheme: true })(Home)
