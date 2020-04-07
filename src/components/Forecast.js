import React, { Component } from 'react';

class Forecast extends Component{
    render(){
        return(
            <label>
                Days of Forecast: 
                <select value={this.props.forecast} onChange={e => this.props.handleSelect(e)}>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
            </label>
            
        )
    }
}

export default Forecast;