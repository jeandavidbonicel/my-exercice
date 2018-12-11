
import axios from 'axios';

import { userConstants } from '../constants/userConstants';

export const getUsers = () => dispatch => {

    let url = `${process.env.API_URL}/users`;
    let promise = axios.get(url);

    return dispatch({
        type: userConstants.GET_USERS,
        payload: promise
    })
}