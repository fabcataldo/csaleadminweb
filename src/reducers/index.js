import { users } from './users'
import { token } from './token';
import { ticket } from './tickets';
import { combineReducers } from 'redux'

export default combineReducers({
    users,
    token,
    ticket
})