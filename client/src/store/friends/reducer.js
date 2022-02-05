import { REQUEST_FRIEND } from './action';

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
        default: {
            return state
        }
    }
}
export default friendsReducer;



