import React, { Fragment, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import DashboardNav from '../layout/DashboardNav';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {writeReview} from '../../actions/restprofile'

const WriteReviews =({writeReview, history, match})=> {
    const [formData, setFormData] = useState({
        rating: '',
        review: '',
      });

      const {
        rating,
        review
      } = formData;

      const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const onSubmit = (e) => {
      e.preventDefault();
      writeReview(match.params.id, formData, history);
    };

    return (
        <Fragment>
            <DashboardNav/>
            <div className='container'>
            <h1 className="text-dark medium">Add Review</h1>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
          <label for="rating">Rating</label>
          <br />
          <small className="form-text">This field is required.</small>
          {/* <select name="rating">
  <option value={rating}>1</option>
  <option value={rating}>2</option>
  <option value={rating}>3</option>
  <option value={rating}>4</option>
  <option value={rating}>5</option>
</select> */}
          <input
            type="text"
            name="rating"
            min="1"
            max="5"
            pattern = '[1-5]$'
            title="Please enter number between 1-5"
            value={rating}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="review">Review</label>
          <br />
          <small className="form-text">This field is required.</small>
          <textarea
            type="text"
            name="review"
            rows="4" 
            cols="50"
            value={review}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-dark my-1" value="Submit"/>
        <Link className="btn btn-light my-1" to="/restaurantspage">
          Cancel
        </Link>
            </form>
            </div>
        </Fragment>
    )
}

WriteReviews.propTypes = {
    writeReview: PropTypes.func.isRequired,
}

export default connect(null, {writeReview})(WriteReviews)
