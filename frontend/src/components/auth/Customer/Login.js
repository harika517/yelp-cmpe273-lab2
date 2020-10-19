import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../../../components/layout/Navbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../actions/auth';
import axios from 'axios';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        userEmail: '',
        password: ''
    })

    const { userEmail, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();
        login(userEmail, password);
    }

    //redirect if logged in

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <Fragment>
            <Navbar />
            <section className='container'>
                <h1 className="large text-dark"> Login </h1>{' '}
                <p className="lead">
                    <i className="fas fa-user"> </i> Login for Yelp{' '}
                </p>{' '}
                <form className="form" onSubmit={e => onSubmit(e)}>

                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="userEmail"
                            value={userEmail}
                            onChange={(e) => onChange(e)}
                        // required
                        />{' '}
                    </div>{' '}
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                        // required
                        />{' '}
                    </div>{' '}
                    <input type="submit" className="btn btn-dark" value="Login" />
                    <Link to="/" className="btn btn-light">
                        Cancel
                    </Link>
                </form>{' '}
                <p className="my-1">
                    Not on yelp ?{' '}
                    <Link to="/register" className="text-dark">
                        Sign Up{' '}
                    </Link>{' '}
                </p>{' '}
            </section>

        </Fragment>
    )
}
Login.PropTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
