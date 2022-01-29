import { SET_LOGINED } from './actions';

const inintialChatState = {
    loginStatus: false
}


const loginReducer = (state = inintialChatState, action) => {
    switch (action.type) {
        case SET_LOGINED: {
            return {
                ...state,
                loginStatus: true
            }
        }
        default: {
            return state
        }
    }
}
export default loginReducer;  