import React, { Component } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import '../css/Header.css';
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
                <p>
                    <ReactAnimatedWeather
                        icon={this.props.icon}
                        color='#0D0221'
                        size='30'
                        animate='true'
                    />
                    {temp}&#176;{type}
                </p>
            </header>
        )
    }
}

export default Header;