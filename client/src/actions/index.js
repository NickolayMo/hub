import axios from 'axios';

export const pullPosts = ()=>{
    return axios.get('http://local.api.project.com:8801/post/pull')
};

export const getPosts = (page)=>{
    let pageNum = page ? '?page='+page : '';
    return axios.get('http://local.api.project.com:8801/posts'+pageNum)
};

export const getPost = (id)=>{
    return axios.get('http://local.api.project.com:8801/posts/'+id)
};