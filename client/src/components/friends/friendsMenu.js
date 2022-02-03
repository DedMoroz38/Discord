import React from "react";
import '../components.css';
import { Routes, Route } from 'react-router-dom';
import AllFriends from "./all";
import WaitingFriends from "./waiting";
import RequestFriends from "./requests"
import AddFriends from "./addFriend";





const FriendsMenu = () => {


    return (
        <div className="allFriendsMenu">
            <Routes>
                <Route path="/all" element={<AllFriends />} />
                <Route path="/pending" element={<WaitingFriends />} />
                <Route path="/requests" element={<RequestFriends />} />
                <Route path="/add" element={<AddFriends />} />
            </Routes>
        </div>
    )
}
export default FriendsMenu;