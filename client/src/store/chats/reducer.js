import { ADD_CHAT } from './actions';

const inintialChatState = {
    chats: []
}


const chatReducer = (state = inintialChatState, action) => {
    switch (action.type) {
        case ADD_CHAT: {
            return {
                ...state,
                chats: [
                    ...state.chats,
                    {
                        chatId: action.payload.chatId,
                        name: action.payload.name,
                        img: action.payload.img
                    }
                ]
            }
        }
        default: {
            return state
        }
    }
}
export default chatReducer;  