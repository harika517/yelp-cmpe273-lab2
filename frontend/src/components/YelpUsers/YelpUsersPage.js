import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import Spinner from '../layout/spinner'
import {getAllUserProfiles, getAllProfilesByName, getCurrentUserProfile} from '../../actions/userprofile'
import DashboardNav from '../layout/DashboardNav';
import YelpUserItem from './YelpUserItem';
import Paginate from '../Paginate'


const YelpUsersPage = ({getCurrentUserProfile, getAllUserProfiles, getAllProfilesByName, userprofile:{userprofile,userprofiles, loading}}) => {
    useEffect(()=>{
      getCurrentUserProfile(),
        getAllUserProfiles();
    }, [loading])

    const [curPage, setCurPg] = useState(1);
    const [profilesPerPage, setProfilesPerPage] = useState(2);

    const lastpostidx = curPage * profilesPerPage;
    const firstpostidx = lastpostidx-profilesPerPage;

    const paginate = pg => setCurPg(pg);

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
                
                {/* <div className="container_2columns">
                <div className="column1"> */}
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
                <Link to="/usersfollowing" className="btn btn-dark" type="button"> Currently Following</Link>
                <br/>
                <br/>
                <div className='profiles'>
                    {userprofiles.length > 0 ? (
                        userprofiles.slice(firstpostidx,lastpostidx).map(profile=>(
                            <YelpUserItem key={profile._id} profile={profile}/>
                        ))): <p>No Profiles were found ...</p>}
                </div>
                <Paginate itemsPerPage={profilesPerPage} totalItems={userprofiles.length} paginate={paginate}/>
                {/* </div>
                </div> */}
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
