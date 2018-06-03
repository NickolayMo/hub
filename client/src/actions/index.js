import axios from 'axios';
import {PULL_POSTS, GET_POSTS, GET_POST} from './types';
export const pullPosts = ()=>async dispatch=>{
    const res = await axios.get('http://local.api.project.com:8801/post/pull');
    dispatch({type:PULL_POSTS, payload:res});
};

export const getPosts = (page)=> async dispatch =>{
    let pageNum = page ? '?page='+page : '';
    const res = await axios.get('http://local.api.project.com:8801/posts'+pageNum);
    dispatch({type:GET_POSTS, payload:res});
};

export const getPost = (id)=> async dispatch=>{
    const res = await axios.get('http://local.api.project.com:8801/posts/'+id);
    dispatch({type:GET_POST, payload:res});
};