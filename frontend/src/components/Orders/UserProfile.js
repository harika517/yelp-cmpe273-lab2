import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';
import DashboardNav from '../layout/DashboardNav';
import { getUserProfilebyId } from '../../actions/userprofile';


const UserProfile = ({ getUserProfilebyId, userprofile: { yelpuser, loading }, match }) => {

        useEffect(() => {
            getUserProfilebyId(match.params.id)
        }, [])

        const backendimageserver = "http://54.183.189.222:3001/api/userimages/user/"
        return ( <
                Fragment > {
                    loading ? < Spinner / > : (yelpuser === null ?
                        <
                        Fragment >
                        <
                        DashboardNav / >
                        <
                        div className = 'container' >
                        <
                        p className = 'lead text-dark' > No profile created
                        for this user < /p>  <
                        Link to = '/restaurantorders'
                        className = 'btn btn-dark' > Back < /Link> < /
                        div > <
                        /Fragment>

                        :
                        <
                        Fragment >
                        <
                        DashboardNav / >
                        <
                        br / >

                        <
                        div className = "container" >
                        <
                        h1 className = 'lead text-dark' > User Details < /h1> <
                        div className = 'profile' >
                        <
                        img src = {
                            yelpuser.user.image.file ?
                            `${backendimageserver}${yelpuser.user.image}` : `${backendimageserver}image`
                        }
                        alt = "Profile Picture" /
                        >
                        <
                        div >
                        <
                        h3 className = " text-dark" > About { yelpuser.user.firstName }... < /h3> <
                        br / >

                        <
                        h4 className = 'text-black' > Full Name: { ' ' } { yelpuser.user.firstName ? yelpuser.user.firstName : '' } { ' ' } { yelpuser.user.lastName ? yelpuser.user.lastName : '' } <
                        /h4> <
                        br / > {
                            yelpuser.nickName ? < div >
                            <
                            h4 className = "text-black" > Nick Name : { ' ' } { yelpuser.nickName } < /h4> < /
                            div >: ''
                        } <
                        br / > {
                            yelpuser.dateOfBirth ? < div >
                            <
                            h4 className = "text-black" > Date of Birth : { ' ' } { yelpuser.dateOfBirth } < /h4> < /
                            div >: ''
                        } <
                        br / > {
                            yelpuser.findmein ? < div >
                            <
                            h4 className = "text-black" > Find Me In : { ' ' } { yelpuser.findmein } < /h4> < /
                            div >: ''
                        } <
                        br / > {
                            yelpuser.myBlog ? < div >
                            <
                            h4 className = "text-black" > My Blog : { ' ' } { yelpuser.myBlog } < /h4> < /
                            div >: ''
                        } <
                        br / > {
                            yelpuser.thingsILove ? < div >
                            <
                            h4 className = "text-black" > Things I Love : { ' ' } { yelpuser.thingsILove } < /h4> < /
                            div >: ''
                        } <
                        br / > {
                            yelpuser.yelpingSince ? < div >
                            <
                            h4 className = "text-black" > Yelping Since : { ' ' } { yelpuser.yelpingSince } < /h4> < /
                            div >: ''
                        } <
                        br / >
                        <
                        h4 className = 'text-black' > Lives In: { ' ' } { yelpuser.city ? yelpuser.city : '' }, { ' ' } { yelpuser.state ? yelpuser.state : '' }, { ' ' } { yelpuser.country ? yelpuser.country : '' }, { ' ' } <
                        /h4> <
                        br / > {
                            yelpuser.user.userEmail ? < div >
                            <
                            h4 className = "text-black" > Email : { ' ' } { yelpuser.user.userEmail } < /h4> < /
                            div >: ''
                        } <
                        br / > {
                            yelpuser.contact ? < div >
                            <
                            h4 className = "text-black" > Contact : { ' ' } { yelpuser.contact } < /h4> < /
                            div >: ''
                        } <
                        br / >
                        <
                        Link to = '/restaurantorders'
                        className = 'btn btn-dark' > Back < /Link> <
                        Link to = { `/message/${yelpuser.user._id}` }
                        className = 'btn btn-dark' > Message < /Link> <
                        br / >
                        <
                        /div> < /
                        div > <
                        /div>

                        <
                        /Fragment>)} < /
                        Fragment >
                    )
                }

                UserProfile.propTypes = {
                    getUserProfilebyId: PropTypes.func.isRequired,
                    userprofile: PropTypes.object.isRequired,

                }

                const mapStateToProps = state => ({
                    userprofile: state.userprofile
                })

                export default connect(mapStateToProps, { getUserProfilebyId })(UserProfile)