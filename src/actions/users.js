import * as types from './types';

export const setUser = (user) => dispatch => {
    dispatch({type: types.SET_USER, payload: user})
}