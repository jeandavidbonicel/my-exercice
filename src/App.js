/*
 src/App.js
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';

import PostList from './components/postList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PostList />
      </div>
    );
  }
}
export default connect()(App);