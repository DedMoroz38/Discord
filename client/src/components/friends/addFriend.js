import React from "react";
import '../components.css';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useState, useEffect } from "react";
import DoneIcon from '@mui/icons-material/Done';
import { useSelector } from "react-redux";



const AddFriends = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState(false);
    const [friend, setFriend] = useState([]);

    const userId = useSelector((state) => state.id.id);


    const searchFriend = () => {
        if (username.length > 0) {
            searchInDB();
        }
    }
    const searchInDB = () => {
        axios.post('http://localhost:3001/searchFriend',
            {
                username: `${username}`
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
                setFriend([...friend, { userName: result[0].userName, id: result[0].id }]);
            } else {
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
        if (res.data.result) {
            console.log('sent');
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
                        setUsername(e.target.value);
                    }}
                    placeholder="Input username"
                    type='text'
                ></input>
                <button onClick={() => { searchFriend() }}><SearchIcon /></button>
            </div>
            <p className={`${error ? "passwordErrorMessage" : "trigger"}`}>Hm, didn't work. Double check that the capitalization, spelling, any space, and numbers are correct.</p>
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