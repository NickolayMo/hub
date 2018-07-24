import React from 'react';
import {Link} from 'react-router-dom';
import PostSearch from "../../containers/PostSearch/PostSearch";
import './Header.css';

class Header extends React.Component
{
    render(){
        return (
            <nav className="header navbar navbar-light bg-light">
                <Link className="navbar-brand" to={'/'}>Hub</Link>
                <PostSearch/>
            </nav>
        );
    }
}
export default Header;