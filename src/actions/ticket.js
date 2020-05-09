import * as types from './types';

export const setTicket = (ticket) => dispatch => {
    dispatch({type: types.SET_TICKET, payload: ticket})
}