import React, { Component } from 'react';
import ReactAnimatedWeather from 'react-animated-weather/build/ReactAnimatedWeather';
import '../css/Cards.css';

class Cards extends Component{

    render(){
        let degree = this.props.degree;
        let type = '';
    
        if(degree === 'F'){
            type = 'F';
        }else if(degree === 'C'){
            type = 'C';
        }else if(degree === 'K'){
            type = 'K';
        }

        return(
            <div className="card-container">{
                this.props.days.map((item, key) => (
                    <div key={key} className="card">
                        <p><strong>{item.time}</strong></p>
                        <p>{item.temperatureLow}&#176;{type} / {item.temperatureHigh}&#176;{type}</p>
                        <ReactAnimatedWeather 
                            icon={item.icon.replace(/-/g, "_").toUpperCase()}
                            color='#67EACA'
                            size='65'
                            animate='true'
                        />
                        <p>{item.summary}</p>
                        <p>humidity: {Math.round(item.humidity * 100)}</p>
                        <p>pressure: {Math.round(item.pressure)}</p>
                    </div>
                ))
            }</div>
        )
    }
}

export default Cards;