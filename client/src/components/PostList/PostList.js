import React, {Component} from 'react';
import PostSpinner from '../PostSpinner/PostSpinner'
import ReactPaginate from 'react-paginate';
import './PostList.css';
import {getPosts} from '../../actions';
import PostItem from "../PostItem/PostItem";

class PostList extends Component
{
    constructor() {
        super();
        this.state = {
            posts: null,
            pageCount: 0,
            currentPage: 0
        };
    }
    fetchData(p){
        getPosts(p)
            .then(data => {this.setState({
                posts: data.data,
                currentPage: +data.headers['x-pagination-current-page'],
                pageCount: +data.headers['x-pagination-page-count']
            });})
            .catch(function(error) {console.log(error)});
    }
    componentDidMount() {
        let p = this.props.match.params.p;
        this.fetchData(p);
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.fetchData(selected+1);
    };
    renderPosts(post, index) {
        return <PostItem key={index} post={post}/>
    }
    render(){
        const { posts} = this.state;
        return (<div className="post-list">
            <h2 className="post-list__header">Список статей</h2>
            <div className="row">
                <div className="post-list__content col-md-12" >
                    <div className="list-group">
                    {
                        posts ?
                            posts.map(this.renderPosts)
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
                           pageCount={this.state.pageCount}
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
export default PostList;