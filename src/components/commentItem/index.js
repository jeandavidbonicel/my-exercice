/*
 src/App.js
*/
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './commentItem.scss';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class CommentItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            body: ''
        }
    }

    boldUserSuggestions(body) {
        //bold username if needed
        const regex = /\[\w+\]/g;
        const values = body && body.match(regex);
        let newBody = '';

        //if serveral values
        if (values) {
            values.map(value => {
                let oldValue = value;
                let newValue = value.replace('[', '<b>').replace(']', '</b>');
                return newBody = newBody === '' ? body.replace(oldValue, newValue) : newBody.replace(oldValue, newValue);
            });
        }

        this.setState({
            body: newBody !== '' ? newBody : body
        });
    }

    componentDidMount() {
        this.boldUserSuggestions(this.props.body);
    }

    render() {

        const {tags, name} = this.props;
        const {body} = this.state;
        return (
            <Paper className="commentItem">
                <Typography variant="h5" component="h4">
                    {name}
                </Typography>
                <p dangerouslySetInnerHTML={{ __html: body }}>
                </p>
                <div className="tag-container">
                    {tags && tags.length > 0 && tags.map((tag) =>(
                        <span key={tag.id}>{tag.text}</span>
                    ))}
                </div>
            </Paper>
        );
    }
}

CommentItem.propTypes = {
    name: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
}

export default CommentItem;