import { ADD_MESSAGE } from './actions';

const inintialMessageState = {
    messages: {
        1: [
            {
                date: 1,
                message: 'Hi'
            }
        ]
    }
}


const messageReducer = (state = inintialMessageState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            const { chatId, date, newMessage } = action.payload;
            const newMessages = { ...state.messages };
            newMessages[chatId] = [...(newMessages[chatId] || []), { date: date, message: newMessage }]
            return {
                messages: newMessages
            }
        }
        default: {
            return state
        }
    }
}
export default messageReducer;



