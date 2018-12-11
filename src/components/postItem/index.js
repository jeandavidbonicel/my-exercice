/*
 src/App.js
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import './postItem.scss';
import CommentList from '../commentList';

import { getUserByPost } from '../../actions/postAction'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    getUserByPost: (userId, postId) => dispatch(getUserByPost(userId, postId)),
})

class PostItem extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            comments: {},
            loadingUser: true,
            expanded: false
        };
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    fetchPostItem() {
        this.props.getUserByPost(this.props.postItem.userId, this.props.postItem.id).then((response) => {
            this.setState({
                user: response.value.data,
                loadingUser: false
            });
        });
    }
    
    componentDidMount() {
        this.fetchPostItem();
    }

    render() {
       const { user, loadingUser} = this.state;

        return (
            <Card className="postItem">
                <CardHeader
                    className="card-header"
                    avatar={
                        <Avatar aria-label="Recipe" className="avatar">
                            {!loadingUser ? user.username.substring(0,1).toUpperCase(): ''}
                        </Avatar>
                    }
                    title={this.props.postItem.title}
                    subheader={user.username}
                />
                <CardContent>
                    <Typography component="p">
                        {this.props.postItem.body}
                    </Typography>
                </CardContent>
                <CommentList postId={this.props.postItem.id}/>
            </Card>
        );
    }
}

PostItem.propTypes = {
    getUserByPost: PropTypes.func.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps)(PostItem);