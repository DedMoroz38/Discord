import { createStore } from 'redux';
import messageReducer from './messages/reducer';
import chatReducer from './chats/reducer';
import loginReducer from './login/reducer';
import id from './login/reducer';
import name from './login/reducer';
import { combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from 'redux-persist/lib/storage';
import friendsReducer from './friends/reducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const persistConfig = {
//     key: 'root',
//     storage,
// }

const allReducers = combineReducers({
    messages: messageReducer,
    chats: chatReducer,
    loginStatus: loginReducer,
    friends: friendsReducer,
});

// const persistedReducer = persistReducer(persistConfig, allReducers);

const store = createStore(
    allReducers,
    // persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
);
// export const persistedStore = persistStore(store);
export default store;

