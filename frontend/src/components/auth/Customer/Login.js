import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../../components/layout/Navbar'

const Login = () => {
    return (
        <Fragment>
            <Navbar />
            <section className='container'>
                <h1 className="large text-dark">Login</h1>
                <p className="lead">
                    <i className="fas fa-user"></i> Login yelp
      </p>
                <form className="form">
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="Cust_email_id"
                        // value={Cust_email_id}
                        // onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="Cust_Password"
                        // value={Cust_Password}
                        // onChange={(e) => onChange(e)}
                        />
                    </div>
                    <input type="submit" className="btn btn-dark" value="Login" />
                </form>
                <p className="my-1">
                    Dont have yelp account?{' '}
                    <Link to="/register" className="text-dark">
                        SignUp
        </Link>
                </p>
            </section>

        </Fragment>

    )
}

export default Login;
