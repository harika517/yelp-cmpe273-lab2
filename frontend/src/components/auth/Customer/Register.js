import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../layout/Navbar';
import { setAlert } from '../../../actions/alert';
import { register } from '../../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register }) => {
    const [formData, setFormData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        userEmail: '',
        password: '',
    });

    const {
        userName, firstName, lastName, userEmail, password,
    } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('success', formData);
        // if (password !== '123456') {
        //     setAlert('Please enter 123456 as password', 'danger');
        // } else {
        register({ userName, firstName, lastName, userEmail, password });
        // };
    }

    return (
        <Fragment>
            <Navbar />
            <section className="container">
                <h1 className="large text-dark"> Sign Up </h1>
                <p className="lead">
                    <i className="fas fa-user"> </i>
                Sign Up for Yelp
                </p>
                <form className="form" onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="username"
                            name="userName"
                            // defaultValue={Cust_Name}
                            value={userName}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="userEmail"
                            value={userEmail}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                            minLength='6'
                        />
                    </div>
                    <input type="submit" className="btn btn-dark" value="SignUp" />
                    <Link to="/" className="btn btn-light">
                        Cancel
                    </Link>
                </form>
                <p className="my-1">
                    Already on yelp ?
                    <Link to="/login" className="text-dark">
                        Sign In
                    </Link>
                </p>
            </section>
        </Fragment>
    );
};

Register.PropTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
}

export default connect(null, { setAlert, register })(Register);
