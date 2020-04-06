import React, { Component } from 'react';
const geo = require('./geocode.js');
const mapboxKey = require('./keys.js');

class SearchBar extends Component{
    constructor(props){
        super(props);

        this.state = {
            searchCity: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e){
        this.setState({
            searchCity: e.target.value
        })
    }

    handleClick(e){
        geo.geocode(this.state.searchCity, mapboxKey).then(function(results){
            this.props.changeCenter(results);
        });

    }

    render(){
        return(
            <div>
                
                    <input type="text" value={this.state.searchCity} placeholder="Search City" onChange={this.handleChange}/>
                    <button onClick={this.handleClick}>Search</button>
            
                
            </div>
        )
    }
}

export default SearchBar;