import React, {Component} from 'react';
import PostSpinner from '../PostSpinner/PostSpinner';
import * as actions from '../../actions';
import {connect} from  'react-redux';

class Post extends Component
{
    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getPost(id);
    };
    renderTitle = (post)=>{
        if(!post)
        {
            return '';
        }
        return <h2>{post.title}( <a target="_blank" href={post.link}><small>Оригинал статьи</small></a>)</h2>
    };
    render(){
        const { post } = this.props.posts;
        return (
            <div>
                {this.renderTitle(post)}
                {post ? <div dangerouslySetInnerHTML={{__html: post.content}}/> : <PostSpinner/>}
            </div>

        );
    }
}
function mapStateToProps({posts}) {
    return {posts}
}
export default connect(mapStateToProps, actions)(Post);
