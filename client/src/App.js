import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css'
import PostList from './containers/PostList/PostList';
import Post from './containers/Post/Post';
import Header from './components/Header/Header';
import * as actions from './actions';
import {connect} from 'react-redux';
import NotFound from "./components/NotFound/NotFound";

/**
 * Компоненент приложения
 */
class App extends Component {

    componentDidMount() {
        //this.props.pullPosts();

    }
    render() {
        return (
            <BrowserRouter>
                <div className="app container">
                    <Header/>
                    <Switch>
                        <Route exact path='/' component={PostList}/>
                        <Route exact path='/page/:num' component={PostList}/>
                        <Route path='/post/:id' component={Post}/>
                        <Route component={NotFound}/>
                    </Switch>
                    <div className="app__footer bg-light">
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);
