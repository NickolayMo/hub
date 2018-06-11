import React, {Component} from 'react';
import {Link} from  'react-router-dom';

class PostItem extends Component
{
    render(){
        return (
            <Link className="post-list__item list-group-item list-group-item-action" to={'/post/' + this.props.post.id}>
                <div>
                    <h4>{this.props.post.title}</h4>
                </div>
                <div>
                    {this.props.post.source} {this.props.post.publish_at} {this.props.post.author}
                </div>
            </Link>);
    }
}
export default PostItem;
