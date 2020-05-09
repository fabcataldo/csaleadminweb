import * as types from '../actions/types'
import { initialState } from './initialState'

export const token = (state=initialState, {type, payload}) => {
    switch (type) {
        case types.SET_TOKEN:
            const newToken = {type: types.SET_TOKEN, payload: payload}
            return {...newToken}
        default:
            break;
    }
    return state
}