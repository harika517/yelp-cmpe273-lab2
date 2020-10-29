import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import Spinner from '../layout/spinner'
import {getAllRestProfiles} from '../../actions/restprofile'
import DashboardNav from '../layout/DashboardNav';
import RestPrfoileItem from './RestPrfoileItem';

const RestaurantsPage = ({getAllRestProfiles, restprofile:{restprofiles, loading}}) => {
    useEffect(()=>{
        getAllRestProfiles();
    }, [])
    return (
        <Fragment>
            <DashboardNav/>
            {loading ? <Spinner/> : <Fragment>
                
                <div className="container">
                <div className="container_2columns">
                <div className="column1">
                <h1 className="lead text-dark"> Restaurant Results
                {' '}<Link to='/userdashboard' className="btn btn-dark"> Go Back</Link>
                </h1>
                <div claasName='profiles'>
                    {restprofiles.length > 0 ? (
                        restprofiles.map(profile=>(
                            <RestPrfoileItem key={profile._id} profile={profile}/>
                        ))): <p>No Profiles were found ...</p>}
                </div>
                <div className="column2">
                    
                </div>
                </div>
                </div>
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
