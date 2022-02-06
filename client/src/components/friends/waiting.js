import React from "react";
import '../components.css';
import { useSelector } from "react-redux";
import DoneIcon from '@mui/icons-material/Done';



const WaitingFriends = () => {
    const pendingFriens = useSelector((state) => state.friends.friends.pendingFriends);
    return (
        <div className="allFriendsBox">
            <ul className="foundFriends">
                {pendingFriens.map((item, index) => (
                    <li key={index} className="FoundFriend">
                        <p className="friendsName">{item.userName}</p>
                        <button onClick={() => { console.log('works') }}><DoneIcon /></button>
                    </li>
                )
                )}
            </ul>
        </div>
    )
}
export default WaitingFriends;