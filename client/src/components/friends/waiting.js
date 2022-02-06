import React from "react";
import '../components.css';
import { useSelector, useDispatch } from "react-redux";
import DoneIcon from '@mui/icons-material/Done';
import axios from 'axios';
import { deletePandingFriend } from '../../store/friends/action'

const WaitingFriends = () => {
    const pendingFriens = useSelector((state) => state.friends.friends.pendingFriends);
    const userId = useSelector((state) => state.loginStatus.id);
    const dispatch = useDispatch();

    const AddFriend = (item) => {
        axios.post('http://localhost:3001/addFriend',
            {
                friendId: item.id,
                userId: userId
            }).then((res) => {
                if (res.data.status === 1) {
                    dispatch(deletePandingFriend(item));
                } else {
                    alert('Unknown error!')
                }
            });
    }

    return (
        <div className="allFriendsBox">
            <ul className="foundFriends">
                {pendingFriens.map((item, index) => (
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