import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';
import DashboardNav from '../layout/DashboardNav';
import { getUserProfilebyId } from '../../actions/userprofile';

const UserProfile = ({ getUserProfilebyId, match }) => {
    console.log("inside component",match.params.id)
    useEffect(() => {
        getUserProfilebyId(match.params.id)
    }, [])

    return (
        <div>
            user profile
        </div>
        // <Fragment>
        //     {loading ? <Spinner/> : (yelpuser === null ? 
        //     <Fragment>
        //         <DashboardNav/>
        //         <div className='container'>
        //         <Link to='/yelpuserspage' className='btn btn-dark'> Back </Link>
        //         </div>
        //     </Fragment>

        //     : <Fragment>
        //         <DashboardNav/>
        //         <br/>

        //         <div className="container">
        //             <h1 className='lead text-dark'> User Details</h1>
        //         <div className='profile'>
        //         <img src={yelpuser.user.image} alt=""/>
        //         <div>
        //         <h3 className=" text-dark"> About {yelpuser.user.firstName}...</h3>
        //         <br/>

        //             <h4 className='text-black'> Full Name : {' '}
        //             {yelpuser.user.firstName? yelpuser.user.firstName: ''}
        //             {' '} {yelpuser.user.lastName? yelpuser.user.lastName: ''}
        //             </h4>
        //         <br/>
        //         {yelpuser.nickName ? <div>
        //         <h4 className="text-black"> Nick Name : {' '}{yelpuser.nickName}</h4>
        //         </div> : ''}
        //         <br/>
        //         {yelpuser.dateOfBirth ? <div>
        //         <h4 className="text-black"> Date of Birth : {' '} {yelpuser.dateOfBirth}</h4>
        //         </div> : ''}
        //         <br/>
        //         {yelpuser.findmein ? <div>
        //         <h4 className="text-black"> Find Me In : {' '}{yelpuser.findmein}</h4>
        //         </div> : ''}
        //         <br/>
        //         {yelpuser.myBlog ? <div>
        //         <h4 className="text-black"> My Blog :{' '} {yelpuser.myBlog}</h4>
        //         </div> : ''}
        //         <br/>
        //         {yelpuser.thingsILove ? <div>
        //         <h4 className="text-black"> Things I Love : {' '}{yelpuser.thingsILove}</h4>
        //         </div> : ''}
        //         <br/>
        //         {yelpuser.yelpingSince ? <div>
        //         <h4 className="text-black"> Yelping Since :{' '}{yelpuser.yelpingSince}</h4>
        //         </div> : ''}
        //         <br/>
        //         <h4 className='text-black'> Lives In : {' '}
        //         {yelpuser.city? yelpuser.city: ''},{' '}
        //         {yelpuser.state? yelpuser.state: ''},{' '}
        //         {yelpuser.country? yelpuser.country: ''},{' '}
        //         </h4>
        //         <br/>
        //         {yelpuser.user.userEmail ? <div>
        //         <h4 className="text-black"> Email : {' '} {yelpuser.user.userEmail}</h4>
        //         </div> : ''}
        //         <br/>
        //     {yelpuser.contact ? <div>
        //         <h4 className="text-black"> Contact : {' '}{yelpuser.contact}</h4>
        //         </div> : ''}
        //         <br/>
        //         <Link to='/yelpuserspage' className='btn btn-dark'> Go Back YelpUsers</Link>
        //         <button className='btn btn-light' onClick={(e) => onClick(e)} value={userId}> Follow</button>
        //         <br/>
        //         </div>
        //         </div>
        //         </div>

        //         </Fragment>)}
        // </Fragment>
    )
}

UserProfile.propTypes = {
    getUserProfilebyId: PropTypes.func.isRequired,

    // userprofile: PropTypes.object.isRequired,

}

// const mapStateToProps = state => ({
//  userprofile: state.userprofile
// })

export default connect(null, { getUserProfilebyId })(UserProfile)