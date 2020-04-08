import React, { Component } from 'react';

class Degree extends Component{
    render(){
        return(
            <div className="nav-item-degrees">
                <label>
                    <input type="radio" value="F" checked={this.props.temperature === 'F'} onChange={e => this.props.handleOptionChange(e)} />
                    F&#176;
                </label>
                <label>
                    <input type="radio" value="C" checked={this.props.temperature === 'C'} onChange={e => this.props.handleOptionChange(e)} />
                    C&#176;
                </label>
                <label>
                    <input type="radio" value="K" checked={this.props.temperature === 'K'} onChange={e => this.props.handleOptionChange(e)} />
                    K&#176;
                </label>
            </div>
        )
    }
}

export default Degree;