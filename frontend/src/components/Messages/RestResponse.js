import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {getConversationById, getUserConversations, updateRestReponse} from '../../actions/message'
// import { getAllRestProfiles} from '../../actions/restprofile'
import {getCurrentRestProfile} from '../../actions/restprofile'
import Spinner from '../layout/spinner';
import DashboardNav from '../layout/DashboardNav';

const RestResponse = ({
    getConversationById, 
    getCurrentRestProfile, 
    updateRestReponse, 
    restprofile,
    message: {messages},
    match}) => {

    console.log(match.params.msgId)
    useEffect(()=>{
        getConversationById(match.params.msgId)
        getCurrentRestProfile()
        setFormData({from: !restprofile.restprofile? null : restprofile.restprofile.restuser._id,
            to: messages.length ===0 ?null:messages[0].userID,
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
        console.log ("inside onChange, userprofile.userprofile.user._id is ",restprofile.restprofile.restuser._id)
        console.log ("inside onChange, messages[0]._id is",messages[0]._id)
        console.log ("inside formData, formData is ",formData)
        setFormData({message:e.target.value, from:restprofile.restprofile.restuser._id, to:messages[0].userID})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        updateRestReponse(match.params.msgId, formData, history);
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

RestResponse.propTypes = {
    getConversationById: PropTypes.func.isRequired,
    getCurrentRestProfile: PropTypes.func.isRequired,
    updateRestReponse: PropTypes.func.isRequired,
    message: PropTypes.object.isRequired,
    restprofile: PropTypes.func.isRequired,
}

const mapStateToProps = state =>({
    restprofile: state.restprofile,
    message : state.message
})

export default connect(mapStateToProps, {getConversationById, getCurrentRestProfile, updateRestReponse})(RestResponse)
