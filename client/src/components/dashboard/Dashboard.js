import React, { useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

// Destructure fields from props
const Dashboard = ({getCurrentProfile, auth, profile }) => {

  // We want to get the users profile as soon as this component is loaded. 
  // Since this is a functional component, we have to use hooks to emulate
  // componentDidMount
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return <div>Dashboard</div>;
} 

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}
 
const mapStateToProps = state => ({
   auth: state.auth,
   profile: state.profile
})
 
export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);

