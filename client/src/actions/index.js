import axios from 'axios';
import * as types from './types';
const apiUrl = 'http://local.api.project.com:8801';
export const pullPosts = ()=>async dispatch=>{
    try
    {
        const res = await axios.get(apiUrl+'/post/pull');
        dispatch({type:types.PULL_POSTS, payload:res});
    }
    catch (e)
    {
        console.log(e);
    }

};

export const getPosts = (get)=> async dispatch =>{
    let request = get ? get.join('&'): '';
    try
    {
        dispatch({type:types.POST_LIST_GET_REQUEST});
        const res = await axios.get(apiUrl+'/posts?'+request);
        dispatch({type:types.GET_POST_LIST, payload:res});
    }
    catch (e)
    {
        dispatch({type:types.POST_LIST_GET_ERROR, payload:e});
    }

};

export const getPost = (id)=> async dispatch=>{
    try
    {
        dispatch({type:types.POST_GET_REQUEST});
        const res = await axios.get(apiUrl+'/posts/'+id);
        dispatch({type:types.GET_POST, payload:res});
    }
    catch (e)
    {
        dispatch({type:types.POST_GET_ERROR, payload:e});
    }

};