
import axios from 'axios';

import { postConstants } from '../constants/postConstants';

export const getPostList = (start = 0, end = 100, filter = {}) => dispatch => {

    let url = `${process.env.API_URL}/posts?_start=${start}&_limit=${end}`;

    if (filter && filter.userId && filter.userId !== 'none' ) {
        url = `${process.env.API_URL}/posts?userId=${filter.userId}`
    }
    
    let promise = axios.get(url, {
        userId: filter.userId
    });

    return dispatch({
        type: postConstants.GET_POST_LIST,
        payload: promise
    })
}

export const getCommentByPostId = (postId, index) => dispatch => {

    let url = `${process.env.API_URL}/posts/${postId}/comments`;
    let promise = axios.get(url, {
        position: index
    });

    return dispatch({
        type: postConstants.GET_COMMENTS_BY_POST_ID,
        payload: promise
    })
}

export const getUserByPost = (userId, index) => dispatch => {
    let url = `${process.env.API_URL}/users/${userId}`;
    let promise = axios.get(url, {
        position: index
    });
    
    return dispatch({
        type: postConstants.GET_USER_BY_POST,
        payload: promise
    })
}

export const addCommentToPost = (data) => dispatch => {
    
    let url = `${process.env.API_URL}/comments`;
    let promise = axios.post(url, data, { headers: { 'Access-Control-Allow-Origin': '*'} } );

    return dispatch({
        type: postConstants.ADD_COMMENT_TO_POST,
        payload: promise
    })
}