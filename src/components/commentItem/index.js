/*
 src/App.js
*/
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './commentItem.scss';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class CommentItem extends Component {


    render() {
        return (
            <Paper className="commentItem">
                <Typography variant="h5" component="h4">
                    {this.props.name}
                </Typography>
                <Typography component="p">
                    {this.props.body}
                </Typography>
            </Paper>
        );
    }
}

CommentItem.propTypes = {
    name: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
}

export default CommentItem;