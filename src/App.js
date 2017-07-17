import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyAE32sOL06L1kXpBs9RRUjgcAUjrZxASzw',
      authDomain: 'manager-c7123.firebaseapp.com',
      databaseURL: 'https://manager-c7123.firebaseio.com',
      projectId: 'manager-c7123',
      storageBucket: 'manager-c7123.appspot.com',
      messagingSenderId: '197416259882'
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
