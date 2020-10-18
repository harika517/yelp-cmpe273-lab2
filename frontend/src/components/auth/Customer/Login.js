import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/layout/Navbar';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        userEmail: '',
        password: ''
    })

    const { userEmail, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault();
        console.log("Success")
        // const newUser = {
        //     userName, firstName, lastName, userEmail, password
        // }

        // try {
        //     const config = {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }
        //     const body = JSON.stringify(newUser);
        //     const res = await axios.post('/api/users', body, config);
        //     console.log(res.data)
        // } catch (err) {
        //     console.error(err.message.data)
        // }
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

export default Login;
