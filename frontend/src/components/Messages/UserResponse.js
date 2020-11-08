import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {getConversationById, getUserConversations, updateUserReponse} from '../../actions/message'
// import { getAllRestProfiles} from '../../actions/restprofile'
import {getCurrentUserProfile} from '../../actions/userprofile'
import Spinner from '../layout/spinner';
import DashboardNav from '../layout/DashboardNav';

const UserResponse = ({
    updateUserReponse, 
    getConversationById, 
    getCurrentUserProfile, 
    userprofile,
    message: {messages},
    match,
}) => {

    
    useEffect(()=>{
        getConversationById(match.params.msgId)
        getCurrentUserProfile()
        setFormData({from: !userprofile.userprofile? null : userprofile.userprofile.user._id,
            to: messages.length ===0 ?null:messages[0]._id,
            }
            )
    }, [])

    const [formData, setFormData] = useState({
        from:'',
        to: '',
        message: '',
      });

    const {message} = formData

    const onChange = (e) =>
    {
        console.log ("inside onChange, e.target.name is ",e.target.name)
        console.log ("inside onChange, userprofile.userprofile.user._id is ",userprofile.userprofile.user._id)
        console.log ("inside onChange, messages[0]._id is",messages[0]._id)
        console.log ("inside formData, formData is ",formData)
        setFormData({message:e.target.value, from:userprofile.userprofile.user._id, to:messages[0]._id})
    }

  const onSubmit = (e) => {
    e.preventDefault();
    updateUserReponse(match.params.msgId, formData, history);
  };

    return (
        <Fragment>
        <DashboardNav/>
        <div className="container">
        <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
           <label for="message">Text Message</label>
           <small className="form-text">This field is required.</small>
           <textarea
             type="text"
             name="message"
             rows="4" 
             cols="50"
             placeholder="Enter your message"
             value={message}
             onChange={(e) => onChange(e)}
           />
                    </div>
         
         <input type="submit" className="btn btn-dark my-1" value="Send"/>
         </form>
         </div>
         </Fragment>
    )
}

UserResponse.propTypes = {
    getUserConversations: PropTypes.func.isRequired,
    // getAllRestProfiles: PropTypes.func.isRequired,
    getCurrentUserProfile: PropTypes.func.isRequired,
    updateUserReponse: PropTypes.func.isRequired,
    message: PropTypes.object.isRequired,
    userprofile: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    userprofile: state.userprofile,
    message : state.message
})
export default connect(mapStateToProps, {updateUserReponse, getConversationById, getCurrentUserProfile})(UserResponse);
