import React from 'react';
import { Route, Redirect} from 'react-router-dom'; 
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// This is a component used to make routes like /dashboard can only
// be accessed if the user has been authenticated
// https://tylermcginnis.com/react-router-protected-routes-authentication/

// We get passed in a Component and other properties. Destructure the
// passed in properties. ...rest takes care of all the other parameters
const PrivateRoute = ({ component: Component, auth:{isAuthenticated, loading}, 
							...rest}) => (
  // If the user has not been authenticated then redirect them to login
  // otherwise render whatever component passed in 
  <Route {...rest} render={props => !isAuthenticated && !loading ?
			    (<Redirect to='/login' />):
			    (<Component {...props}/>) } />
)

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
} 

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute); 


