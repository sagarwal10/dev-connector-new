import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert'; 

// Redux 
import { Provider } from 'react-redux'; 
import store from './store'; 
import { loadUser } from './actions/auth'; 

import setAuthToken from './utils/setAuthToken'; 
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
} 

const App = () => {

   // App is a classless component. However we need to call
   // load user every time ComponentDidMount which is a lifecycle
   // method. So useEffect is a react hook that will allow us to 
   // do this inside a functional/classless component
   // Second empty argument array is to only invoke useEffect once
   // otherwise it will keep getting called. Effect is one of ComponentDidMount
   // https://reactjs.org/docs/hooks-effect.html
   useEffect(() => {
     store.dispatch(loadUser());
   }, []); 

   return(
   // By putting Provider at top all components can access the state
   <Provider store={store}>
   <Router>
     <Fragment>
       <Navbar />
       <Route exact path="/" component={Landing} />
       <section className="container">
         <Alert />
         <Switch>
           <Route exact path="/register" component={Register} /> 
           <Route exact path="/login" component={Login} />
         </Switch>
       </section> 
     </Fragment>
   </Router>
   </Provider>);
}

export default App;
