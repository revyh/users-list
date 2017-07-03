import React from 'react';
import {Link} from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';

const buttonStyles = {
  position: 'fixed',
  left: '5px',
  top: '5px',
};

export default class Menu extends React.Component {
  state = {
    isOpen: false,
  };

  handleMenu = isOpen => this.setState({isOpen});
  handleMenuClose = () => this.setState({isOpen: false});
  handleMenuToggle = () => this.setState({isOpen: !this.state.isOpen});

  render() {
    return (
      <div>
        <IconButton
          style={buttonStyles}
          tooltip="Open menu"
          onTouchTap={this.handleMenuToggle}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          docked={false}
          width={200}
          open={this.state.isOpen}
          onRequestChange={this.handleMenu}
        >
          {this.props.links.map(
            ({route, name: linkName}) => (
              <Link key={route} to={route} style={{textDecoration: 'none'}}>
                <MenuItem onTouchTap={this.handleMenuClose}>
                  {linkName}
                </MenuItem>
              </Link>
            ),
          )}
        </Drawer>
      </div>
    );
  }
}
