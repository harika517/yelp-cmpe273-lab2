import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import Spinner from '../layout/spinner'
import {getAllUserProfiles, getAllProfilesByName, getCurrentUserProfile} from '../../actions/userprofile'
import DashboardNav from '../layout/DashboardNav';
import YelpUserItem from './YelpUserItem';

const YelpUsersPage = ({getCurrentUserProfile, getAllUserProfiles, getAllProfilesByName, userprofile:{userprofile,userprofiles, loading}}) => {
    useEffect(()=>{
      getCurrentUserProfile(),
        getAllUserProfiles();
        //setDisplayProfiles({displayProfiles:loading || !userprofiles ? "" : userprofiles})
    }, [loading])

    const [formData, setFormData] = useState({
        fnname: '',

      });
    const [dispProfile,setDisplayProfiles] = useState (userprofiles)

    console.log ("displayprofiles is",dispProfile)
    console.log ("userprofiles is",userprofiles)
    // if (userprofiles){
    //   setDisplayProfiles({displayProfiles:userprofiles})
    // }
      const { fnname} = formData;
    
      const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const onSubmit = (e) => {
        e.preventDefault();
        getAllProfilesByName(fnname);
        setDisplayProfiles(userprofiles.filter(prof=>prof.user.firstName))
        console.log ("profiles searched, profiles displayed would be",dispProfile)
      };

      const onClick = () => {
        const followingUsers = userprofile.following.map(prof=>prof.userId)
        console.log ("following users is",followingUsers)
        setDisplayProfiles(userprofiles.filter(prof=>followingUsers.includes(prof.user._id)))
        console.log ("following button clicked, profiles displayed would be",dispProfile)
      }

    return ( 
    <Fragment>
            <DashboardNav/>
            <br/>

            {loading ? <Spinner/> : <Fragment>
                <Link to='/userdashboard' className="btn btn-dark"> Go Back</Link>
                
                <div className="container">
                
                <div className="container_2columns">
                <div className="column1">
                <h1 className="lead text-dark"> Yelp User Results
                <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label for="search" className="lead text-primary">Search Users</label>
              <input
                type="text"
                placeholder="FirstName/NickName/Location"
                name="fnname"
                value={fnname}
                onChange={(e) => onChange(e)}
              ></input>
            <br/>
            <button className="btn btn-dark" type="submit" > Search</button>
            
            </div>
            
          </form>
           <hr/>
                </h1>
                <button className="btn btn-dark" type="button" onClick={(e) => onClick(e)}> Currently Following</button>
                <br/>
                <br/>
                <div className='profiles'>
                    {dispProfile.length > 0 ? (
                        dispProfile.map(profile=>(
                            <YelpUserItem key={profile._id} profile={profile}/>
                        ))): <p>No Profiles were found ...</p>}
                </div>
                <div className="column2">
                
                </div>
                </div>
                </div>
                </div>
                </Fragment>}
        </Fragment>)
}

YelpUsersPage.propTypes = {
   getCurrentUserProfile: PropTypes.func.isRequired,
    getAllUserProfiles: PropTypes.func.isRequired,
    getAllProfilesByName: PropTypes.func.isRequired,
    userprofile : PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    userprofile: state.userprofile
})

export default connect(mapStateToProps, {getCurrentUserProfile, getAllUserProfiles, getAllProfilesByName})(YelpUsersPage);
