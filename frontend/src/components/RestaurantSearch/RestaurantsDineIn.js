import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import Spinner from '../layout/spinner'
import {getRestaurantsDineIn} from '../../actions/restsearchresults'
import Navbar from '../layout/Navbar'
import RestItemDetail from './RestItemDetail';
import Paginate from '../Paginate'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const RestaurantsDineIn = ({getRestaurantsDineIn, restprofile:{restprofiles, loading}}) => {

    useEffect(()=>{
        getRestaurantsDineIn();
    }, [])

    const [curPage, setCurPg] = useState(1);
    const [profilesPerPage, setProfilesPerPage] = useState(2);

    const lastpostidx = curPage * profilesPerPage;
    const firstpostidx = lastpostidx-profilesPerPage;

    const paginate = pg => setCurPg(pg);
    const mapStyles = {
        height: "100vh",
        width: "100%"};

        const defaultCenter = {
            lat: 37.352390, lng: -121.953079
          }

    let location = {lat:41.3851,lng:2.1734}
    let arrobj = [location]
    if (restprofiles) {
        arrobj = restprofiles?restprofiles.slice(firstpostidx,lastpostidx).map(it=>{return {lat:it.restuser.lat,lng:it.restuser.lng}}):[location]}

    return (
        <Fragment>
            <Navbar/>
            <br/>
            {loading ? <Spinner/> : <Fragment>
                
                <div className="container">
                
                {/* <div className="container_2columns">
                <div className="column1"> */}
                <h1 className="lead text-dark"> Restaurant Results
                
                </h1>
                <Link to="/" className="btn btn-dark">Home</Link>
                <div claasName='profiles'>
                    {restprofiles.length > 0 ? (
                        restprofiles.slice(firstpostidx,lastpostidx).map(profile=>(
                            <RestItemDetail key={profile._id} profile={profile}/>
                        ))): <p>No Profiles were found ...</p>}
                </div>
                <Paginate itemsPerPage={profilesPerPage} totalItems={restprofiles.length} paginate={paginate}/>
                {/* </div>
                </div> */}
                </div> 
                </Fragment>}
                <LoadScript
       googleMapsApiKey='AIzaSyBaWrNiyni5r6dlgNfuz9IpMNFyumFTI0s'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        >
          {arrobj?arrobj.map(item=>{
            location = {lat:parseFloat(item.lat),lng:parseFloat(item.lng)}
            console.log ("location is",location)
            return (<Marker key={"hello "} position={location}/>)
          }):null}
          </GoogleMap>
     </LoadScript>
        </Fragment>
    )
}

RestaurantsDineIn.propTypes = {
    getRestaurantsDineIn: PropTypes.func.isRequired,
    restprofile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    restprofile: state.restprofile
})
export default connect(mapStateToProps, {getRestaurantsDineIn})(RestaurantsDineIn)
