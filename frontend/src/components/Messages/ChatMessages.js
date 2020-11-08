import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {startConversation, restSendMsg, getUserConversations} from '../../actions/message'
import { getAllRestProfiles} from '../../actions/restprofile'
import {getCurrentUserProfile} from '../../actions/userprofile'
import {restLoadUser} from '../../actions/auth'
import Spinner from '../layout/spinner';
import DashboardNav from '../layout/DashboardNav';
import userprofile from '../../reducers/userprofile';


const ChatMessages = ({getUserConversations, getAllRestProfiles, getCurrentUserProfile, message:{messages}, restprofile:{restprofile, restprofiles, loading}, userprofile}) => {
    useEffect(()=>{
        getUserConversations()
        getAllRestProfiles()
        getCurrentUserProfile()
    }, [])
    let conversations = []
    let userName = ""
    let rest_name = ""
    let restProf = {}
    let _user = ""
    let _rest = ""
    let _from = ""
    let _to = ""
    let msgId = ''
    if (true) {
        if (messages) {
            conversations = messages.map(message =>
            {
            console.log (message)
            console.log ("userID for the conversation is",message.userID)
            console.log ("restID for the conversation is",message.restID)
            console.log ("message id is ",message._id)
            msgId = message._id
            if (message.userID && userprofile.userprofile)
            {
                userName = userprofile.userprofile.user.userName
                //userName = 
                _user = message.userID
            }
            if (message.restID && restprofiles)
            {
                console.log ('restprofiles is',restprofiles)
                restProf = restprofiles.filter(profile => String(profile.restuser._id) == String (message.restID))
                console.log ("restprof.length",restProf.length)
                if (restProf.length!==0){
                    console.log ("restProf is obtained as",restProf)
                    console.log (restProf[0])
                    rest_name = restProf[0].restuser.restName
                }
                console.log ("restName is obtained as",rest_name)
                _rest = message.restID
            }
            return(message.messages.map (message =>
            {
            console.log (message)
            console.log("username for this message is",userName)
            console.log("restaurant name for this message is",rest_name)
            if (message.from === _user)
            {
                _from = userName
                _to = rest_name
            } else {
                _from = rest_name
                _to = userName
            }
            console.log("from is",_from)
            console.log("to is",_to)
            console.log("message is",message.message)
            return {from:_from, to:_to, message:message.message, date: message.date, msgId:msgId}}
            ))
            }
            )
        }
    }
    console.log ("conversations is",conversations)
    
    return (
        <Fragment>
            <DashboardNav/>
            {loading ? <Spinner/> : <Fragment>
                <div className="container">
                {/* <div className="container_2columns">
                <div className="column1"> */}
                <div className="Event_Cards" > 
            <div className="Event_Card">
            {/* <img className='Event_img' src='./yelp_events.jpeg' alt=""/> */}      
            <div className= "Event_Content">
            <div className='profiles'>
                {/* {user ? <h3 className="lead text-dark"> {user.userName} </h3>: ''} */}
                {conversations?conversations.map(message=>
                {return (
                    <Fragment>
                    <div><p>Conversation Begins Here</p></div>
                <div>{message.map((msg)=>
                    {return (<div>
                <p className='text-primary'>From: </p> <p>{msg.from}</p> 
                <p className='text-primary'>To: </p> <p>{msg.to}</p> 
                <p className='text-primary'>Date: </p> <p>{msg.date}</p> 
                <p className='text-primary'>Message: </p> <p>{msg.message}</p> 
                {message.indexOf(msg)===message.length-1?<Link to={`/user/${msg.msgId}`} className="btn btn-dark"> Reply </Link>:null}
                {/* <p className='text-primary'>Message Id: </p> <p>{msg.msgId}</p>  */}
                </div>)
                })}</div>
                
                <hr/>
                    </Fragment>
                )
                }):"None"}
                 {/* <div className='Event_info'>
                 {/* <Link to={`/event/${_id}`} className="text-dark"> view details</Link> */}
                 {/* <hr/>
                 </div> */}
                </div>
            </div>
            
            </div>
            {/* </div>
            </div> */}
            {/* <div className="column2"> */}
            {/* <form className="form" onSubmit={(e) => onSubmit(e)}>
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
         </form> */}

            {/* </div> */}
            

        </div>
                </div>

            </Fragment>}
            {/* {conversations?conversations.map(message=>{return (message.map((msg)=>{return (<p>From: {msg.from} <br/>To: {msg.to}<br/> {msg.message}<br/></p>)}))}):"None"} */}
        </Fragment>
    )
}

ChatMessages.propTypes = {
    getUserConversations: PropTypes.func.isRequired,
    getAllRestProfiles: PropTypes.func.isRequired,
    getCurrentUserProfile: PropTypes.func.isRequired,
    message: PropTypes.object.isRequired,
    restprofile: PropTypes.object.isRequired,
    userprofile: PropTypes.object.isRequired,
    restprofiles: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    restprofile: state.restprofile,
    message: state.message,
    userprofile: state.userprofile,
    restprofiles: state.restprofiles
})

export default connect(mapStateToProps, {getUserConversations, getAllRestProfiles, getCurrentUserProfile})(ChatMessages)
