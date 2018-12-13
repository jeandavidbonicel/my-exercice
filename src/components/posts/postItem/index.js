import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import './postItem.scss';
import CommentList from '../../comments/commentList';
import SimplePieChart from '../../commons/charts/pieChart';
import { getUserByPost } from '../../../actions/postAction';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    getUserByPost: (userId, index) => dispatch(getUserByPost(userId, index)),
})

class PostItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            comments: {},
            loadingUser: true,
            expanded: false,
            tags: []
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        const post = nextProps.postReducer.postList[nextProps.index];
        if (post && post['tags'] && post['tags'] !== prevState.tags) {
            return {
                tags: post['tags']
            }
        }
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    fetchPostItem() {
        this.props.getUserByPost(this.props.postItem.userId, this.props.index).then((response) => {
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
       const { user, loadingUser, tags} = this.state;
       const { postItem } =this.props;

        return (
            <Card className="postItem">
                <CardHeader
                    className="card-header"
                    avatar={
                        <Avatar aria-label="Recipe" className="avatar">
                            {!loadingUser ? user.username.substring(0,1).toUpperCase(): ''}
                        </Avatar>
                    }
                    title={postItem.title}
                    subheader={user.username}
                />
                <CardContent>
                    <div className="card-content">
                    <div className="card-content-row">
                        <Typography component="p">
                                {postItem.body}
                        </Typography>
                    </div>    
                    <div className="card-content-row">
                            <SimplePieChart data={tags}/>
                    </div>
                    </div>
                </CardContent>
                <CommentList index={this.props.index} postId={this.props.postItem.id}/>
            </Card>
        );
    }
}

PostItem.propTypes = {
    getUserByPost: PropTypes.func.isRequired,
    index: PropTypes.number
}


export default connect(mapStateToProps, mapDispatchToProps)(PostItem);