import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { getCurrentUserProfile } from '../../actions/userprofile';
import DashboardNav from '../layout/DashboardNav';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';
import insertUserImage from "../../actions/uploaduserimage";


const UserDashboard = ({ getCurrentUserProfile, auth: { user}, userprofile: { userprofile, loading }, insertUserImage }) => {
    useEffect(() => {
        getCurrentUserProfile();
        setImage({file:loading || !userprofile? <Spinner/> : userprofile.user.image,
      fileText: "Choose Image.."})
    }, [loading])

    const [image,setImage] = useState({
        file: "",
        fileText: "",
      })

      const imageChange = (e)=>{
        // console.log("image file name is ",e.target.files[0].name)
        setImage({file:e.target.files[0],fileText: e.target.files[0].name})
      }

      const imageSave = (e) => {
        e.preventDefault();
        // console.log("inside imageSave, file is ", image.file);
        // console.log("inside imageSave, fileText is ", image.fileText);
        // console.log("inside imageSave, email to be sent is,",userprofile.user.userEmail);
        //console.log (insertImage)
        insertUserImage(image.file, userprofile.user.userEmail);
        // const newimg = "rest_"+string(restprofile.restuser._id)+"."
        if (userprofile.user.image)
        {
          setImage({file:userprofile.user.image})
        }
      }
      // if (userprofile){
      //   console.log ("this is the image file name from userprofile",userprofile.user.image);
      //   console.log("no userprofile yet");
      // }
      const backendimageserver = "http://54.183.189.222:3001/api/userimages/user/"
      // console.log ("userprofile is {}",userprofile)
  
    return loading && userprofile === null? <Spinner /> : <Fragment>
        <DashboardNav />
        <div className="container">
        <div className="container_3columns">
        
        {userprofile !== null ? <Fragment>
            <div className="column_1">
            <img
             src={
                image.file
                  ? `${backendimageserver}${image.file}`
                  : `${backendimageserver}image`
             }
            alt="Profile Picture"
          />
            <h3 className="lead">
            {userprofile.user.userName}'s Profile
            </h3>
            <hr/>
            <Link to="/userdashboard" className="text-black">
            <i className="fas fa-user text-dark" /> {' '} Profile Overview
            </Link>
            <hr/>
            <Link to="/yelpuserspage" className="text-black">
            <i className="fas fa-users text-dark" /> {' '} Yelp Users
            </Link>
            <hr/>
            <Link to="/events" className="text-black">
            <i className="fas fa-calendar-check text-dark" /> {' '} Events
            </Link>
            <hr/>
            <Link to="/orderhistory" className="text-black">
            <i className="fas fa-tag text-dark" /> {' '} Order History
            </Link>
            <hr/>
            <Link to="/restaurantspage" className="text-black">
            <i className="fas fa-utensils text-dark" /> {' '} Restaurants
            </Link>
            <hr/>
            <Link to="/chatmessages" className="text-black">
            <i className="far fa-comments  text-dark" /> {' '} Messages
            </Link>
            <hr/>

            </div>
            <div className="column_2">
            <h3 className="lead">
            {userprofile.user.userName}.
            </h3>
        <h4> <i className="fas fa-home text-dark" ></i>
        {' '}{userprofile.city}, {userprofile.state}, {userprofile.country}
        </h4>
        <br/>
        <h4> "{ userprofile.headline}"</h4>
            <hr/>
            <h3 className=" text-dark"> Notifications</h3>
            <p> No new friend requests or compliments at this time</p>
            <h3 className=" text-dark"> Recent Activities</h3>
            <p> We dont have any recent activities</p>
            </div>
            <div className="column_3">
                <div className='leftborder'>
            <Link to="/userdashboard" className="text-primary">
            <i className="fas fa-camera text-primary" /> {' '} Add Profile Photos
            </Link>
            <form onSubmit={(e)=>imageSave(e)}>
            <div className="file-field input-field">
              <div className="btn #64b5f6 blue darken-1">
                <span>Upload Image</span>
                <input type ="file" onChange={(e)=>imageChange(e)}/>
              </div>
            </div>
            <br/>
            <button type="submit" className="btn btn-dark">
              Upload Profile Pic
            </button>
            </form>
            <br/>
            <Link to="/edituserprofile" className="text-primary">
            <i className="fas fa-id-card text-primary" /> {' '} Update your profile
            </Link>
            </div>
            <hr/>

            <div className='leftborder'>
            <h3 className=" text-dark"> About {userprofile.user.firstName}.</h3>
            {userprofile.user.userEmail ? <div>
                <h4 className="text-black"> Email</h4>{userprofile.user.userEmail}
                </div> : ''}
            {userprofile.contact ? <div>
                <h4 className="text-black"> Contact</h4>{userprofile.contact}
                </div> : ''}
                
                {userprofile.dateOfBirth ? <div>
                <h4 className="text-black"> Date of Birth</h4>{userprofile.dateOfBirth}
                </div> : ''}
                {userprofile.findmein ? <div>
                <h4 className="text-black"> Find Me In</h4>{userprofile.findmein}
                </div> : ''}
                {userprofile.myBlog ? <div>
                <h4 className="text-black"> My Blog</h4>{userprofile.myBlog}
                </div> : ''}
                {userprofile.nickName ? <div>
                <h4 className="text-black"> Nickname</h4>{userprofile.nickName}
                </div> : ''}
                {userprofile.thingsILove ? <div>
                <h4 className="text-black"> Things I Love</h4>{userprofile.thingsILove}
                </div> : ''}
                {userprofile.yelpingSince ? <div>
                <h4 className="text-black"> Yelping Since</h4>{userprofile.yelpingSince}
                </div> : ''}
            
            <h3 className=" text-dark"></h3>
            </div>
            </div>
            </Fragment> : <Fragment><h3 className="text-black"> No Profile for this user yet </h3> 
            <br/>
            <Link to="/createuserprofile" className="text-dark"> Create One?</Link>  
               
            </Fragment>
            
            }
            
        </div> 
        </div>   
      
    </Fragment>

}

UserDashboard.propTypes = {
    getCurrentUserProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    userprofile: PropTypes.object.isRequired,
    insertUserImage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    userprofile: state.userprofile
})

export default connect(mapStateToProps, { getCurrentUserProfile, insertUserImage })(UserDashboard);
