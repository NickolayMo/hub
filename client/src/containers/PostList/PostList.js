import React, {Component} from 'react';
import PostSpinner from '../../components/PostSpinner/PostSpinner'
import ReactPaginate from 'react-paginate';
import './PostList.css';
import PostItem from "../../components/PostItem/PostItem";
import {connect} from "react-redux";
import * as actions from '../../actions';

class PostList extends Component
{
    fetchData(p){
        this.props.getPosts(p);
    }
    componentDidMount() {
        let p = this.props.match.params.num;
        this.fetchData(p);
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        window.history.pushState({}, '', '/page/'+(1+ selected));
        this.fetchData(selected+1);
    };
    static renderPosts(post, index) {
        return <PostItem key={index} post={post}/>
    }
    render(){
        const {postsList} = this.props;
        if(postsList.errorMsg)
        {
            return(
                <React.Fragment>
                    <h2>Произошла ошибка</h2>
                    <p>{postsList.errorMsg}</p>
                </React.Fragment>
            )
        }
        return (<div className="post-list">
            <h2 className="post-list__header">Список статей</h2>
            <div className="row">
                <div className="post-list__content col-md-12" >
                    <div className="list-group">
                    {
                        postsList.data ?
                            postsList.data.map(PostList.renderPosts)
                            :
                            postsList.isLoading ? <PostSpinner/> : ''
                    }
                    </div>
                </div>
            </div>
            { postsList.data ?
                <nav aria-label="navigation">
                    <ReactPaginate previousLabel={"Назад"}
                                   nextLabel={"Вперед"}
                                   breakLabel={<a href="">...</a>}
                                   breakClassName={"break-me"}
                                   pageCount={postsList.pageCount}
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
                                   forcePage={postsList.currentPage-1}
                    />
                </nav>
                :
                ''
                }

        </div>);
    }
}
function mapStateToProps({postsList}) {
    return {postsList}
}
export default connect(mapStateToProps, actions)(PostList);