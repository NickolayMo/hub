import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from '../../actions';

/**
 * Панель поиска
 */
class PostSearch extends Component
{
    handleSearch = (event)=>{
        let data = event.target.value;
        let query = data ? ['q='+ data] : '';
        this.props.getPosts(query);
    };
    render()
    {
        return (
            <form className="form-inline">
                <input onChange={this.handleSearch} className="form-control mr-sm-2" type="search" placeholder="Поиск" aria-label="Search"/>
            </form>
        );
    }
}
export default connect(null, actions)(PostSearch);