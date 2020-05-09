import * as types from '../actions/types'
import { initialState } from './initialState'

export const ticket = (state=initialState, {type, payload}) => {
    switch (type) {
        case types.SET_TICKET:
            return {...{type: types.SET_TICKET, payload: payload}};
        default:
            break;
    }
    return state
}