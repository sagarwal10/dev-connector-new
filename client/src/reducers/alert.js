import { SET_ALERT, REMOVE_ALERT } from '../actions/types'; 

const initialState = [
  {
    id: 1,
    msg: 'Please log in',
    alertType: 'success'
  }
];

// Resolves incoming state change to new status quo state
export default function(state = initialState, action) {
   const { type, payload } = action;

   switch(type) {
     case SET_ALERT:
       // send an array of objects of different payloads of alerts
       // spread operator ... copies old state (i.e. all current alerts)
       // copy new payload (id, msg, alertType)
       return [...state, payload];
     case REMOVE_ALERT: 
       return state.filter(alert => alert.id !== payload);
     default: 
       return state;
   }
}
