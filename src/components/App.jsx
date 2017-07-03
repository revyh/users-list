import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Menu from 'components/Menu';
import Home from 'components/Home';
import UsersList from 'components/UsersList';

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

const users = [];
for (let i = 0; i < 30; i++)
  users.push({
    id: `user${i}`,
    firstName: 'John',
    lastName: 'Doe',
    department: 'some department',
  });

function List() {
  return (
    <div style={listStyles}>
      <h2 style={{fontWeight: 'normal'}}>Users list</h2>
      <UsersList users={users} order="ascending" />
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
