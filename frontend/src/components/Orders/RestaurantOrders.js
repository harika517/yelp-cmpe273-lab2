import React, {Fragment, useEffect, useState} from 'react'
 import PropTypes from 'prop-types'
import {getRestaurantOrders, getOrdersByOrderStatusRest} from '../../actions/orders'
import {getUserProfiles} from '../../actions/userprofile'
import { getCurrentRestMenuItems} from '../../actions/menuitems'
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
    getRestaurantOrders, 
    getUserProfiles, 
    userprofile:{userprofiles, loading}, 
    orders, 
    getOrdersByOrderStatusRest, 
    getCurrentRestMenuItems }) => {
    
    useEffect(()=>{
        getUserProfiles()
        getRestaurantOrders()
        getCurrentRestMenuItems()
    }, [])

    let temp1  = null
    if (userprofiles)
    {
        console.log("userprofiles is",userprofiles)
    }

    if (!loading)
    {if (orders)
    {
        orders.ordersplaced.map(order=>{
            let{userId, menuId} = order;           
            let userp = userprofiles.filter(profile=>String(profile.user._id) ===String(userId))
            let {userName} = userp[0].user
            let menuI = userp[0].menuitems.filter(item=>String(item._id).trim()===String(menuId))
            let {itemName} = menuI[0]
            order.userName = userName
            order.itemName = itemName
        })
    }
console.log ("after modification, orders is",orders)
}
const classes = useStyles();
    return (
        loading && userprofiles===null && orders === null? <Spinner /> : <Fragment>
            <DashboardNav/>
            <div className="container">
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
          {orders?orders.ordersplaced.map((row)=>(
    <TableRow key={row._id}>
        <TableCell component="th" scope="row">
            {row.itemName}
        </TableCell>
        <TableCell align="right">
            {row.userName}
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
    orders: PropTypes.object.isRequired,
    getOrdersByOrderStatusRest: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    userprofile: state.userprofile, 
    orders: state.orders
})

export default connect(mapStateToProps,{getRestaurantOrders, getUserProfiles, getOrdersByOrderStatusRest, getCurrentRestMenuItems} )(RestaurantOrders);
