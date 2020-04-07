import React, { Component } from 'react';

class Cards extends Component{

    render(){
        return(
            <div>
                <p>{this.props.center}</p>
                <p>{this.props.number}</p>
            </div>
        )
    }
}

export default Cards;