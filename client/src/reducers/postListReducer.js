import {PULL_POSTS, GET_POST_LIST, POST_LIST_GET_ERROR, POST_LIST_GET_REQUEST} from '../actions/types';


export const initialState = {
    data: null,
    isLoading: false,
    errorMsg: null,
    currentPage: 0,
    pageCount: 0
};

export default function (state=initialState, action){
    switch (action.type){
        case PULL_POSTS:
            return state;
        case GET_POST_LIST:
            let response = action.payload;
            return {
                ...state,
                data: response.data,
                currentPage: +response.headers['x-pagination-current-page'],
                pageCount: +response.headers['x-pagination-page-count']
            };
        case POST_LIST_GET_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case POST_LIST_GET_ERROR:
            return {
                ...state,
                errorMsg: action.payload.errorMsg,
                isLoading: false,
            };
        default:
            return state;
    }
}