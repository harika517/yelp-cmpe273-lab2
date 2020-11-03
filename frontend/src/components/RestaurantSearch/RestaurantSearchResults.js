import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {getRestaurantsSearchCriteria} from '../../actions/restsearchresults'
import {connect} from "react-redux"

const RestaurantSearchResults = ({getRestaurantsSearchCriteria, match}) => {
    useEffect(()=>{
        getRestaurantsSearchCriteria(match.params.id)
    })
    return (
        <div>
            Show Restaurant Results here 
        </div>
    )
}

RestaurantSearchResults.propTypes = {
    getRestaurantsSearchCriteria: PropTypes.func.isRequired,
}

export default connect(null, {getRestaurantsSearchCriteria})(RestaurantSearchResults)
