import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css'
import PostList from './components/PostList/PostList';
import Post from './components/Post/Post';
import * as actions from './actions';
import {connect} from 'react-redux';

class App extends Component {

    componentDidMount() {
        this.props.pullPosts();

    }

    render() {
        return (
            <BrowserRouter>
                <div className="app container">
                    <nav className="app__header navbar navbar-light bg-light">
                        <Link className="navbar-brand" to={'/'}>Hub</Link>
                    </nav>
                    <Route exact path='/:p?' component={PostList}/>
                    <Route path='/post/:id' component={Post}/>
                    <div className="app__footer bg-light">
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);
