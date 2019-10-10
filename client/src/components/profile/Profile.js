import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById} from '../../actions/profile';

// get profile by user id which is passed in as part of URL
// in order to get id from URL, we parse props.param
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/match.md

const Profile = ({ getProfileById, 
		   profile: { profile, loading }, 
                   auth,
                   match 
		 })  => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById]); 

  return (
    <Fragment>
      { profile === null || loading ? 
	<Spinner /> :
	<Fragment>
          <Link to='/profiles' className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated && auth.loading === false && 
	   auth.user._id === profile.user._id && 
           (<Link to='/edit-profile' className='btn btn-dark'>
            Edit Profile
            </Link>)
          }
        </Fragment>
      } 
    </Fragment>
  );
} 

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
} 

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, { getProfileById})(Profile);

