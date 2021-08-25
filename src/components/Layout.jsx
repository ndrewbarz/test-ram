import React from 'react';
import { AppBar, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../ram.png';

const useStyles = makeStyles({
  logo: {
    width: '150px',
    alignSelf: 'flex-start',
  },
  appBar: {
    // marginTop: '30px',
    display: 'flex',
    justifyContent: 'space-evenly',
    height: '70px',
  },
  header: {
    height: '30px',
    padding: '0px 0px 10px 0',
    background: '#4EADC5',
    marginBottom: '30px',
  },
  menu: {
    display: 'flex',
    maxWidth: '500px',
    width: '100%',
    color: '#4EADC5',
    background: '#fff',
    padding: '0',
    marginTop: '20px',
    fontWeight: 'bold',
  },
  menuItem: {
    textAlign: 'center',
    // justifySelf: 'flex-end',
  },
  active: {
    background: '#4EADC5',
    color: '#fff',
    fontWeight: 'bolder',
    '&:hover': {
      background: '#4EADC5',
    },
  },
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    { text: 'Create', path: '/' },
    { text: 'History', path: '/history' },
  ];
  return (
    <div>
      <div className={classes.appBar}>
        <img src={logo} className={classes.logo} alt='Rick and Morty' />
        <List className={classes.menu}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemText primary={item.text} className={classes.menuItem} />
            </ListItem>
          ))}
        </List>
      </div>
      <AppBar position='static' className={classes.header}></AppBar>
      {children}
    </div>
  );
};

export default Layout;
