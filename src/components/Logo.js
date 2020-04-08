import React, { Component } from 'react';
import '../css/Logo.css';

class Logo extends Component{
    render(){
        return(
            <div className="logo">
                <h1><i class="fas fa-feather-alt"></i>   Weather Application</h1>
            </div>
        )
    }
}

export default Logo;