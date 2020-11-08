import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import restprofile from './restprofile';
import userprofile from './userprofile';
import event from './event';
import menuitem from './menuitem';
import orders from './orders';
import images from './images';
import message from './message';

export default combineReducers({
    alert,
    auth,
    restprofile,
    userprofile,
    event,
    menuitem,
    orders,
    images,
    message
});