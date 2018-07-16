import postReducer from './postReducer';
import postListReducer from './postListReducer';
import {combineReducers} from 'redux';

export default combineReducers({
    post: postReducer,
    postsList: postListReducer,
    searchList: postListReducer,
});