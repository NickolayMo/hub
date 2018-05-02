import React, {Component} from 'react';
import Loader from 'react-loader-spinner'
import './PostSpinner.css';

class PostSpinner extends Component
{
    render(){
        return <div  className='spinner'><Loader type="Ball-Triangle"
                color="#000"
                height="30"
                width="30"/></div>
    }
}
export default PostSpinner;