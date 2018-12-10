/*
 src/App.js
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Grid from '@material-ui/core/Grid';


import './postList.scss';
import { getPostList } from '../../actions/postAction'
import PostItem from '../postItem';

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
            postList: {},
            initialPost: 0,
            maxPost: 10,
            loading: false,
        };
    }

    fetchPostList(start, end) {
        this.props.getPostList(start, end).then((response) =>{
            this.setState({
                postList: response.value.data,
                loading: false,
            })
        })
    }
    componentWillMount() {
        this.setState({
            loading: true,
        })
    }


    componentDidMount() {
        this.fetchPostList(this.state.initialPost, this.state.maxPost);
    }

    render() {
        return (
            <div className="post-list-container">
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        {this.state.loading && <span>Loading...</span>}
                        {!this.state.loading && (
                            <div>
                                {this.state.postList.map((post) => (
                                    <PostItem postItem={post} key={post.id}/>
                                ))}
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