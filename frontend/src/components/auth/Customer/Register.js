import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../../components/layout/Navbar'

const Register = () => {
    const [formData, setFormData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        userEmail: '',
        password: ''
    })

    const { userName, firstName, lastName, userEmail, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    return (
        <Fragment>
            <Navbar />
            <section className='container'>
                <h1 className="large text-dark"> Sign Up </h1>{' '}
                <p className="lead">
                    <i className="fas fa-user"> </i> Sign Up for Yelp{' '}
                </p>{' '}
                <form className="form">
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="username"
                            name="userName"
                            // defaultValue={Cust_Name}
                            value={userName}
                            onChange={(e) => onChange(e)}
                        />{' '}
                    </div>{' '}
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => onChange(e)}
                        />{' '}
                    </div>{' '}
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => onChange(e)}
                        />{' '}
                    </div>{' '}
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="userEmail"
                            value={userEmail}
                            onChange={(e) => onChange(e)}
                        />{' '}
                    </div>{' '}
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                        />{' '}
                    </div>{' '}
                    <input type="submit" className="btn btn-dark" value="SignUp" />
                </form>{' '}
                <p className="my-1">
                    Already on yelp ?{' '}
                    <Link to="/login" className="text-dark">
                        Sign In{' '}
                    </Link>{' '}
                </p>{' '}
            </section>

        </Fragment>
    )
}

export default Register;
