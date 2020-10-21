import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import DashboardNav from '../layout/DashboardNav';
import { connect } from 'react-redux';
import { getCurrentRestProfile } from '../../actions/restprofile';
import Spinner from '../layout/spinner';

const RestDashboard = ({ getCurrentRestProfile, auth: { user }, restprofile: { restprofile, loading } }) => {

    useEffect(() => {
        getCurrentRestProfile();
    }, [])
    // if (auth) {
    //     console.log("restdashboard", auth);
    // }
    return loading && restprofile === null ? <Spinner /> : <Fragment>
        <DashboardNav />
        <div className="container_2columns">
            {user ? console.log("this is user info", user.RestName) : console.log("no user info")}
            <div className="column1">
                <h1 className="heading text-dark">{user && user.RestName}</h1>
                Restaurant dashboard
            </div>
        </div>
        {/* <br />
        <br />
        <h1 className="text-dark">{user && user.RestName}</h1> */}

    </Fragment>
}

RestDashboard.propTypes = {
    getCurrentRestProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    restprofile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    restprofile: state.restprofile
})

export default connect(mapStateToProps, { getCurrentRestProfile })(RestDashboard);
