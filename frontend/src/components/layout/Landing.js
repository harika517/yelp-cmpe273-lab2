import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <section className="landing ">
            <div className="landing-inner">
                <div>
                    <ul>
                        <li>
                            <Link to="/events">Events</Link>
                        </li>
                        <li>
                            <Link to="/reviews">Write a Review</Link>
                        </li>
                        <li>
                            <Link to="/register">SignUp</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </div>
                <img
                    className="logo-icon-large"
                    src="https://s3-media4.fl.yelpcdn.com/assets/srv0/yelp_styleguide/c3484759c57a/assets/img/logos/logo_desktop_xlarge.png"
                />
                <br />
                {/* <div className="search-container">
          <form className="search-form" onSubmit={(e) => onSubmit(e)}>
            <input
              type="text"
              className="medium"
              placeholder="Dishes, Location, Cuisine, Restaurants..."
              name="search"
              value={search}
              onChange={(e) => onChange(e)}
            />
            <Link
              to={`/searchbar/results/${search}`}
              className="btn-search"
              type="submit"
            >
              <i className="fa fa-search medium"></i>
            </Link>
          </form>
        </div> */}
                <br />
                {/* <div className="options">
                    <ul className="search-options">
                        <li>
                            <Link to="/restaurantresults" className="text-light bold medium">
                                {' '}
                                <i className="fas fa-utensils medium" /> Restaurants
              </Link>
                        </li>
                        <li>
                            <Link to="/curbsidepickup" className="text-light bold medium">
                                {' '}
                                <i className="fas fa-gift medium" /> Curb Side PickUp
              </Link>
                        </li>
                        <li>
                            <Link to="/dinein" className="text-light bold medium">
                                {' '}
                                <i className="fas fa-glass-martini-alt medium" /> Dine In
              </Link>
                        </li>
                        <li>
                            <Link to="/yelpdelivery" className="text-light bold medium">
                                {' '}
                                <i className="fas fa-motorcycle medium" /> Yelp-Delivery
              </Link>
                        </li>
                    </ul>
                </div> */}
            </div>
        </section>
    )
}

export default Landing;