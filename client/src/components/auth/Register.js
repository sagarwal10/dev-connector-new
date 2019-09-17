import React, {Fragment, useState} from 'react';
// connects component to react
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'; 

// Basic Register Component
// const Register = () => {
//   return <div>Register</div>
// }

// Functional component with react hooks (instead of a class thus avoiding this binding)
// https://reactjs.org/docs/hooks-intro.html
//
// setAlert is a property being based in as a parameter and is being destructured
// from props. Otherwise it would look like the following 
// const Register = (props) => {
// and we would be calling props.setAlert
const Register = ({ setAlert, register}) => {
  // formData is current state, setFormData is used to change state
  // arguments to useState (which is a react hook) is initial state
  // syntax is array destructuring - can call useState multiple times
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  // pull out values using destructuring from current state
  const { name, email, password, password2 } = formData;

  // ...formData is spread operator and copies data
  // [] is a ES6 syntax that copies event target parameter change into string
  const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});
  const onSubmit = async e => {
    e.preventDefault();

    // using react hooks lets us use password directly instead of binding 
    // this.state.password
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger', 5000);
    } else {
      register({name, email, password});
    }
  }; 

  return (
    // A common pattern in React is for a component to return multiple elements. 
    // Fragments let you group a list of children without adding extra nodes to the DOM.
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}> 
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" 
           value={name} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" 
           value={email} onChange={e => onChange(e)} required />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password} onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2} onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
}; 

// connect takes in two things
// 1. Any state you want to map - in this case is null
// 2. An object with any actions you want to use - allows
//    us to use prop.setAlerts
export default connect(null, { setAlert, register})(Register);
