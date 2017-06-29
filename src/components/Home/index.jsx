import React from 'react';

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '2em',
};

export default function Home() {
  return <div style={styles}>Welcome to users list app</div>;
}
