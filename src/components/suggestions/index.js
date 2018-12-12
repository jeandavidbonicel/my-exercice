/*
 src/App.js
*/
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import './suggestions.scss';



import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class Suggestions extends Component {

    
    render() {
        return (
            <div>
                {this.props.users.length > 0 && (
                    <div>
                        <div className="list-users-suggestion-container">
                            <List component="nav">
                                {this.props.users && this.props.users.map((user) => (
                                    <ListItem key={user.id} button onClick={this.props.action}>{user.username}</ListItem>
                            ))}
                            </List>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

Suggestions.propTypes = {
}

export default Suggestions;