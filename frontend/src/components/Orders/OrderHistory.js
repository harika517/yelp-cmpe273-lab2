import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {getOrderHistory, getOrdersByOrderStatusUsers} from '../../actions/orders'
import {getAllRestProfiles} from '../../actions/restprofile'
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
// import { TableFooter } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const OrderHistory = ({getOrderHistory, getAllRestProfiles, restprofile:{restprofiles, loading}, orders, getOrdersByOrderStatusUsers}) => {

    useEffect(()=>{
        getAllRestProfiles()
        getOrderHistory()
    }, [])

    const [formData, setFormData] = useState({
        orderStatusSearch: '',

      });

      const { orderStatusSearch} = formData;
      console.log("orderStatusSearch", orderStatusSearch)
    
      const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const onClick = (e) => {
        e.preventDefault();
        getOrdersByOrderStatusUsers(orderStatusSearch);
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

    if (restprofiles)
    {
        console.log("restprofiles is",restprofiles)
    }
    if (!loading)
    {if (orders)
    {
        orders.ordersplaced.map(order=>{
            let{restId, menuId} = order;           
            let restp = restprofiles.filter(profile=>String(profile.restuser._id) ===String(restId))
            let {restName} = restp[0].restuser
            let menuI = restp[0].menuitems.filter(item=>String(item._id).trim()===String(menuId))
            let {itemName} = menuI[0]
            order.restName = restName
            order.itemName = itemName
        })
    }
console.log ("after modification, orders is",orders)
}
const classes = useStyles();
    return (
        loading && restprofiles===null && orders === null? <Spinner /> : <Fragment>
            <DashboardNav/>
            
        <div className="container">
   
            {/* {orders?orders.ordersplaced.map(order => order.restId):"no orders"} */}
      
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
            <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell align="right">Restaurant Name</TableCell>
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
            {row.restName}
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

        <div>
            <label for="orderStatus">Filter By</label>
            {' '}
  <select name="orderStatus" className="btn btn-light" name="orderStatusSearch"
                value={orderStatusSearch}
                onChange={(e) => onChange(e)}>
    <option value="Order received">Order received</option>
    <option value="Preparing">Preparing</option>
    <option value="On the way">On the way</option>
    <option value="Delivered">Delivered</option>
    <option value="Pick up ready">Pick up ready</option>
    <option value="Picked up">Picked up</option>
  </select>
  <button className="btn btn-dark" onClick={(e) => onClick(e)}> Go </button>
            </div>
        </Fragment>
                  
        
    )
}


OrderHistory.propTypes = {
    getOrderHistory: PropTypes.func.isRequired,
    getAllRestProfiles: PropTypes.func.isRequired,
    restprofile: PropTypes.object.isRequired,
    orders: PropTypes.object.isRequired,
    getOrdersByOrderStatusUsers: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    restprofile: state.restprofile, 
    orders: state.orders
})


export default connect(mapStateToProps, {getOrderHistory, getAllRestProfiles, getOrdersByOrderStatusUsers})(OrderHistory)
