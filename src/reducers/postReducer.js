/*
 src/reducers/postReducer.js
*/

import { postConstants } from '../constants/postConstants';

const initialState = {
    fetching: false,
    fetched: false,
    postList: {},
    error: null
}

const Post = (state = initialState, action) => {

    switch (action.type) {
        case `${postConstants.GET_POST_LIST}_PENDING`:
            return {
                ...state,
                fetching: true,
            }
        case `${postConstants.GET_POST_LIST}_ERROR`:
            return {
                ...state,
                fetching: false,
                error: action.payload,
            }
        case `${postConstants.GET_POST_LIST}_FULFILLED`:
            return {
                ...state,
                fetching: false,
                fetched: true,
                postList: {
                    ...state.postList,
                    ...action.payload.data
                }
            }
        case `${postConstants.GET_USER_BY_POST}_PENDING`:
            return {
                ...state,
                fetching: true,
            }
        case `${postConstants.GET_USER_BY_POST}_ERROR`:
            return {
                ...state,
                fetching: false,
                error: action.payload,
            }
        case `${postConstants.GET_USER_BY_POST}_FULFILLED`:
            return {
                ...state,
                fetching: false,
                fetched: true,
                postList: {
                    ...state.postList,
                    [action.payload.config.params.postId - 1]: {
                        ...state.postList[action.payload.config.params.postId - 1],
                        user: action.payload.data
                    }
                },
            }
        case `${postConstants.GET_COMMENTS_BY_POST_ID}_PENDING`:
            return {
                ...state,
                fetching: true,
            }
        case `${postConstants.GET_COMMENTS_BY_POST_ID}_ERROR`:
            return {
                ...state,
                fetching: false,
                error: action.payload,
            }
        case `${postConstants.GET_COMMENTS_BY_POST_ID}_FULFILLED`:
        
            return {
                ...state,
                fetching: false,
                fetched: true,
                postList: {
                    ...state.postList,
                    [action.payload.config.params.postId - 1]: {
                        ...state.postList[action.payload.config.params.postId - 1],
                        comments: action.payload.data
                    }
                },
            }
        default:
            return state
    }
}

export default Post;