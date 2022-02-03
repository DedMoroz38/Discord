import React from "react";
import '../components.css';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { NavLink } from 'react-router-dom';
import FriendsMenu from "./friendsMenu";







const Friends = () => {


    return (
        <div className="friendsBox">
            <div className="friendsBoxTop">
                <div className="friendsHeader">
                    <PersonAddAlt1Icon />
                    <p className="addFriendText">Friends</p>
                </div>
                <NavLink to="/friends/all" className="friendsRoutes">All</NavLink>
                <NavLink to="/friends/pending" className="friendsRoutes">Pending</NavLink>
                <NavLink to="/friends/requests" className="friendsRoutes">Requests</NavLink>
                <NavLink to="/friends/add" className="friendsRoutes">Add Friend</NavLink>
            </div>
            <div>
                <FriendsMenu />
            </div>
        </div>
    )
}
export default Friends;