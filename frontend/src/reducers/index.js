import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import restprofile from './restprofile';
import userprofile from './userprofile';
import event from './event';
import menuitem from './menuitem';

export default combineReducers({
    alert,
    auth,
    restprofile,
    userprofile,
    event,
    menuitem
});