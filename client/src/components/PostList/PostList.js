import React, {Component} from 'react';
import PostSpinner from '../PostSpinner/PostSpinner'
import ReactPaginate from 'react-paginate';
import './PostList.css';
import PostItem from "../PostItem/PostItem";
import {connect} from "react-redux";
import * as actions from '../../actions';

class PostList extends Component
{
    fetchData(p){
        this.props.getPosts(p);
    }
    componentDidMount() {
        let p = this.props.match.params.p;
        this.fetchData(p);
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.fetchData(selected+1);
    };
    static renderPosts(post, index) {
        return <PostItem key={index} post={post}/>
    }
    render(){
        const { posts} = this.props;
        return (<div className="post-list">
            <h2 className="post-list__header">Список статей</h2>
            <div className="row">
                <div className="post-list__content col-md-12" >
                    <div className="list-group">
                    {
                        posts.data ?
                            posts.data.map(PostList.renderPosts)
                            :
                            <PostSpinner/>
                    }
                    </div>
                </div>
            </div>
            <nav aria-label="navigation">
            <ReactPaginate previousLabel={"Назад"}
                           nextLabel={"Вперед"}
                           breakLabel={<a href="">...</a>}
                           breakClassName={"break-me"}
                           pageCount={posts.pageCount}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={5}
                           onPageChange={this.handlePageClick}
                           containerClassName={"pagination"}
                           subContainerClassName={"pages pagination"}
                           activeClassName={"active"}
                           pageClassName={"page-item"}
                           pageLinkClassName={"page-link"}
                           previousClassName={"page-item"}
                           previousLinkClassName={"page-link"}
                           nextClassName={"page-item"}
                           nextLinkClassName={"page-link"}
            />
            </nav>
        </div>);
    }
}
function mapStateToProps({posts}) {
    return {posts}
}
export default connect(mapStateToProps, actions)(PostList);