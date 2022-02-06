export const REQUEST_FRIEND = 'REQUEST_FRIEND';
export const PENDING_FRIEND = 'PENDING_FRIEND';

export const requestFriend = (friendInfo) => ({
    type: REQUEST_FRIEND,
    payload: friendInfo
});

export const pandingFriend = (friendInfo) => ({
    type: PENDING_FRIEND,
    payload: friendInfo
});