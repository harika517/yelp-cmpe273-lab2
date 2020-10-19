import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../../layout/Navbar';
import { restLogin } from '../../../actions/auth';

const RestLogin = ({ restLogin, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        restEmail: '',
        restpassword: '',
    });

    const { restEmail, restpassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        restLogin(restEmail, restpassword);
    }

    //Redirect on successful login
    if (isAuthenticated) {
        return <Redirect to="/restdashboard"></Redirect>
    }
    return (
        <Fragment>
            <Navbar />
            <section className="container">
                <h4 className="text-dark"> Signin as Restaurant Owner </h4>
                <p className="lead">
                    <i className="fas fa-user"> </i>
                Sign In for Yelp
                </p>
                <form className="form" onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="restEmail"
                            value={restEmail}
                            onChange={(e) => onChange(e)}
                        //required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="restpassword"
                            value={restpassword}
                            onChange={(e) => onChange(e)}
                        //required
                        />
                    </div>
                    <input type="submit" className="btn btn-dark" value="SignIn" />
                    <Link to="/" className="btn btn-light">
                        Cancel
                    </Link>
                </form>
                <p className="my-1">
                    Not on yelp ?
                    <Link to="/restregister" className="text-dark">
                        Sign Up
                    </Link>
                </p>
            </section>
        </Fragment>
    )
}

RestLogin.propTypes = {
    restLogin: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { restLogin })(RestLogin);
