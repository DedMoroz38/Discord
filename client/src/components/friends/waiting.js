import React, { useEffect, useState } from "react";
import '../components.css';
import { useSelector, useDispatch } from "react-redux";
import DoneIcon from '@mui/icons-material/Done';
import axios from 'axios';
import { deletePandingFriend } from '../../store/friends/action';
import { pandingFriend } from '../../store/friends/action';


const WaitingFriends = () => {
    const userInfo = useSelector((state) => state.loginStatus);
    const [paddingFriends, setPaddingFriends] = useState([]);
    const dispatch = useDispatch();

    const AddFriend = (item) => {
        setPaddingFriends([]);
        axios.post('http://localhost:3001/addFriend',
            {
                friendId: item.id,
                userId: userInfo.id
            }).then((res) => {
                if (res.data.status === 1) {
                    dispatch(deletePandingFriend(item));
                } else {
                    alert('Unknown error!')
                }
            });
    }
    useEffect(() => {
        axios.post('http://localhost:3001/getPandingFriends',
            {
                target_id: userInfo.id
            }).then((res) => {
                const result = res.data.result;
                console.log(result);
                if (result.length > 0) {
                    setPaddingFriends(result);
                    dispatch(pandingFriend(result));
                }
            });
    }, []);

    return (
        <div className="allFriendsBox">
            <ul className="foundFriends">
                {paddingFriends.map((item, index) => (
                    <li key={index} className="FoundFriend">
                        <p className="friendsName">{item.userName}</p>
                        <button onClick={() => { AddFriend(item) }}><DoneIcon /></button>
                    </li>
                )
                )}
            </ul>
        </div>
    )
}
export default WaitingFriends;