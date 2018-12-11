import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';

import PostList from './components/postList';
import NavBar from './components/navBar';

import { getUsers } from './actions/userAction'

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers())
})

class App extends Component {

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <PostList />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);