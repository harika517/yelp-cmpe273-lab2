import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import Spinner from '../layout/spinner'
import {getAllUserProfiles, getAllProfilesByName, getCurrentUserProfile} from '../../actions/userprofile'
import DashboardNav from '../layout/DashboardNav';
import YelpUserItem from './YelpUserItem';

const YelpUsersPage = ({getCurrentUserProfile, getAllUserProfiles, getAllProfilesByName, userprofile:{userprofiles, loading}}) => {
    useEffect(()=>{
      getCurrentUserProfile(),
        getAllUserProfiles();
    }, [])

    const [formData, setFormData] = useState({
        fnname: '',

      });
    
      const { fnname} = formData;
    
      const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const onSubmit = (e) => {
        e.preventDefault();
        getAllProfilesByName(fnname);
      };

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
            <button className="btn btn-dark" type="submit"> Search</button>
            
            </div>
            
          </form>
           <hr/>
                </h1>
                <button className="btn btn-dark" type="button"> Currently Following</button>
                <br/>
                <br/>
                <div className='profiles'>
                    {userprofiles.length > 0 ? (
                        userprofiles.map(profile=>(
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
