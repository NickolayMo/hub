import {GET_POST, POST_GET_ERROR, POST_GET_REQUEST} from '../actions/types';


export const initialState = {
    post: null,
    isLoading: false,
    errorMsg: null,
};
/**
 * Обработчик событий для странцы поста
 * @param state
 * @param action
 * @returns {*}
 */
export default function (state=initialState, action){
    switch (action.type){
        case GET_POST:
            document.documentElement.scrollTop=0;
            return {
                ...state,
                isLoading: false,
                post: action.payload.data
            };
        case POST_GET_REQUEST:
            return {
                ...state,
                isLoading: true,
                post: null,
            };
        case POST_GET_ERROR:
            console.log( action.payload
            );
            return {
                ...state,
                errorMsg: action.payload,                isLoading: false,

            };
        default:
            return state;
    }
}