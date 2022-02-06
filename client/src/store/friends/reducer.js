import { REQUEST_FRIEND, PENDING_FRIEND, DELETE_PANDING_FRIEND } from './action';

const inintialMessageState = {
    friends: {
        friends: [],
        pendingFriends: [],
        requestedFriends: []
    }
}


const friendsReducer = (state = inintialMessageState, action) => {
    switch (action.type) {
        case REQUEST_FRIEND: {
            const friendInfo = action.payload;
            const requestFriend = {
                friends: [...state.friends.friends],
                pendingFriends: [...state.friends.pendingFriends],
                requestedFriends: [...state.friends.requestedFriends, ...friendInfo]
            }
            return {
                friends: requestFriend
            }
        }
        case PENDING_FRIEND: {
            const friendInfo = action.payload;
            const pendingFriend = {
                friends: [...state.friends.friends],
                pendingFriends: [...state.friends.pendingFriends, ...friendInfo],
                requestedFriends: [...state.friends.requestedFriends]
            }
            return {
                friends: pendingFriend
            }
        }
        case DELETE_PANDING_FRIEND: {
            const friendInfo = action.payload;
            const newList = state.friends.pendingFriends.filter(item => item.id != friendInfo.id);
            const pendingFriend = {
                friends: [...state.friends.friends],
                pendingFriends: [...newList],
                requestedFriends: [...state.friends.requestedFriends]
            }
            return {
                friends: pendingFriend
            }
        }
        default: {
            return state
        }
    }
}
export default friendsReducer;



