import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import DashboardNav from '../layout/DashboardNav';
import { connect } from 'react-redux';
import { getCurrentRestProfile } from '../../actions/restprofile';
import Spinner from '../layout/spinner';

const ViewMenuItems =({ getCurrentRestProfile, restprofile: { restprofile, loading } })=> {

    useEffect(() => {
        getCurrentRestProfile();
    }, [])
    let newobj = {};
    if(!loading) {
        console.log ("rest profile menu items",restprofile.menuitems)
        let uniqCategories = restprofile.menuitems.map((item) => item.itemCategory);
        uniqCategories = [...new Set(uniqCategories)];
        
        uniqCategories.map((it) => {
          newobj[it] = restprofile.menuitems.filter((el) => el.itemCategory === it);
        });
        
        console.log('inside rest menu items, unique categories, ', uniqCategories);
    }
    console.log('inside rest menu items, new obj is ', newobj);
    
    return loading && restprofile === null ? <Spinner /> : <Fragment>
    <DashboardNav />
    <div className='container'>
    {restprofile !== null ? <Fragment>
                    <h4 className="lead">{restprofile.restuser.restName}</h4>
                    <h4 className="text-black">{restprofile.cuisine} Cuisine </h4>
                    <h4>
                        <i className="far fa-clock"> </i> {restprofile.timings}
                    </h4>
                    <h4>
                <i className="fas fa-map-marked-alt text-dark"> </i> {' '}{restprofile.restuser.location}
                </h4>
                <h4>
                <i className="fas fa-envelope-open-text text-dark"> </i> {' '}{restprofile.restuser.restEmail}
                </h4>
                <br></br>
                <Link to="/addmenuitem" className=" btn btn-dark">
                Add Menu
            </Link>
            <Link to="/restdashboard" className=" btn btn-light">
              Go Back
            </Link>
            <hr/>
            {restprofile.menuitems !==null ?
            <Fragment>
                {newobj? Object.keys(newobj).map((k, idx) => {
                    return (
                    <div>
                       <h3> {k} </h3>
                       {newobj[k].map((indi) => (
                           <fragment>
                           <div className="card mb-3">
                           <div className="row no-gutters">
                             <div className="col-md-4">
                             <img
                                 src='#'
                                 alt="Item Picture"
                               />
                             </div>
                             <div class="col-md-8">
                             <div class="card-body">
                                 <h4 className="text-dark bold">
                                   {indi.itemName}
                                 </h4>
                                 <h4 className="text-black">
                                   {indi.itemDescription}
                                 </h4>
                                 <h4 className="text-black">
                                   Ingrediants: {indi.itemIngredients}
                                 </h4>
                                 <h4 className="text-black"> {indi.itemPrice} </h4>
                               </div>
                               <br/>
                               <div>
                                 <Link
                                   to={`/editmenuitem/${indi._id}`}
                                   className="btn btn-dark small"
                                 >
                                   Edit
                                 </Link>
                               </div>
                             </div>
                             </div>
                             
                             </div>
                             <br/>
                         </fragment>
                       ))}
                    </div>)
                } ):"none"}
            </Fragment> : "something"}
            
           
            </Fragment> : <Fragment>
                <p className='lead text-dark'> This restaurant does not have menuitems yet</p>
                <Link className='small text-primary' to='#'>Add Menu item ?</Link>
                </Fragment>}
    </div>
</Fragment>
}

ViewMenuItems.propTypes = {
    getCurrentRestProfile: PropTypes.func.isRequired,
    restprofile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    restprofile: state.restprofile
})

export default connect(mapStateToProps, { getCurrentRestProfile })(ViewMenuItems);
