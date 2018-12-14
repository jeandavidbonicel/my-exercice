/*
 src/App.js
*/
import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './loader.scss';


class Loader extends Component {

    
    render() {
        const { position } = this.props;

        return (
            <div className={position ? position : 'default'} >
                <CircularProgress/>
            </div>
        );
    }
}

export default Loader;