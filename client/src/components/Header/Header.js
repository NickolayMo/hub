import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component
{
    render(){
        return (
            <nav className="app__header navbar navbar-light bg-light">
                <Link className="navbar-brand" to={'/'}>Hub</Link>
            </nav>
        );
    }
}
export default Header;