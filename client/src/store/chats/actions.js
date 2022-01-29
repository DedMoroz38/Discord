export const ADD_CHAT = 'ADD_CHAT';

export const addChat = (chatName) => {
    return {
        type: ADD_CHAT,
        payload: chatName
    }
}