/*
 src/App.js
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Grid from '@material-ui/core/Grid';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { getPostList } from '../../../actions/postAction';
import PostItem from '../postItem';
import Loader from '../../commons/loader';

import './postList.scss';

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    getPostList: (start, end, filter) => dispatch(getPostList(start, end, filter))
});

class PostList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postList: [],
            initialPost: 0,
            maxPost: 10,
            loading: true,
            loadingNextPage: false,
            userId: ''
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        //refresh if list changed
        if (Object.values(nextProps.postReducer.postList) !== prevState.postList && prevState.postList.length > 0 ) {
            return {
                postList: Object.values(nextProps.postReducer.postList),
            }
        }

        //refresh list if user filter
        if(nextProps.userId !== prevState.userId) {
            return {
                userId: nextProps.userId
            }
        }
        return  null;
    }

    componentDidMount() { 
        this.fetchPostList(this.state.initialPost, this.state.maxPost);
    }

    componentDidUpdate(prevProps) {
        //fetch specific user's posts , reset postList
        if (this.props.userId !== prevProps.userId) {
            this.setState({
                postList: []
            });
            this.fetchPostList(0, 10, {
                userId: this.props.userId
            });
        }
    }

    fetchPostList(start, end, filter) {
        this.props.getPostList(start, end, filter).then((response) =>{
            this.setState({
                postList: response.value.data,
                loading: false,
                loadingNextPage: false,
            });
        });
    }

    callback() {
        //lazyload, post 10 by 10
        if (!this.state.userId || this.state.userId === 'none') {
            this.setState({
                initialPost: this.state.initialPost + 10,
                loadingNextPage: true
            }, () => {
                this.fetchPostList(this.state.initialPost, this.state.maxPost);
            })
        }
    }

    render() {

        const { loading, postList, loadingNextPage } = this.state;
        return (
            <div className="post-list-container">
                <Grid container spacing={24}>
                    <BottomScrollListener onBottom={this.callback.bind(this)} />
                    <Grid item xs={12}>
                        {loading && <Loader/>}
                        {!loading && (
                            <div>
                                {postList.map((post, index) => (
                                    <PostItem index={index} postItem={post} key={index}/>
                                ))}
                                {loadingNextPage && <Loader />}
                            </div>
                        )}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

PostList.propTypes = {
    getPostList: PropTypes.func.isRequired,
    userId: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);