import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem'; 

// Double destructuring here. We get getProfiles and profile
// from props and then we only need to get profiles & loading
// from the whole profile state
const Profiles = ({ getProfiles, profile: { profiles, loading }})  => {

  // We need to load all the profiles just once when this component
  // is first mounted
  // we specify getProfiles in the second argument array to get a warning 
  // about a dependency
  useEffect(() => {
    getProfiles(); 
  }, [getProfiles]); 

  return (
    <Fragment>
      { loading ? 
	  <Spinner /> :
          <Fragment> 
            <h1 className="large text-primary">Developers</h1>
	    <p className="lead">
 	      <i className="fab fa-connectdevelop"></i>
	      Browse and connect with Developers
	    </p>
	    <div className="profiles">
	      {profiles.length > 0 ? (
		 profiles.map(profile => (
		   <ProfileItem key={profile._id} profile={profile} />
		 ))
		) : <h4>No profiles found...</h4> }
	    </div>
	   </Fragment>
       }
    </Fragment>
  );
} 

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}; 

const mapStateToProps = state => ({
  profile: state.profile
}); 

export default connect(mapStateToProps, { getProfiles })(Profiles);

