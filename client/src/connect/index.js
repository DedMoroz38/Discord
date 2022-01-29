import { connect } from "react-redux";
import { addChat } from "../store/chats";
import { addMessage } from "../store/messages";



const mapStateToProps = (state) => ({
    chats: state.chats.chats,
    messages: state.messages.messages,
})

const mapDispatchToProps = (dispatch) => ({
    addChat(chat) {
        return dispatch(addChat(chat));
    },
    addMessage(createMessage) {
        return dispatch(addMessage(createMessage));
    }
})


export const chatsConnect = connect(mapStateToProps, mapDispatchToProps);