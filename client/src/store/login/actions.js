export const SET_LOGINED = 'SET_LOGINED';

export const login = (userInfo) => {
    return {
        type: SET_LOGINED,
        payload: userInfo
    }
}