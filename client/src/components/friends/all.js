import React from "react";
import '../components.css';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { addFriend } from '../../store/friends/action';
import { useEffect, useState } from 'react';







const AllFriends = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.loginStatus);
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:3001/getFriends',
            {
                source_id: userInfo.id
            }).then((res) => {
                console.log(res);
                const result = res.data.result;
                console.log(result);
                if (result.length > 0) {
                    setFriends(result);
                    dispatch(addFriend(result));
                }
            });
    }, []);

    return (
        <div className="allFriendsBox">
            <div className="friendsInputBox">
                <input placeholder="Search" type='text' ></input>
            </div>
            <ul className="foundFriends">
                {friends.map((item, index) => (
                    <li key={index} className="FoundFriend">
                        <p className="friendsName">{item.userName}</p>
                    </li>
                )
                )}
            </ul>
        </div>
    )
}
export default AllFriends;