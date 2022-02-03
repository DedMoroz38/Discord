import { SET_LOGINED } from './actions';

const inintialChatState = {
    loginStatus: false,
    name: '',
    id: 0
}


const loginReducer = (state = inintialChatState, action) => {
    switch (action.type) {
        case SET_LOGINED: {
            console.log(action.payload.name);
            return {
                ...state,
                loginStatus: true,
                name: action.payload.name,
                id: action.payload.id
            }
        }
        default: {
            return state
        }
    }
}
export default loginReducer;  