import * as types from './types';

export const setToken = (token) => dispatch => {
    dispatch({type: types.SET_TOKEN, payload: token})
}