import React, {Component} from 'react';
import PostSpinner from '../PostSpinner/PostSpinner';
import {getPost} from '../../actions';

class Post extends Component
{
    constructor() {
        super();
        this.state = { post: null };
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        getPost(id)
            .then(data => this.setState({ post: data.data }))
            .catch(function(error) {console.log(error)});
    };
    renderTitle = (post)=>{
        if(!post)
        {
            return '';
        }
        return <h2>{post.title}( <a target="_blank" href={post.link}><small>Оригинал статьи</small></a>)</h2>
    };
    render(){
        const { post } = this.state;
        return (
            <div>
                {this.renderTitle(post)}
                {post ? <div dangerouslySetInnerHTML={{__html: post.content}}/> : <PostSpinner/>}
            </div>

        );
    }
}
export default Post;
