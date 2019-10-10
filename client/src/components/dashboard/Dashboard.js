import React, { Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner'; 
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import DashboardActions from './DashboardActions'; 
import Experience from './Experience'; 
import Education from './Education'; 

// Destructure fields from props
// Destructure profile loading & profile data from profile state object
const Dashboard = ({getCurrentProfile, deleteAccount,
		    auth: {user}, profile: {profile, loading }}) => {

  // We want to get the users profile as soon as this component is loaded. 
  // Since this is a functional component, we have to use hooks to emulate
  // componentDidMount
  // in the second argument we specify getCurrentProfile again as a dependency
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  
  // If the profile is still loading from the server then display a spinner
  return loading && profile === null ? 
		<Spinner /> :
		<Fragment>
		  <h1 className="large text-primary">Dashboard</h1>
		  <p className="lead">
		  <i className="fas fa-user"></i>Welcome { user && user.name } 
		  </p>
		  {profile !== null ? (<Fragment>
					 <DashboardActions />
					 <Experience experience={profile.experience} />
					 <Education education={profile.education} />
					 
					 <div className="my=2">
  					   <button className="btn btn-danger" 
					      onClick={()=>deleteAccount()} >
					   <i className="fas fa-user-mine"></i>Delete My Account
					   </button>
					 </div>
		   		         </Fragment>) :
				      (<Fragment>
				       <p>You have not yet setup a profile.
					  Please add some info</p>
				       <Link to='/create-profile'
					     className='btn btn-primary my-1'>
			               Create Profile
				       </Link>
				       </Fragment>)};
		</Fragment>;
			
} 

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}
 
const mapStateToProps = state => ({
   auth: state.auth,
   profile: state.profile
})
 
export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);

