import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import DashboardNav from '../layout/DashboardNav';
import { connect } from 'react-redux';
import { getCurrentRestProfile } from '../../actions/restprofile';
import Spinner from '../layout/spinner';
import insertImage from "../../actions/uploadimage";
import insertRestImage from "../../actions/uploadrestimages"

const RestDashboard = ({ getCurrentRestProfile, auth: { user }, restprofile: { restprofile, loading },insertImage, insertRestImage }) => {

    useEffect(() => {
        getCurrentRestProfile();
        setImage({file:loading || !restprofile.restuser.image ? "" : restprofile.restuser.image,
      fileText: "Choose Image.."})
        setRestImage({file:loading|| !restprofile.restimages?"":restprofile.restimages[restprofile.restimages.length-1]})
    }, [loading])
    const [image,setImage] = useState({
      file: "",
      fileText: "",
    })
    const [restImage,setRestImage] = useState({
      file: "",
      fileText: "",
    })
    const imageChange = (e)=>{
      console.log("image file name is ",e.target.files[0].name)
      setImage({file:e.target.files[0],fileText: e.target.files[0].name})
    }

    const restImageChange = (e)=>{
      console.log("image file name is ",e.target.files[0].name)
      setRestImage({file:e.target.files[0],fileText: e.target.files[0].name})
    }


    const imageSave = (e) => {
      e.preventDefault();
      console.log("inside imageSave, file is ", image.file);
      console.log("inside imageSave, fileText is ", image.fileText);
      console.log("inside imageSave, email to be sent is,",restprofile.restuser.restEmail)
      insertImage(image.file, restprofile.restuser.restEmail)
      // const newimg = "rest_"+string(restprofile.restuser._id)+"."
      if (restprofile.restuser.image)
      {
        setImage({file:restprofile.restuser.image})
      }
    }
    const restImageSave = (e) => {
      e.preventDefault();
      console.log("inside restImageSave, file is ", restImage.file);
      console.log("inside restImageSave, fileText is ", restImage.fileText);
      console.log("inside restImageSave, restName is",restprofile.restuser.restName)
      insertRestImage(restImage.file,restprofile.restuser.restName)
      // const newimg = "rest_"+string(restprofile.restuser._id)+"."
    }
    if (restprofile){
      console.log ("this is the image file name from restprofile",restprofile.restuser.image);
      console.log("no restprofile yet");
    }
    const backendimageserver = "http://localhost:3001/api/images/rest/"
    const backendimagesserver = "http://localhost:3001/api/restimages/"
    console.log ("restprofile is {}",restprofile)
    return loading && restprofile === null ? <Spinner /> : <Fragment>
        <DashboardNav />
        <div className='container'>
        <div className="container_2columns">
            <div className="column1">
            <img
             src={
               image.file
                 ? `${backendimageserver}${image.file}`
                 : `${backendimageserver}image`
             }
            alt="Profile Picture"
          />
                {restprofile !== null ? <Fragment>
                    <h1 className="large text-black">{restprofile.restuser.restName}</h1>
                <h3 className='lead'> Ratings: {restprofile.reviews? (restprofile.reviews[0]? restprofile.reviews[0].rating: 'No reviews yet'): 'No reviews yet'}</h3>
                <h3 className="lead">{restprofile.cuisine} Cuisine </h3>
                <h4>
                <i className="far fa-clock"> </i> {restprofile.timings}
                </h4>
                <Link to="#" className=" btn btn-dark"><i className='fas fa-star'></i>
              Write a Review
            </Link>
            <Link to="/restaurant/events" className=" btn btn-light">
              Events
            </Link>
            <Link to="/viewmenu" className=" btn btn-light">
              Menu
            </Link>
            <Link to="/restaurantorders" className=" btn btn-light">
              Orders
            </Link>
            <Link className='small text-primary' to='/updateprofile'>Update Profile</Link>
            <hr/>
            <br/>
            <form onSubmit={(e)=>imageSave(e)}>
            <div className="file-field input-field">
              <div className="btn #64b5f6 blue darken-1">
                <span>Upload Image</span>
                <input type ="file" onChange={(e)=>imageChange(e)}/>
              </div>
            </div>
            <br/>
            <button type="submit" className="btn btn-dark">
              Upload Profile Pic
            </button>
            </form>
            <hr/>
            <h4>
             {restprofile.description}
                </h4>
            <h2> Services Update</h2>
            <div className='list'>
              <ul>
                <li>
                {restprofile.DineIn === 'yes' ? (
                <h3 className="small text-dark">
                <i className="fas fa-check" /> DineIn{' '}
              </h3>
            ): (
                <h3 className="small text-dark">
                <i className="fas fa-times" /> DineIn{' '}
              </h3>
            )}

                </li>
                <li>
                {restprofile.curbSidePickUp === 'yes' ? (
                <h3 className="small text-dark">
                <i className="fas fa-check" /> CurbSidePickUp{' '}
              </h3>
            ): (
                <h3 className="small text-dark">
                <i className="fas fa-times" /> CurbSidePickUp{' '}
              </h3>
            )}
                </li>
                <li>
                {restprofile.yelpDelivery === 'yes' ? (
                <h3 className="small text-dark">
                <i className="fas fa-check" /> YelpDelivery{' '}
              </h3>
            ): (
                <h3 className="small text-dark">
                <i className="fas fa-times" /> YelpDelivery{' '}
              </h3>
            )}
                </li>
              </ul>
            </div>
            
            <hr/>
            <h2> Reviews</h2>
            {restprofile.reviews
              ? restprofile.reviews.map((item) => (
                <div>
                  <h4>
                    {item.rating} {' '} {item.date} 
                    <br/>
                    {item.review}
                  </h4>
                  <hr/>
                  </div>
                ))
              : 'No reviews yet'}
                </Fragment> : <Fragment>
                    <p className='lead text-dark'> This restaurant does not have profile yet</p>
                    <Link className='small text-primary' to='/createprofile'>Create One ?</Link>
                    </Fragment>}
            </div>
            <div  className="column2">
              {restprofile? <Fragment> 
                <div className = "info">
                <h4>
                <i className="fas fa-phone-alt text-dark" ></i> {' '}{restprofile.contact}
                </h4>
                <h4>
                <i className="fas fa-map-marked-alt text-dark"> </i> {' '}{restprofile.restuser.location}
                </h4>
                <h4>
                <i className="fas fa-envelope-open-text text-dark"> </i> {' '}{restprofile.restuser.restEmail}
                </h4>
                </div>
              </Fragment>: <p className='lead text-dark'> No Restaurant contact</p>}
                <form onSubmit={(e)=>restImageSave(e)}>
            <div className="file-field input-field">
              <div className="btn #64b5f6 blue darken-1">
                <span>Upload Restaurant Image</span>
                <input type ="file" onChange={(e)=>restImageChange(e)}/>
              </div>
            </div>
            <br/>
            <button type="submit" className="btn btn-dark">
              Upload Restaurant Images
            </button>
            </form>
            <div>
              {restprofile?restprofile.restimages.map(image=><img src={`${backendimagesserver}/${restprofile.restuser.restName}/${image}`}/>):"No Images"}
            </div>

            </div>
        </div>
        </div>
    </Fragment>
}

RestDashboard.propTypes = {
    getCurrentRestProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    restprofile: PropTypes.object.isRequired,
    insertImage: PropTypes.func.isRequired,
    insertRestImage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    restprofile: state.restprofile
})

export default connect(mapStateToProps, { getCurrentRestProfile, insertImage, insertRestImage })(RestDashboard);
