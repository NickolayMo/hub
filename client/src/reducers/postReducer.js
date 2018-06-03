import {PULL_POSTS, GET_POST, GET_POSTS} from '../actions/types';

export default function (state={}, action){
    switch (action.type){
        case PULL_POSTS:
            return Object.assign({}, state, {
                response: action.payload || null
            });
        case GET_POST:
            document.documentElement.scrollTop=0;
            if(action.payload.data)
            {
                let response = action.payload;
                return Object.assign({}, state, {
                    response,
                    post: response.data
                });
            }
            return state;
        case GET_POSTS:
            if(action.payload.data)
            {
                let response = action.payload;
                return Object.assign({}, state, {
                    response,
                    data: response.data,
                    currentPage: +response.headers['x-pagination-current-page'],
                    pageCount: +response.headers['x-pagination-page-count']
                });
            }
            return state;

        default:
            return state;
    }
}