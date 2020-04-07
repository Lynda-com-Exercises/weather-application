import React, { Component } from 'react';
const converters = require('./tempConverters.js');

class Header extends Component{
    render(){
        let degree = this.props.degree;
        let temp = Math.round(this.props.temp);
        let type = '';

        if(degree === 'F'){
            type = 'F';
        }else if(degree === 'C'){
            type = 'C';
            temp = Math.round(converters.tempFToC(temp));
        }else if(degree === 'K'){
            type = 'K';
            temp = Math.round(converters.tempFtoK(temp));
        }


        return(
            <header>
                <p>{this.props.city}{this.props.state}{this.props.country}</p>
                <p>{temp}&#176;{type}</p>
            </header>
        )
    }
}

export default Header;