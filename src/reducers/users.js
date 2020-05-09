import * as types from '../actions/types'
import { initialState } from './initialState'

export const users = (state=initialState, {type, payload}) => {
    switch (type) {
        case types.SET_USER:
            const newUser = {type: types.SET_USER, payload: payload}
            return {...newUser};
        default:
            break;
    }
    return state
}