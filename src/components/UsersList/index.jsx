import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Toggle from 'material-ui/Toggle';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import SortIcon from 'material-ui/svg-icons/av/sort-by-alpha';
import ArrowUpwardIcon from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDownwardIcon from 'material-ui/svg-icons/navigation/arrow-downward';

const OrderIconMap = {
  none: SortIcon,
  ascending: ArrowUpwardIcon,
  descending: ArrowDownwardIcon,
};

const nextOrderMap = {
  none: 'ascending',
  ascending: 'descending',
  descending: 'none',
};

class UsersList extends React.Component {
  static defaultProps = {
    isGrouped: false,
    order: 'none',
  };

  handleGroupingChange = () => {
    const {isGrouped, onGroupingChange} = this.props;
    onGroupingChange && onGroupingChange(!isGrouped);
  };

  handleOrderChange = () => {
    const {order, onOrderChange} = this.props;
    onOrderChange && onOrderChange(nextOrderMap[order] || 'none');
  };

  renderUsers() {
    const {users, isGrouped} = this.props;

    return isGrouped
      ? Object.keys(users).reduce(
        (result, group) => {
          result.push(
            <Subheader key={group}>{group}</Subheader>,
            ...this.renderGroup(users[group]),
          );
          return result;
        },
        [],
      )
      : this.renderGroup(users);
  }

  renderGroup(group) {
    return group.map(
      ({id, firstName, lastName, department}) => (
        <ListItem
          key={id}
          primaryText={`${lastName} ${firstName}`}
          secondaryText={
            this.props.isGrouped
              ? null
              : department
          }
        />
      ),
    );
  }

  render() {
    const {order, isGrouped, muiTheme} = this.props;
    const OrderIcon = OrderIconMap[order] || SortIcon;

    return (
      <List style={{border: `1px solid ${muiTheme.palette.borderColor}`}}>
        <Subheader>Settings</Subheader>
        <ListItem
          key="grouping"
          primaryText="Group by department"
          rightToggle={<Toggle toggled={isGrouped} />}
          onTouchTap={this.handleGroupingChange}
        />
        <ListItem
          key="order"
          primaryText="Sort by name"
          rightIcon={<OrderIcon />}
          onTouchTap={this.handleOrderChange}
        />
        <Divider />
        {this.renderUsers()}
      </List>
    );
  }
}

export default muiThemeable()(UsersList);
