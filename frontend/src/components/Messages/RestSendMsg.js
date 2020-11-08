import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {getRestConversationsByUserID} from '../../actions/message'
import { getCurrentRestProfile } from '../../actions/restprofile'
import {getUserProfilebyId} from '../../actions/userprofile'
import {restLoadUser} from '../../actions/auth'
import Spinner from '../layout/spinner';
import DashboardNav from '../layout/DashboardNav';

const RestSendMsg = ({getUserProfilebyId, getRestConversationsByUserID, getCurrentRestProfile, restprofile: {restprofile}, message:{conversation, messages, loading}, userprofile: {yelpuser:user}, match}) => {

    useEffect(()=>{
        getUserProfilebyId(match.params.user_id);
        getRestConversationsByUserID(match.params.user_id);
        getCurrentRestProfile();
    },[])

    let userName ="", restName = "", _from ="", _to ="", _restId ="", _userId ="", msgId = ""
    let conv = {}
    if (messages && user && restprofile){
        console.log ("messages is ", messages)    
        console.log ("userprofile is ", user)
        userName = user.user.firstName
        console.log ("restprofile is ",restprofile)
        restName = restprofile.restuser.restName
        conv = messages.map(message=>
            {
                _restId = message.restID
                _userId = message.userID
                msgId = message._id
                console.log ("message id is",msgId)
                return (message.messages.map(msg =>{
                    if (msg.from == _restId)
                    {
                    _from = restName
                    _to = userName
                    } else {
                    _from = userName
                    _to = restName
                    }
                    return {from:_from, to:_to, date:msg.date, message:msg.message, msgId:msgId}
                }))
            })
    }

    console.log ("conversation array is", conv)

    return (
        <Fragment>
            <DashboardNav/>
            <div className='container'> 
            <div className="Event_Cards" > 
            <div className="Event_Card">
            {/* <img className='Event_img' src='./yelp_events.jpeg' alt=""/> */}      
            <div className= "Event_Content">
            <div className='profiles'>
                {conv.length >0?conv.map(conve => {return (
                    <div>
                    <h3 className="lead text-dark"> conversation </h3>
                    {conve.length>0
                        ? conve.map(conver =>
                        {
                            return (
                                
                                    <div>
                                    <p><i className="text-dark"> </i>From: {conver.from}</p>
                                    <p><i className="text-dark"> </i>To: {conver.to}</p>
                                    <p><i className="text-dark"> </i>Message: {conver.message}</p>
                                    <p><i className="text-dark"> </i>Date:{conver.date}</p>
                                    {conve.indexOf(conver) === conve.length-1?<div className='Event_info'>
                    <Link to={`/rest/${conver.msgId}`} className="text-dark"> Send Message</Link>
                    <hr/>
                    </div>:null}
                                    <br/>
                                    </div>
                            )
                        }):"None"}
                    </div>
                )}):"none"}
                 
                </div>
            </div>
            
            </div>
            

        </div>
         </div>
         </Fragment>
    )
}

RestSendMsg.propTypes = {
    getUserProfilebyId: PropTypes.func.isRequired,
    getCurrentRestProfile: PropTypes.func.isRequired,
    getRestConversationsByUserID: PropTypes.func.isRequired,
    message: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    message: state.message,
    auth: state.auth,
    restprofile: state.restprofile,
    userprofile: state.userprofile

})

export default connect(mapStateToProps, {getRestConversationsByUserID, getCurrentRestProfile, getUserProfilebyId})(RestSendMsg)
