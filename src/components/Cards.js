import React, { Component } from 'react';
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
                        <img src="" alt="weather forecast" />
                        <p>{item.summary}</p>
                        <p>humidity: {item.humidity * 100}</p>
                        <p>pressure: {Math.round(item.pressure)}</p>
                    </div>
                ))
            }</div>
        )
    }
}

export default Cards;