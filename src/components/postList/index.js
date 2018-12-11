/*
 src/App.js
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Grid from '@material-ui/core/Grid';
import BottomScrollListener from 'react-bottom-scroll-listener'
import { getPostList } from '../../actions/postAction'
import PostItem from '../postItem';

import './postList.scss';

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    getPostList: (start, end) => dispatch(getPostList(start, end))
})

class PostList extends Component {
    constructor() {
        super();
        this.state = {
            postList: [],
            initialPost: 0,
            maxPost: 10,
            loading: true,
            loadingNextPage: false,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (Object.values(nextProps.postReducer.postList).length !== prevState.postList.length && prevState.postList.length > 0 ) {
            return {
                postList: Object.values(nextProps.postReducer.postList),
            }
        }
    }

    componentDidMount() {
        this.fetchPostList(this.state.initialPost, this.state.maxPost);
    }


    fetchPostList(start, end) {
        this.props.getPostList(start, end).then((response) =>{
            this.setState({
                postList: response.value.data,
                loading: false,
                loadingNextPage: false,
            })
        })
    }

    callback() {
        this.setState({
            initialPost: this.state.initialPost + 11,
            loadingNextPage:true
        }, () => {
            this.fetchPostList(this.state.initialPost, this.state.maxPost);
        })
        
    }

    render() {
        return (
            <div className="post-list-container">
                <Grid container spacing={24}>
                    <BottomScrollListener onBottom={this.callback.bind(this)} />
                    <Grid item xs={12}>
                        {this.state.loading && <span>Loading...</span>}
                        {!this.state.loading && (
                            <div>
                                {this.state.postList.map((post) => (
                                    <PostItem postItem={post} key={post.id}/>
                                ))}
                                {this.state.loadingNextPage && <span>Loading...</span>}
                            </div>
                        )}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

PostList.propTypes = {
    getPostList: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);