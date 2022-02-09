export const REQUEST_FRIEND = 'REQUEST_FRIEND';
export const PENDING_FRIEND = 'PENDING_FRIEND';
export const DELETE_PANDING_FRIEND = 'DELETE_PANDING_FRIEND';
export const ADD_FRIEND = 'ADD_FRIEND';

export const requestFriend = (friendInfo) => ({
    type: REQUEST_FRIEND,
    payload: friendInfo
});
export const addFriend = (friendInfo) => ({
    type: ADD_FRIEND,
    payload: friendInfo
});

export const pandingFriend = (friendInfo) => ({
    type: PENDING_FRIEND,
    payload: friendInfo
});

export const deletePandingFriend = (friendInfo) => ({
    type: DELETE_PANDING_FRIEND,
    payload: friendInfo
});