
import axios from 'axios';

import { postConstants } from '../constants/postConstants';

export const getPostList = (start, end) => dispatch => {

    let url = `${process.env.API_URL}/posts?_start=${start || 0}&_limit=${end || 100}`;
    let promise = axios.get(url);

    return dispatch({
        type: postConstants.GET_POST_LIST,
        payload: promise
    })
}

export const getCommentByPostId = (postId) => dispatch => {

    let url = `${process.env.API_URL}/posts/${postId}/comments`;
    let promise = axios.get(url, {
        params: {
            postId: postId
        }
    });

    return dispatch({
        type: postConstants.GET_COMMENTS_BY_POST_ID,
        payload: promise
    })
}

export const getUserByPost = (userId, postId) => dispatch => {

    let url = `${process.env.API_URL}/users/${userId}`;
    let promise = axios.get(url, {
        params: {
            postId: postId
        }
    });
    
    return dispatch({
        type: postConstants.GET_USER_BY_POST,
        payload: promise
    })
}

export const addCommentToPost = (data) => dispatch => {

    let url = `${process.env.API_URL}/comments`;
    let promise = axios.post(url, data);

    return dispatch({
        type: postConstants.ADD_COMMENT_TO_POST,
        payload: promise
    })
}