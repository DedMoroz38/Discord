import React from "react";
import '../components.css';
import SearchIcon from '@mui/icons-material/Search';




const AddFriends = () => {
    const addFriend = () => {

    }

    return (
        <div className="allFriendsBox">
            <header className="friendsHeadingBox">
                <h1>ADD FRIEND</h1>
            </header>
            <div className="friendsInputBox">
                <input placeholder="Input username" type='text' ></input>
                <button onClick={() => { addFriend() }}><SearchIcon /></button>
            </div>
        </div>
    )
}
export default AddFriends;