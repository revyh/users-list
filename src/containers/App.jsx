import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Menu from 'components/Menu';
import Home from 'components/Home';
import UsersList from 'containers/UsersList';
import AddUser from 'components/AddUser';

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'stretch',
  minHeight: '100vh',
};

const listStyles = {
  minWidth: '350px',
};

const menuLinks = [
  {route: '/', name: 'Home'},
  {route: '/list', name: 'List'},
];

const addUserStyles = {
  position: 'fixed',
  bottom: '30px',
  right: '30px',
};

function List() {
  return (
    <div style={listStyles}>
      <h2 style={{fontWeight: 'normal'}}>Users list</h2>
      <UsersList />
      <AddUser style={addUserStyles} />
    </div>
  );
}

export default function App() {
  return (
    <div style={styles}>
      <Menu links={menuLinks} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/list" component={List} />
      </Switch>
    </div>
  );
}
