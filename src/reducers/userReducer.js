

import { userConstants } from '../constants/userConstants';

const initialState = {
    fetching: false,
    fetched: false,
    users: {},
    error: null
}

const Users = (state = initialState, action) => {

    switch (action.type) {
        case `${userConstants.GET_USERS}_PENDING`:
            return {
                ...state,
                fetching: true,
            }
        case `${userConstants.GET_USERS}_ERROR`:
            return {
                ...state,
                fetching: false,
                error: action.payload.data,
            }
        case `${userConstants.GET_USERS}_FULFILLED`:
            return {
                ...state,
                fetching: false,
                fetched: true,
                users: action.payload.data
            }
        default:
            return state
    }
}

export default Users;