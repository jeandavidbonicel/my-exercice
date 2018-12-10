/*
 src/actions/postAction.js
*/
import { postConstants } from '../constants/postConstants';

import axios from 'axios';

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
    console.log(postId)
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