import React from "react";
import '../components.css';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useState, useEffect } from "react";
import DoneIcon from '@mui/icons-material/Done';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { requestFriend } from '../../store/friends/action.js';
import { selectRequests } from "../../store/friends";
import { selectPending } from "../../store/friends";
import { selectFriends } from "../../store/friends";



const AddFriends = () => {
    const requestedFriends = useSelector((state) => state.friends.friends.requestedFriends);
    const friends = useSelector((state) => state.friends.friends.friends);
    const dispatch = useDispatch();

    const [friendName, setFriendName] = useState('');
    const [error, setError] = useState(false);
    const [friend, setFriend] = useState([]);
    const [errorMessage, setErrorMessage] = useState("Hm, didn't work. Double check that the capitalization, spelling, any space, and numbers are correct.");

    const userId = useSelector((state) => state.name.id);
    const userName = useSelector((state) => state.name.name);


    const searchFriend = () => {
        if (friendName.length > 0) {
            console.log(friends.includes(friendName));
            if (userName === friendName) {
                setError(true);
            } else if (friends.includes(friendName)) {
                setFriend([]);
                setErrorMessage(`${friendName} is already your friend`);
                setError(true);
                console.log('Nooooooo1');
            } else if (requestedFriends.includes(friendName)) {
                setFriend([]);
                setErrorMessage(`You have already requested ${friendName} to be yuor friend!`);
                setError(true);
                console.log('Nooooooo2');
            }
            else {
                setError(false);
                searchInDB();
            }
        }
    }
    const searchInDB = () => {
        axios.post('http://localhost:3001/searchFriend',
            {
                friendName: `${friendName}`,
                userName: userName
            }).then((res) => {
                handleData(res);
            });
    };
    const handleData = (res) => {
        console.log(res);
        const result = res.data.result;
        console.log(result);
        if (result) {
            if (result.length > 0) {
                setFriend([]);
                setError(false);
                setFriend([{ userName: result[0].userName, id: result[0].id }]);
            } else {
                setErrorMessage("Hm, didn't work. Double check that the capitalization, spelling, any space, and numbers are correct.");
                setError(true);
                setFriend([]);
            }
        } else {
            alert('Error!');
        }
    }
    const requesFriend = () => {
        axios.post('http://localhost:3001/requesFriend',
            {
                friendId: friend[0].id,
                userId: userId
            }).then((res) => {
                handleRequestData(res);
            });
    }
    const handleRequestData = (res) => {
        console.log(res);
        const result = res;
        if (result) {
            dispatch(requestFriend(friend));
        } else {
            alert('Unknown Error!')
        }
    }

    return (
        <div className="allFriendsBox">
            <header className="friendsHeadingBox">
                <h2>ADD FRIEND</h2>
            </header>
            <div className="friendsInputBox">
                <input
                    onChange={(e) => {
                        setFriendName(e.target.value);
                    }}
                    placeholder="Input username"
                    type='text'
                ></input>
                <button onClick={() => { searchFriend() }}><SearchIcon /></button>
            </div>
            <p className={`${error ? "passwordErrorMessage" : "trigger"}`}>{errorMessage}</p>
            <hr />
            <ul className="foundFriends">
                {friend.map((item, id) => (
                    <li key={id} className="FoundFriend">
                        <p className="friendsName">{item.userName}</p>
                        <button onClick={() => { requesFriend() }}><DoneIcon /></button>
                    </li>
                )
                )}
            </ul>
        </div>
    )
}
export default AddFriends;