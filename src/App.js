import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppointmentsProvider from './appointments/AppointmentsProvider'

/**
 * Main application
 */
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <AppointmentsProvider/>
      </div>
    );
  }
}

export default App;
