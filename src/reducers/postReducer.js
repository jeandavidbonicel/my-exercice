
import { postConstants } from '../constants/postConstants';

const initialState = {
    fetching: false,
    fetched: false,
    postList: {},
    commentAdded: {},
    idNumber: 500,
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

            let list = {};

            if (action.payload.config.userId) {
                list = action.payload.data
            } else {
                list = {
                    ...Object.values(state.postList).concat(action.payload.data),
                }
            }

            return {
                ...state,
                fetching: false,
                fetched: true,
                postList: list
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
                    [action.payload.config.position]: {
                        ...state.postList[action.payload.config.position],
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
                    [action.payload.config.position]: {
                        ...state.postList[action.payload.config.position],
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

            //Patch for id due to the api which is giving only one ID 501
            // to avoid the error:  Encountered two children with the same key
            // it will be generated manually
            const commentAdded = {
                postId: data.postId,
                id: state.idNumber + 1,
                name: data.name,
                email: data.email,
                body: data.body,
                tags: data.tags
            };
            return {
                ...state,
                idNumber: state.idNumber + 1,
                fetching: false,
                fetched: true,
                commentAdded: commentAdded,
                postList: {
                    ...state.postList,
                    [data.position]: {
                        ...state.postList[data.position],
                        comments: {
                            ...Object.values(state.postList[data.position]['comments']).concat(commentAdded),
                        }
                    }
                },
            }
        default:
            return state
    }
}

export default Post;