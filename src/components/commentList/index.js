/*
 src/App.js
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import './commentList.scss';

import CommentItem from '../commentItem';

import { getCommentByPostId } from '../../actions/postAction'

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    getCommentByPostId: (postId) => dispatch(getCommentByPostId(postId)),
})

class CommentList extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            comments: {},
            loadingComments: false,
            expanded: false
        };
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    fetchCommentList() {
        this.props.getCommentByPostId(this.props.postId).then((response) => {
            this.setState({
                comments: response.value.data,
                loadingComments: false
            })
        });
    }

    componentWillMount() {
        this.setState({
            loadingComments: true,
        })
    }

    componentDidMount() {
        this.fetchCommentList();
    }

    render() {
        const { comments, loadingComments, expanded } = this.state;

        return (
            <CardContent>
                <CardActions className="card-actions" disableActionSpacing>
                    <IconButton
                        className={expanded ? 'expand-open' : 'expand'}
                        onClick={this.handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                    <Typography component="p">
                        comments
                </Typography>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {loadingComments && <span>Loading...</span>}
                        {!loadingComments && (
                            <div>
                                {comments.map((comment) => (
                                    <CommentItem name={comment.name} body={comment.body} key={comment.id} />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Collapse>
            </CardContent>
        );
    }
}

CommentList.propTypes = {
    getCommentByPostId: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);