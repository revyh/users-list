import {connect} from 'react-redux';
import {defaultMemoize} from 'reselect';
import {actions, selectors} from 'features/users';
import Presentational from 'components/AddUser';

const getErrors = defaultMemoize(selectors.getAddUsersErrors);

function mapDispatchToProps(dispatch) {
  return {
    getErrors,
    onAdd: (...args) => dispatch(actions.addUser(...args)),
  };
}

export default connect(null, mapDispatchToProps)(Presentational);
