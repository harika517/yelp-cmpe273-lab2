import React, {Fragment, useEffect, useState} from 'react'
 import PropTypes from 'prop-types'
import {getRestaurantOrders, getOrdersByOrderStatusRest} from '../../actions/orders'
import {getUserProfiles} from '../../actions/userprofile'
import { getCurrentRestMenuItems} from '../../actions/menuitems'
import {getCurrentRestProfile} from '../../actions/restprofile'
import {Link} from 'react-router-dom';
import DashboardNav from '../layout/DashboardNav';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import { TableFooter } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


const RestaurantOrders = ({
    getCurrentRestProfile,
    getRestaurantOrders, 
    getUserProfiles, 
    userprofile:{userprofiles, loading}, 
    restprofile:{restprofile},
    orders, 
    getOrdersByOrderStatusRest, 
    getCurrentRestMenuItems }) => {
    
    useEffect(()=>{
        getUserProfiles()
        getRestaurantOrders()
        getCurrentRestMenuItems()
        getCurrentRestProfile()
    }, [])

    const [formData, setFormData] = useState({
        orderStatusSearch: '',

      });

      const { orderStatusSearch} = formData;
      console.log("orderStatusSearch", orderStatusSearch)

    let temp1  = null
    if (userprofiles)
    {
        console.log("userprofiles is",userprofiles)
    }

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const onClick = (e) => {
        e.preventDefault();
        console.log("button clicked")
        getOrdersByOrderStatusRest(orderStatusSearch);
      };

      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(2);

      const handleChangePage = (event, newPage) => {

        setPage(newPage);
        
        };
        
        
        const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        
        setPage(0);
        
          };


    if (!loading)
    {if (orders && restprofile)
    {
        orders.ordersplaced.map(order=>{
            let{userId, menuId} = order;
            console.log ("user id is",userId)      
            let userp = userprofiles.filter(profile=>String(profile.user) ===String(userId))
            console.log ("user profiles is", userprofiles)
            console.log ("userp is ", userp)
            let userName = userp[0].firstName
            console.log ("user name is",userName)
            let {menuitems} = restprofile
            let menuI = menuitems.filter(item=>String(item._id).trim()===String(menuId))
            let {itemName} = menuI[0]
            order.userName = userName
            order.itemName = itemName
        })
    }
// console.log ("after modification, orders is",orders)
}
const classes = useStyles();
    return (
        loading && userprofiles===null && orders === null? <Spinner /> : <Fragment>
            <DashboardNav/>
            <br/>
            <br/>
            <div className="container">
            <Link to="/restdashboard" className="btn btn-dark"> Back</Link>
            <br/>
            <br/>
            <div>
            <label for="orderStatus">Filter By</label>
            {' '}
  <select name="orderStatus" className="btn btn-light" name="orderStatusSearch"
                value={orderStatusSearch}
                onChange={(e) => onChange(e)}>
                    <option value="none">Select One</option>
    <option value="New_Order">New_Order</option>
    <option value="Cancelled">Cancelled</option>
    <option value="Delivered">Delivered</option>
  </select>
  <button className="btn btn-dark" onClick={(e) => onClick(e)}> Go </button>
            </div>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell align="right">User Name</TableCell>
            <TableCell align="right">Order Status</TableCell>
            <TableCell align="right">Delivery Method</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {orders?orders.ordersplaced.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage).map((row)=>(
    <TableRow key={row._id}>
        <TableCell component="th" scope="row">
            {row.itemName}
        </TableCell>
        <TableCell align="right">
            <Link to={`/userprofile/${row.userId}`} className="text-primary"> {row.userName} </Link>
        </TableCell>
        <TableCell align="right">
            {row.orderStatus}
        </TableCell>
        <TableCell align="right">
            {row.deliveryMethod}
        </TableCell>
        <TableCell align="right">
            {row.Quantiy}
        </TableCell>
        <TableCell align="right">
            {row.date}
        </TableCell>
        <TableCell align="right">
            <Link to={`updateorderstatus/${row._id}`} className="btn btn-dark"> Update</Link>
        </TableCell>

    </TableRow>
)):"none"}
          </TableBody>
          
                </Table>
                <TablePagination
        rowsPerPageOptions={[1, 2, 3]}
        component="div"
        count={orders.ordersplaced.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
            </TableContainer>

            </div>

            
        </Fragment>
    )
}

RestaurantOrders.propTypes = {
    getRestaurantOrders: PropTypes.func.isRequired,
    getUserProfiles: PropTypes.func.isRequired,
    getCurrentRestMenuItems: PropTypes.func.isRequired,
    userprofile: PropTypes.object.isRequired,
    restprofile: PropTypes.object.isRequired,
    orders: PropTypes.object.isRequired,
    getOrdersByOrderStatusRest: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    userprofile: state.userprofile, 
    restprofile: state.restprofile,
    orders: state.orders
})

export default connect(mapStateToProps,{getCurrentRestProfile, getRestaurantOrders, getUserProfiles, getOrdersByOrderStatusRest, getCurrentRestMenuItems} )(RestaurantOrders);
