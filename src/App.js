import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';

import PostList from './components/posts/postList';
import NavBar from './components/navBar';

import { getUsers } from './actions/userAction'

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers())
})

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedUserId: ''
    }
  }

  componentDidMount() {
    this.props.getUsers();
  }

  selectedUser(userId = '') {
    this.setState({
      selectedUserId: userId
    })
  }

  render() {
    return (
      <div className="App">
        <NavBar action={this.selectedUser.bind(this)}/>
        <PostList userId={this.state.selectedUserId}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);