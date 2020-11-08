import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import DashboardNav from '../layout/DashboardNav';
import { connect } from 'react-redux';
import { getCurrentRestProfile } from '../../actions/restprofile';
import Spinner from '../layout/spinner';
import insertDishImage from "../../actions/uploaddishimages"


const ViewMenuItems =({ getCurrentRestProfile, restprofile: { restprofile, loading },insertDishImage })=> {

    useEffect(() => {
        getCurrentRestProfile();
        setImage({
          file:loading || !restprofile? <Spinner/> : restprofile.menuitems[0].dishimages[0],
          fileText: "Choose Image..",
          itemName: loading || !restprofile? <Spinner/> : restprofile.menuitems[0].itemName
        })
    }, [loading])

    const [image,setImage] = useState({
      file: "",
      fileText: "",
      itemName:""
    })

    const dishImageChange = (e)=>{
      console.log("image file name is ",e.target.files[0].name)
      setImage({file:e.target.files[0],fileText: e.target.files[0].name,itemName: e.target.id})
    }

    const dishImageSave = (e) => {
      e.preventDefault();
      console.log ("inside dishImageSave image file to be sent is",image.file)
      console.log ("inside dishImageSave item name to be sent is",image.itemName)
      insertDishImage(image.file, image.itemName)
    }

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
    const backendimagesserver = "http://localhost:3001/api/getdishimages/"
    
    return loading && restprofile === null ? <Spinner /> : <Fragment>
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
                             {indi.dishimages.length>0?indi.dishimages.map(imgname=>{return (<img src ={`${backendimagesserver}/${indi.itemName}/${imgname}`}/>)}):null}
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
                                 <br/>
                                 <form onSubmit={(e)=>dishImageSave(e)}>
            <div className="file-field input-field">
              <div className="btn #64b5f6 blue darken-1">
                <span>Upload Dish Image</span>
                <input type ="file" id={indi.itemName} onChange={(e)=>dishImageChange(e)}/>
              </div>
            </div>
            <br/>
            <button type="submit" className="btn btn-dark">
              Upload Dish Pic
            </button>
            </form>
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
    insertDishImage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    restprofile: state.restprofile
})

export default connect(mapStateToProps, { getCurrentRestProfile,insertDishImage })(ViewMenuItems);
