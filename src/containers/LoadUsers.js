import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {actions, selectors} from 'features/users';
import {users as usersSelector} from 'features/selectors';
import Presentational from 'components/LoadData';

const USERS_URL = '/data.json';

const getLoadState = createSelector(
  usersSelector,
  selectors.getLoadState,
);

function mapStateToProps(state) {
  return {loadState: getLoadState(state)};
}

const mapDispatchToProps = {
  onLoad: actions.loadUsers.bind(null, USERS_URL),
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentational);
