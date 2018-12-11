/*
 src/reducers/postReducer.js
*/

import { postConstants } from '../constants/postConstants';

const initialState = {
    fetching: false,
    fetched: false,
    postList: {},
    commentAdded: {},
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
                error: action.payload.data,
            }
        case `${postConstants.GET_POST_LIST}_FULFILLED`:
            return {
                ...state,
                fetching: false,
                fetched: true,
                postList: {
                    ...Object.values(state.postList).concat(action.payload.data),
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
                error: action.payload.data,
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
                error: action.payload.data,
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
        case `${postConstants.ADD_COMMENT_TO_POST}_PENDING`:
            return {
                ...state,
                fetching: true,
            }
        case `${postConstants.ADD_COMMENT_TO_POST}_ERROR`:
            return {
                ...state,
                fetching: false,
                error: action.payload.data,
            }
        case `${postConstants.ADD_COMMENT_TO_POST}_FULFILLED`:
            const data = action.payload.data;
            const commentAdded = {
                postId: data.postId,
                id: data.id,
                name: data.name,
                email: data.email,
                body: data.body
            };
            return {
                ...state,
                fetching: false,
                fetched: true,
                commentAdded: commentAdded,
                postList: {
                    ...state.postList,
                    [data.postId - 1]: {
                        ...state.postList[data.postId - 1],
                        comments: {
                            ...state.postList[data.postId - 1]['comments'],
                            commentAdded
                        }
                    }
                },
            }
        default:
            return state
    }
}

export default Post;