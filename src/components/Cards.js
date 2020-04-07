import React, { Component } from 'react';
import Moment from 'react-moment';

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
            <div>{
                this.props.days.map((item, key) => (
                    <div key={key}>
                        <Moment 
                            date={item.time}
                            parse="YYYY-MM-dd ddd"
                            format="ddd MMMM Do, YYYY"
                        />
                        <h3>{item.time}</h3>
                        <p>{item.temperatureLow}&#176;{type} / {item.temperatureHigh}&#176;{type}</p>
                        <p>{item.summary}</p>
                    </div>
                ))
            }</div>
        )
    }
}

export default Cards;