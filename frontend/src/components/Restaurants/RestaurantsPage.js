import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import Spinner from '../layout/spinner'
import {getAllRestProfiles} from '../../actions/restprofile'
import DashboardNav from '../layout/DashboardNav';
import RestPrfoileItem from './RestPrfoileItem';
import Paginate from '../Paginate'


function compare (a,b) {
    const restName1 = a.restuser.restName
    const restName2 = b.restuser.restName
    let comparison = 0
    if (restName1>restName2) {
        comparison = 1;
    } else if (restName1 < restName2) {
    comparison = -1;
  }
  return comparison;
}

const RestaurantsPage = ({getAllRestProfiles, restprofile:{restprofiles, loading}}) => {
    useEffect(()=>{
        getAllRestProfiles();
    }, [loading])

    // const [profiles, setPosts] = useState([]);
    const [curPage, setCurPg] = useState(1);
    const [profilesPerPage, setProfilesPerPage] = useState(2);

    const lastpostidx = curPage * profilesPerPage;
    const firstpostidx = lastpostidx-profilesPerPage;

    const paginate = pg => setCurPg(pg);

    if (restprofiles){
        console.log("before sort restprofiles is",restprofiles)
        restprofiles.sort(compare)
        console.log("after sort restprofiles is",restprofiles)
    }

    return (
        <Fragment>
            <DashboardNav/>
            <br/>

            {loading ? <Spinner/> : <Fragment>
                <Link to='/userdashboard' className="btn btn-dark"> Go Back</Link>
                
                <div className="container">
                
                {/* <div className="container_2columns">
                <div className="column1"> */}
                <h1 className="lead text-dark"> Restaurant Results
                
                </h1>
                <div className='profiles'>
                    {restprofiles.length > 0 ? (
                        restprofiles.slice(firstpostidx,lastpostidx).map(profile=>(
                            <RestPrfoileItem key={profile._id} profile={profile}/>
                        ))): <p>No Profiles were found ...</p>}
                </div>
                <Paginate itemsPerPage={profilesPerPage} totalItems={restprofiles.length} paginate={paginate}/>
              
                {/* </div>
                </div> */}
                </div>
                </Fragment>}
        </Fragment>
    )
}

RestaurantsPage.propTypes = {
    getAllRestProfiles: PropTypes.func.isRequired,
    restprofile: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    restprofile: state.restprofile
})

export default connect(mapStateToProps, {getAllRestProfiles})(RestaurantsPage);
