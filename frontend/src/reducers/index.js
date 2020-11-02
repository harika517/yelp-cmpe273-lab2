import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import restprofile from './restprofile';
import userprofile from './userprofile';
import event from './event';
import menuitem from './menuitem';
import orders from './orders';
import images from './images';

export default combineReducers({
    alert,
    auth,
    restprofile,
    userprofile,
    event,
    menuitem,
    orders,
    images
});