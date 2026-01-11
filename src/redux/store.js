import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './indexReducers';

const store = createStore(reducers, applyMiddleware(thunk));
export default store;

// import { legacy_createStore as createStore ,applyMiddleware} from "redux";
// import { composeWithDevTools } from '@redux-devtools/extension';
// import rootReducer from "./reducers";
// import expireReducer from 'redux-persist-expire';
// import { persistStore, persistReducer } from 'redux-persist';
// import thunk from 'redux-thunk';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const rootPersistConfig = {
//     key: 'root',
//     storage:AsyncStorage,
//     transforms: [
//         expireReducer('userdata', {
//             expireSeconds: 10,
//             expiredState: {},
//             autoExpire: true
//         })
//     ]
// }
// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
// // let store = createStore(persistedReducer,composeWithDevTools(applyMiddleware(thunk)));
// let store = createStore(persistedReducer,applyMiddleware(thunk));
// let persistor = persistStore(store);
// export default store;
// export { store, persistor };


