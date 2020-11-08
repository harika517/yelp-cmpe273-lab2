import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import Spinner from '../layout/spinner'
import {getAllUserProfiles,getCurrentUserProfile} from '../../actions/userprofile'
import DashboardNav from '../layout/DashboardNav';
import YelpUserItem from './YelpUserItem';
import Paginate from '../Paginate'

const CurrentlyFollowing = ({getCurrentUserProfile, getAllUserProfiles, userprofile:{userprofile,userprofiles, loading}}) => {

    useEffect(()=>{
        getCurrentUserProfile(),
          getAllUserProfiles();
      }, [loading])

      const [curPage, setCurPg] = useState(1);
    const [profilesPerPage, setProfilesPerPage] = useState(2);

    const lastpostidx = curPage * profilesPerPage;
    const firstpostidx = lastpostidx-profilesPerPage;

    const paginate = pg => setCurPg(pg);

    return (
        <Fragment>
            <DashboardNav/>
            <br/>

            {loading ? <Spinner/> : <Fragment>
                <Link to='/userdashboard' className="btn btn-dark"> Go Back</Link>
                
                <div className="container">
                
                {/* <div className="container_2columns">
                <div className="column1"> */}
                <h1 className="lead text-dark"> People I am Following...
                </h1>
                <br/>
                <div className='profiles'>
                    {/* {userprofiles.length > 0 ? (
                        userprofiles.slice(firstpostidx,lastpostidx).map(profile=>(
                            <YelpUserItem key={profile._id} profile={profile}/>
                        ))): <p>No Profiles were found ...</p>} */}
                </div>
                <Paginate itemsPerPage={profilesPerPage} totalItems={userprofiles.length} paginate={paginate}/>
                {/* </div>
                </div> */}
                </div>
                </Fragment>}
        </Fragment>
    )
}

CurrentlyFollowing.propTypes = {
    getCurrentUserProfile: PropTypes.func.isRequired,
    getAllUserProfiles: PropTypes.func.isRequired,
    userprofile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    userprofile: state.userprofile
})

export default connect(mapStateToProps, {getCurrentUserProfile, getAllUserProfiles})(CurrentlyFollowing)
