/*
 src/App.js
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import './commentList.scss';

import CommentItem from '../commentItem';
import CommentInput from '../commentInput';
import Loader from '../../commons/loader';

import { getCommentByPostId } from '../../../actions/postAction'

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
    getCommentByPostId: (postId, index) => dispatch(getCommentByPostId(postId, index)),
})

class CommentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postId: null,
            user: {},
            comments: [],
            commentAdded: [],
            loadingComments: true,
            expanded: false,
            index: 0
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let postList = nextProps.postReducer.postList[prevState.index];
        if (nextProps.postReducer.commentAdded && nextProps.postReducer.commentAdded.postId && (nextProps.postReducer.commentAdded.postId === prevState.postId)) {
            return {
                comments: postList['comments'] ? Object.values(postList['comments']) : [],
                commentAdded: nextProps.postReducer.commentAdded
            };
        }
        return null;
    }


    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    fetchCommentList(postId, index) {
        this.props.getCommentByPostId(postId, index).then((response) => {
            this.setState({
                comments: response.value.data,
                loadingComments: false
            })
        });
    }

    componentDidMount() {
        this.setState({
            index: this.props.index,
            postId: this.props.postId
        }, () => {
            this.fetchCommentList(this.props.postId, this.props.index);
        })
    }

    render() {

        const { postId, comments, loadingComments, expanded, index } = this.state;
        return (
            <CardContent>
                <CardActions onClick={this.handleExpandClick} className="card-actions" disableActionSpacing>
                    <IconButton
                        className={expanded ? 'expand-open' : 'expand'}
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
                        {loadingComments && <Loader />}
                        {!loadingComments && (
                            <div>
                                <div className="comments-content">
                                    {comments.map((comment) => (
                                        <CommentItem index={index} tags={comment.tags} name={comment.name} body={comment.body} key={comment.id} />
                                    ))}
                                </div>
                                <CommentInput index={index} postId={postId} />
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