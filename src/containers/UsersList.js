import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {actions, selectors} from 'features/users';
import {users as usersSelector} from 'features/selectors';
import Presentational from 'components/UsersList';

const getProps = createStructuredSelector({
  users: selectors.getUsers,
  order: selectors.getOrder,
  isGrouped: selectors.getGrouping,
});

function mapStateToProps(state) {
  return getProps(usersSelector(state));
}

const mapDispatchToProps = {
  onOrderChange: actions.setUsersOrder,
  onGroupingChange: actions.setUsersGrouping,
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentational);
