import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../../layout/Navbar';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../../actions/alert';
import { restregister } from '../../../actions/auth';

const RestRegister = ({ setAlert, restregister, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        restName: '',
        restEmail: '',
        restpassword: '',
        location: ''

    });

    const { restName, restEmail, restpassword, location } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        restregister({ restName, restEmail, restpassword, location });
    }

    if (isAuthenticated) {
        return <Redirect to='/restdashboard'></Redirect>
    }
    return (
        <Fragment>
            <Navbar />
            <section className="container">
                <h4 className="text-dark"> Sign Up as Restaurant Owner </h4>
                <p className="lead">
                    <i className="fas fa-user"> </i>
                Sign Up for Yelp
                </p>
                <form className="form" onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Restaurant Name"
                            name="restName"
                            // defaultValue={Cust_Name}
                            value={restName}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="restEmail"
                            value={restEmail}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="restpassword"
                            value={restpassword}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Location"
                            name="location"
                            value={location}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <input type="submit" className="btn btn-dark" value="SignUp" />
                    <Link to="/" className="btn btn-light">
                        Cancel
                    </Link>
                </form>
                <p className="my-1">
                    Already on yelp ?
                    <Link to="/restlogin" className="text-dark">
                        Sign In
                    </Link>
                </p>
            </section>
        </Fragment>
    )
}

RestRegister.propTypes = {
    setAlert: PropTypes.func.isRequired,
    restregister: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, restregister })(RestRegister);
