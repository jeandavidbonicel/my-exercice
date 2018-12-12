/*
 src/App.js
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { addCommentToPost } from '../../actions/postAction'

import './commentInput.scss';

import Suggestions from '../suggestions';



const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    addCommentToPost: (data) => dispatch(addCommentToPost(data))
})

class CommentInput extends Component {
    constructor() {
        super();
        this.state = {
            comment: '',
            title: '',
            email: '',
            errors: {},
            suggestionWithAt: '',
            suggestion: '',
            usersSuggested: {}
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    }

    handleValidation() {

        const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const errors = {};

        if (!this.state.email) {
            errors['email'] = 'e-mail empty';
        } else if (!regEmail.test(String(this.state.email).toLowerCase())) {
            errors['email'] = 'e-mail not valid';
        } else if (!this.state.title) {
            errors['title'] = 'title empty';
        } else if (!this.state.comment) {
            errors['comment'] = 'comment empty';
        }

        if (Object.keys(errors).length) {
            console.log('error');
            this.setState({
                errors: errors
            })
            return false;
        }

        return true;
    }

    addComment() { 
        if(this.handleValidation()) {
            this.props.addCommentToPost({
                postId: this.props.postId,
                email: this.state.email,
                name: this.state.title,
                body: this.state.comment
            }).then(response => {
                this.setState({
                    email: '',
                    title: '',
                    comment: '',
                    errors: {}
                })
            })
        }
    }

    onKeyUp = () => event => {
        const value = event.target.value;
        const regSuggestionUser = /@\w+/g;
        
        if (regSuggestionUser.test(value)) {
            const results = value.match(regSuggestionUser);
            results.map(result => {
                if (value && (value.endsWith(result) || (value.startsWith(result) && value.endsWith(result)))) {
                    this.setState({
                        suggestionWithAt: result,
                        suggestion: result.substr(1)
                    }, () => {
                        this.findUser(this.state.suggestion)
                    })
                } else {
                    this.setState({
                        suggestionWithAt: '',
                        suggestion: '',
                        usersSuggested: {}
                    })
                }
            });

        } else {
            this.setState({
                suggestionWithAt: '',
                suggestion: '',
                usersSuggested: {}
            })
        }
    }

    findUser(suggestion) {
        const usersFound = this.props.userReducer.users.filter(element => {
            return element.username.toLowerCase().startsWith(suggestion.toLowerCase())
        })

        this.setState({
            usersSuggested: usersFound
        });
    }

    onClickSuggestion(e) {
        const value = this.state.comment.replace(this.state.suggestionWithAt, `[${e.target.textContent}]`)
        
        this.setState({
            comment: value,
            suggestionWithAt: '',
            suggestion: '',
            usersSuggested: {}
        })
    }

    render() {
        const { errors, suggestion, email, title, comment, usersSuggested} = this.state;

        return (
            <div className="comment-input-container">
                <TextField
                    id="outlined-email"
                    label="Add e-mail"
                    value={email}
                    onChange={this.handleChange('email')}
                    className="email-input"
                    margin="normal"
                    variant="outlined"
                />  
                <Typography className="input-error" component="p">
                    {errors && errors['email']}
                </Typography>
                <TextField
                    id="outlined-title"
                    label="Add title"
                    value={title}
                    onChange={this.handleChange('title')}
                    className="title-input"
                    margin="normal"
                    variant="outlined"
                />  
                <Typography className="input-error" component="p">
                    {errors && errors['title']}
                </Typography>
                <TextField
                    inputProps={{
                        maxLength: 120,
                    }}
                    id="outlined-multiline-flexible"
                    label="Add comment"
                    multiline
                    rowsMax="4"
                    value={comment}
                    onChange={this.handleChange('comment')}
                    className="comment-input"
                    margin="normal"
                    helperText="120 caracters maximum"
                    variant="outlined"
                    onKeyUp={this.onKeyUp()}
                />
                <Typography className="input-error" component="p">
                    {errors && errors['comment']}
                </Typography>
                {
                    suggestion !== '' && usersSuggested.length > 0 ? 
                    <Suggestions users={usersSuggested} action={this.onClickSuggestion.bind(this)}/> : ''
                }
                <Button variant="contained" color="primary" className="send-comment-button" onClick={this.addComment.bind(this)}>
                    Send
                    <Icon className="send-comment-button-icon">send</Icon>
                </Button>
            </div>
        );
    }
}

CommentInput.propTypes = {
    addCommentToPost: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput);