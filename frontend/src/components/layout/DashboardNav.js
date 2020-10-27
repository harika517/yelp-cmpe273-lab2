import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const DashboardNav = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul className="search-options">
            <li>
                <Link to='/restdashboard' className='text-black'>
                    <i className='fas fa-user'></i> {' '} Profile</Link>
            </li>
            <li>
                <Link onClick={logout} to='/' className='text-black'>
                    <i className='fas fa-sign-out-alt'></i> {' '} Logout</Link>
            </li>
        </ul>

    );
    return (
        <nav className="dashboardnav">
            <div className="options">
                <ul className="search-options">
                    <li>
                        <img
                            className="logo-icon"
                            src="https://s3-media4.fl.yelpcdn.com/assets/srv0/yelp_styleguide/c3484759c57a/assets/img/logos/logo_desktop_xlarge.png"
                        ></img>
                    </li>
                    <li>
                        {isAuthenticated && authLinks}
                    </li>
                </ul>


            </div>

        </nav>
    )
}

DashboardNav.PropTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(DashboardNav);