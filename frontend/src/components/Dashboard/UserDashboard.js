import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCurrentUserProfile } from '../../actions/userprofile';
import DashboardNav from '../layout/DashboardNav';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';


const UserDashboard = ({ getCurrentUserProfile, auth: { user, loading }, userprofile }) => {
    useEffect(() => {
        getCurrentUserProfile();
    }, [])
    if (!loading) {
        console.log("userdashboard", user.userName)
    }

    return loading ? <Spinner /> : <Fragment>
        <DashboardNav />
        <div className='container'>
            <div className="container_2columns">
                <div className="column1">
                    <h1 className="heading text-dark">{user && user.userName}</h1>
                User Dhashboard
            </div>
            </div>
        </div>
    </Fragment>

}

UserDashboard.propTypes = {
    getCurrentUserProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    userprofile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    userprofile: state.userprofile
})

export default connect(mapStateToProps, { getCurrentUserProfile })(UserDashboard);

// const UserDashboard = () => {
//     return <div> userdashboard</div>
// }

// export default UserDashboard;