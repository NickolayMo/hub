import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from '../../actions';

/**
 * Панель поиска
 */
class PostSearch extends Component
{
    render()
    {
        return (
            <form action={'/search'} className="form-inline">
                <input name={'q'} className="form-control mr-sm-2" type="search" placeholder="Поиск" aria-label="Search"/>
            </form>
        );
    }
}
export default connect(null, actions)(PostSearch);