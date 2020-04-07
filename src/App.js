import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import Cards from './components/Cards';
import SearchBar from './components/SearchBar';

const geo = require('./components/geocode.js');
const mapboxKey = require('./components/keys.js');

class App extends Component{
  constructor(){
    super();

    this.state = {
      center: [-98.4916, 29.4252]
    }

    this.changeCenter = this.changeCenter.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  changeCenter(city){
    var that = this;
    console.log(city);

    that.setState({
      center: city
    })
  }

  handleClick(city){
    var that = this;
    console.log(city);
    geo.geocode(city, mapboxKey).then(function(results){
      console.log(results);
      that.setState({
        center: results
      })
    });

  }

  render(){
    return(
      <div className="App">
        <Cards center={this.state.center}/>
        <SearchBar handleClick={this.handleClick} />
        <Map center={this.state.center} changeCenter={this.changeCenter} />
      </div>
    )
  }
}
export default App;
