import React from 'react';
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

const users = [];
for (let i = 0; i < 30; i++)
  users.push({
    id: `user${i}`,
    firstName: 'John',
    lastName: 'Doe',
    department: 'some department',
  });

export default function App() {
  return (
    <div style={styles}>
      <div style={listStyles}>
        <h2 style={{fontWeight: 'normal'}}>Users list</h2>
        <UsersList users={users} order="ascending" />
      </div>
    </div>
  );
}
