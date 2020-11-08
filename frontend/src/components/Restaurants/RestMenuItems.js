import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import DashboardNav from '../layout/DashboardNav';
import { connect } from 'react-redux';
import { getRestProfilebyId } from '../../actions/restprofile';
import Spinner from '../layout/spinner';
import Paginate from '../Paginate'

const RestMenuItems = ({getRestProfilebyId, restprofile: { restprofile, loading }, match}) => {
    
    useEffect(() => {
        getRestProfilebyId(match.params.id);
    }, [])

    const [curPage, setCurPg] = useState(1);
    const [dishesPerPage, setDishesPerPage] = useState(1);

    const lastpostidx = curPage * dishesPerPage;
    const firstpostidx = lastpostidx-dishesPerPage;

    const paginate = pg => setCurPg(pg);

    let newobj = {};
    if(!loading || restprofile) {
        // console.log ("rest profile menu items",restprofile.menuitems)
        let uniqCategories = restprofile.menuitems.map((item) => item.itemCategory);
        uniqCategories = [...new Set(uniqCategories)];
        
        uniqCategories.map((it) => {
          newobj[it] = restprofile.menuitems.filter((el) => el.itemCategory === it);
        });
        
        console.log('inside rest menu items, unique categories, ', uniqCategories);
        console.log('inside rest menu items, newobj is',newobj)
        console.log('inside rest menu items, uniqCategories length is', uniqCategories.length)
    }
    // else{
    //   windows reload
    // }
    // console.log('inside rest menu items, new obj is ', newobj);
    const backendimagesserver = "http://localhost:3001/api/getdishimages/"
    return (
        loading || restprofile === null ? <Spinner /> : <Fragment>
    <DashboardNav />
    <div className='container'>
    {restprofile !== null ? <Fragment>
       
        <div className="info">
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

        </div>
        <br></br>
        <Link to="/restaurantspage" className=" btn btn-light">
              Go Back to Restaurants Page
            </Link>
            
            <hr/>
            {restprofile.menuitems !==null ?
            <Fragment>
                {newobj? Object.keys(newobj).slice(firstpostidx,lastpostidx).map((k, idx) => {
                    return (
                    <div>
                       <h3> {k} </h3>
                       {newobj[k].map((indi) => (
                           <Fragment>
                             <div className="card mb-3">
                             <div className="row no-gutters">
                             <div className="col-md-4">
                             {indi.dishimages.length>0?indi.dishimages.map(imgname=>{return (<img src ={`${backendimagesserver}/${indi.itemName}/${imgname}`}/>)}):null}
                             </div>
                             <div class="col-md-8">
                             <div class="card-body">
                             <h4 className="text-dark bold">
                                   {indi.itemName}
                                 </h4>
                                 <br/>
                                 <h4 className="text-black">
                                   Description: {' '} {indi.itemDescription}
                                 </h4>
                                 <br/>
                                 <h4 className="text-black">
                                   Ingrediants: {' '} {indi.itemIngredients}
                                 </h4>
                                 <br/>
                                 <h4 className="text-black"> {indi.itemPrice} </h4>

                             </div>
                             <br/>
                             <div>
                                 <Link
                                   to={`/orders/create/${restprofile.restuser._id}/${indi._id}`}
                                   className="btn btn-dark small"
                                 >
                                   PlaceOrder
                                 </Link>
                             </div>
                             </div>
                             </div>
                             </div>
                             
                             <br/>
                         </Fragment>
                       ))}
                    </div>)
                } ):"none"}
              <Paginate itemsPerPage={dishesPerPage} totalItems={3} paginate={paginate}/>
            </Fragment> : <Spinner/>}
           
            </Fragment> : <Fragment>
                <p className='lead text-dark'> This restaurant does not have menuitems yet</p>
                </Fragment>}
    </div>
    
</Fragment>
    )
}

RestMenuItems.propTypes = {
    getRestProfilebyId: PropTypes.func.isRequired,
    restprofile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    restprofile: state.restprofile
})

export default connect(mapStateToProps, {getRestProfilebyId})(RestMenuItems);
