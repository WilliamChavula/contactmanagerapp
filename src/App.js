import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Provider} from './context';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Contacts from './components/Contacts';
import AddContact from './components/AddContact';
import Header from './components/Header';
import About from './pages/About';
import EditContact from './components/EditContact';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <Provider>
      <Router>
        <div className="App">
          <Header branding = "Contact Manager"/>
          <div className="container">

            <Switch>
              <Route exact path="/" component={Contacts} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact/add" component={AddContact} />
              <Route exact path="/edit-user/:userId" component={EditContact} />
              <Route component={PageNotFound} />
            </Switch>
            {/* 
            <AddContact /> */}
          </div>
        </div>
      </Router>
    </Provider>
    
  );
}

export default App;
