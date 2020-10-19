import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import DashboardNav from '../layout/DashboardNav';
import { connect } from 'react-redux';
import { getCurrentRestProfile } from '../../actions/restprofile';

const RestDashboard = ({ getCurrentRestProfile, auth, restprofile }) => {

    useEffect(() => {
        getCurrentRestProfile();
    }, [])
    return (

        <div>
            <DashboardNav />
            Create restaurant dahsboard here
        </div>
    )
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
