import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Spinner from '../layout/spinner';
import DashboardNav from '../layout/DashboardNav';
import {getUserProfilebyId} from '../../actions/userprofile';

const RegisteredCustProfile = ({getUserProfilebyId, userprofile:{userprofile, loading}, match}) => {
    useEffect(()=>{
        getUserProfilebyId(match.params.id)
    }, [])

    return (
        <Fragment>
            {loading ? <Spinner/> : (userprofile === null ? 
            <Fragment>
                <DashboardNav/>
                <div className='container'>
                <p className='lead text-dark'> No profile created for this user </p> 
                <Link to='/restaurant/events' className='btn btn-dark'> Back </Link>
                </div>
            </Fragment>
            
            : <Fragment>
                <DashboardNav/>
                <br/>
                
                <div className="container">
                    <h1 className='lead text-dark'> User Details</h1>
                <div className='profile'>
                <img src={userprofile.user.image} alt=""/>
                <div>
                <h3 className=" text-dark"> About {userprofile.user.firstName}...</h3>
                <br/>
            
                    <h4 className='text-black'> Full Name : {' '}
                    {userprofile.user.firstName? userprofile.user.firstName: ''}
                    {' '} {userprofile.user.lastName? userprofile.user.lastName: ''}
                    </h4>
                <br/>
                {userprofile.nickName ? <div>
                <h4 className="text-black"> Nick Name : {' '}{userprofile.nickName}</h4>
                </div> : ''}
                <br/>
                {userprofile.dateOfBirth ? <div>
                <h4 className="text-black"> Date of Birth : {' '} {userprofile.dateOfBirth}</h4>
                </div> : ''}
                <br/>
                {userprofile.findmein ? <div>
                <h4 className="text-black"> Find Me In : {' '}{userprofile.findmein}</h4>
                </div> : ''}
                <br/>
                {userprofile.myBlog ? <div>
                <h4 className="text-black"> My Blog :{' '} {userprofile.myBlog}</h4>
                </div> : ''}
                <br/>
                {userprofile.thingsILove ? <div>
                <h4 className="text-black"> Things I Love : {' '}{userprofile.thingsILove}</h4>
                </div> : ''}
                <br/>
                {userprofile.yelpingSince ? <div>
                <h4 className="text-black"> Yelping Since :{' '}{userprofile.yelpingSince}</h4>
                </div> : ''}
                <br/>
                <h4 className='text-black'> Lives In : {' '}
                {userprofile.city? userprofile.city: ''},{' '}
                {userprofile.state? userprofile.state: ''},{' '}
                {userprofile.country? userprofile.country: ''},{' '}
                </h4>
                <br/>
                {userprofile.user.userEmail ? <div>
                <h4 className="text-black"> Email : {' '} {userprofile.user.userEmail}</h4>
                </div> : ''}
                <br/>
            {userprofile.contact ? <div>
                <h4 className="text-black"> Contact : {' '}{userprofile.contact}</h4>
                </div> : ''}
                <br/>
                <Link to='/restaurant/events' className='btn btn-dark'> Go to Events</Link>
                <br/>
                </div>
                </div>
                </div>
                
                </Fragment>)}
        </Fragment>
    )
}

RegisteredCustProfile.propTypes = {
    getUserProfilebyId: PropTypes.func.isRequired,
    userprofile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
 userprofile: state.userprofile
})

export default connect(mapStateToProps, {getUserProfilebyId})(RegisteredCustProfile)
