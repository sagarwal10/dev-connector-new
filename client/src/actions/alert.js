import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  // generate a random id for the alert
  // npm install uuid before using
  const id = uuid.v4();

  // send an action/state change which will eventually cause the reducer to 
  // resolve a state change
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, 
                              payload: id }), timeout);
} 
