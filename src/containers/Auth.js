import { connect } from 'react-redux';
import Login from '../components/Login';
import { authenticate } from '../actions';

/**
 * Auth Container:
 * Handles Login Component
 */

const mapDispatchToProps = dispatch => {
  return {
    authenticate(e) {
      e && e.preventDefault();
      dispatch(authenticate());
    }
  };
};

export default connect(null, mapDispatchToProps)(Login);
