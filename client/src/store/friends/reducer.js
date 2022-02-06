import { REQUEST_FRIEND, PENDING_FRIEND } from './action';

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
        default: {
            return state
        }
    }
}
export default friendsReducer;



