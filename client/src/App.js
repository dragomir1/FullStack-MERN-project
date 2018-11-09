import React, { Component } from 'react';
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { connect, Provider } from 'react-redux';
import store from './store/store';
import { Route, BrowserRouter } from 'react-router-dom';
import './App.css';



class App extends Component {

  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
          <div className="App">
              <Navbar />
              <Route exact path="/" component={Landing} />
              <div className="container">
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </div>
              <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
