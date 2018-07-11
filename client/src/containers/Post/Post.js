import React, {Component} from 'react';
import PostSpinner from '../../components/PostSpinner/PostSpinner';
import * as actions from '../../actions';
import {connect} from  'react-redux';

/**
 * Страница поста
 */
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
        const { post } = this.props;
        if(post.errorMsg)
        {
            return(
                <React.Fragment>
                    <h2>Произошла ошибка</h2>
                    <p>{post.errorMsg}</p>
                </React.Fragment>
            )
        }
        return (
            <div>
                {this.renderTitle(post.post)}
                {post.post ? <div dangerouslySetInnerHTML={{__html: post.post.content}}/> :  post.isLoading ? <PostSpinner/> : ''}
            </div>

        );
    }
}
function mapStateToProps({post}) {
    return {post}
}
export default connect(mapStateToProps, actions)(Post);
