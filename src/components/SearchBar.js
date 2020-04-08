import React, { Component } from 'react';
import '../css/SearchBar.css';
const geo = require('./geocode.js');
const mapboxKey = require('./keys.js');

class SearchBar extends Component{
    constructor(props){
        super(props);

        this.state = {
            searchCity: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({
            searchCity: e.target.value
        })
    }

    render(){
        return(
            <div>
                <input type="text" value={this.state.searchCity} placeholder="Search City" onChange={this.handleChange}/>
                <button onClick={(e) => this.props.handleClick(this.state.searchCity)}>Search</button>    
            </div>
        )
    }
}

export default SearchBar;