import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

// Experience is passed in. Use destructuring to get at the 
// fields we care about
const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description }
  }) => {
    return (
      <div>
        <h3 className='text-dark'>{company}</h3>
        <p>
          <Moment format='YYYY/MM/DD'>{from}</Moment> - {' '}
          {!to ? 'Now': <Moment format='YYYY/MM/DD'>{to}</Moment>}
        </p>
        <p> 
          <strong>Position: </strong>{title}
        </p>
        <p> 
          <strong>Description: </strong>{title}
        </p>
      </div>
    );
}

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired
};

export default ProfileExperience; 

