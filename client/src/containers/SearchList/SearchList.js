import React, {Component} from 'react';
import PostSpinner from '../../components/PostSpinner/PostSpinner'
import ReactPaginate from 'react-paginate';
import './SearchList.css';
import PostItem from "../../components/PostItem/PostItem";
import {connect} from "react-redux";
import * as actions from '../../actions';

/**
 * Список постов при поиска
 */
class SearchList extends Component
{
    static search = '';
    fetchData(p, q){
        let query = p ? ['page='+ p] : [];
        if (q)
        {
           query.push(['q='+ q])
        }
        this.props.getPosts(query);
    }
    componentDidMount() {
        let p = this.props.match.params.num;
        let q = this.props.location.search.match(/q=([^&]*)/);
        if(q && q[1])
        {
            this.search = decodeURI(q[1]);
            this.fetchData(p, q[1]);
        }
        else
        {
            this.fetchData(p);
        }
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        window.history.pushState({}, '', '/search/'+(1+ selected)+this.props.location.search);
        this.fetchData(selected+1);
    };
    static renderPosts(post, index) {
        return <PostItem key={index} post={post}/>
    }
    render(){
        const {searchList} = this.props;
        console.log(this.props);
        if(searchList.errorMsg)
        {
            return(
                <React.Fragment>
                    <h2>Произошла ошибка</h2>
                    <p>{searchList.errorMsg}</p>
                </React.Fragment>
            )
        }
        return (<div className="post-list">
            <h2 className="post-list__header">Поиск: {this.search}</h2>
            <div className="row">
                <div className="post-list__content col-md-12" >
                    <div className="list-group">
                    {
                        searchList.data ?
                            searchList.data.map(SearchList.renderPosts)
                            :
                            searchList.isLoading ? <PostSpinner/> : ''
                    }
                    </div>
                </div>
            </div>
            { (searchList.data && searchList.data.length >0) ?
                <nav aria-label="navigation">
                    <ReactPaginate previousLabel={"Назад"}
                                   nextLabel={"Вперед"}
                                   breakLabel={<a href="">...</a>}
                                   breakClassName={"break-me"}
                                   pageCount={searchList.pageCount}
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
                                   forcePage={searchList.currentPage-1}
                    />
                </nav>
                :
                searchList.data ? <h3 className={'not-found'}>Ничего не найдено</h3> : ''
                }

        </div>);
    }
}
function mapStateToProps({searchList}) {
    return {searchList}
}
export default connect(mapStateToProps, actions)(SearchList);