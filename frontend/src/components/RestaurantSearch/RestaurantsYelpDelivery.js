import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import Spinner from '../layout/spinner'
import {getRestaurantsYelpDelivery} from '../../actions/restsearchresults'
import Navbar from '../layout/Navbar'
import RestItemDetail from './RestItemDetail';

const RestaurantsYelpDelivery = ({getRestaurantsYelpDelivery, restprofile:{restprofiles, loading}}) => {

    useEffect(()=>{
        getRestaurantsYelpDelivery();
    }, [])

    return (
        <Fragment>
            <Navbar/>
            <br/>
            {loading ? <Spinner/> : <Fragment>
                
                <div className="container">
                
                <div className="container_2columns">
                <div className="column1">
                <h1 className="lead text-dark"> Restaurant Results
                
                </h1>
                <div claasName='profiles'>
                    {restprofiles.length > 0 ? (
                        restprofiles.map(profile=>(
                            <RestItemDetail key={profile._id} profile={profile}/>
                        ))): <p>No Profiles were found ...</p>}
                </div>
                <div className="column2">
                
                </div>
                </div>
                </div>
                </div> 
                </Fragment>}
        </Fragment>
    )
}

RestaurantsYelpDelivery.propTypes = {
    getRestaurantsYelpDelivery: PropTypes.func.isRequired,
    restprofile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    restprofile: state.restprofile
})

export default connect(mapStateToProps, {getRestaurantsYelpDelivery})(RestaurantsYelpDelivery)
