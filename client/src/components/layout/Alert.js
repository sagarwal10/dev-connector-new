import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Destructure alerts array from props
const Alert = ({ alerts }) => alerts !== null &&
  alerts.length > 0 && alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
));
    

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
} 

const mapStateToProps = state => ({
  alerts: state.alert
}); 

// First argument is properties, second argument is actions (nothing 
// in this case)
export default connect(mapStateToProps)(Alert);

