import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import AddIcon from 'material-ui/svg-icons/content/add';
import RequiredMark from 'components/RequiredMark';

export default class AddUser extends React.Component {
  state = {
    isOpen: false,
    firstName: '',
    lastName: '',
    department: '',
  };

  handleOpen = () => {
    this.setState({isOpen: true});
  };

  handleClose = () => {
    this.setState({isOpen: false});
  };

  handleAdd = () => {
    const {onAdd} = this.props;
    const {firstName, lastName, department} = this.state;

    onAdd && onAdd(firstName, lastName, department);
    this.setState({
      isOpen: false,
      firstName: '',
      lastName: '',
      department: '',
    });
  };

  handleFirstNameChange = ev => {
    this.setState({firstName: ev.target.value});
  };

  handleLastNameChange = ev => {
    this.setState({lastName: ev.target.value});
  };

  handleDepartmentChange = ev => {
    this.setState({department: ev.target.value});
  };

  render() {
    const {style, getErrors} = this.props;
    const {firstName, lastName, department, isOpen} = this.state;

    const actions = [
      <FlatButton
        key="cancel"
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        key="add"
        label="Add"
        primary
        disabled={!!getErrors && !!getErrors(firstName, lastName)}
        onTouchTap={this.handleAdd}
      />,
    ];

    return (
      <div style={style}>
        <FloatingActionButton onTouchTap={this.handleOpen}>
          <AddIcon />
        </FloatingActionButton>
        <Dialog
          title="Add user"
          actions={actions}
          modal={false}
          open={isOpen}
          onRequestClose={this.handleClose}
        >
          <TextField
            key="firstName"
            floatingLabelText={
              <span>First name <RequiredMark /></span>
            }
            value={firstName}
            fullWidth
            keyboardFocused
            onChange={this.handleFirstNameChange}
          />
          <TextField
            key="lastName"
            floatingLabelText={
              <span>Last name <RequiredMark /></span>
            }
            value={lastName}
            fullWidth
            onChange={this.handleLastNameChange}
          />
          <TextField
            key="department"
            floatingLabelText="department"
            value={department}
            fullWidth
            onChange={this.handleDepartmentChange}
          />
        </Dialog>
      </div>
    );
  }
}
