import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
            <div className="navBar">
                <img
                    className="logo-icon"
                    src="https://s3-media4.fl.yelpcdn.com/assets/srv0/yelp_styleguide/c3484759c57a/assets/img/logos/logo_desktop_xlarge.png"
                ></img>

            </div>
            <Link className="text-light medium" to='/'>Home</Link>
        </nav>
    )
}

export default Navbar;