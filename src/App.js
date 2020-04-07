import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import Cards from './components/Cards';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Degree from './components/Degree';
import Forecast from './components/Forecast';

const geo = require('./components/geocode.js');
const keys = require('./components/keys.js');
const mapboxKey = keys.mapboxKey;
const darkSkyKey = keys.darkSkyKey;

class App extends Component{
  constructor(){
    super();

    this.state = {
      center: [-98.4916, 29.4252],
      city: '',
      state: '',
      country: '',
      forecast: 3,
      temperature: 'F',
      currentTemp: 0
    }

    this.changeCenter = this.changeCenter.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  changeCenter(city){
    var that = this;

    that.setState({
      center: city
    })
  }

  handleClick(city){
    var that = this;

    geo.geocode(city, mapboxKey).then(function(results){
      that.setState({
        center: results
      })
    });

  }

  handleOptionChange(e){
    let that = this;

    that.setState({
      temperature: e.target.value
    })
  }

  handleSelect(e){
    let that = this;

    that.setState({
      forecast: e.target.value
    })
  }

  changeCity(){
    let that = this;
    let center = that.state.center;
    
    geo.reverseGeocode({lat:center[1], lng:center[0]}, mapboxKey).then(function(result){
      let cityN = '';
      let stateN = '';
      let countryN = '';

      result.features.forEach(function(place){
        let id = place.id.substring(0, place.id.indexOf("."));

        if(id === "place"){
          cityN = place.text + ", ";
        }else if(id === "region"){
          stateN = place.text + ", ";
        }else if(id === "country"){
          countryN = place.text + ".";
        }
      });

      that.setState({
        city: cityN,
        state: stateN,
        country: countryN
      })
    });
  }

  componentDidMount(){
    let that = this;
    let center = this.state.center;
    const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkSkyKey}/${center[1]},${center[0]}`;
    that.changeCity();

    fetch(url).then(data => data.json()).then(data => {
      console.log(data);
      console.log(data.currently.temperature);

      that.setState({
        currentTemp: data.currently.temperature
      })
    })
  }

  componentDidUpdate(){
    let that = this;

    that.changeCity();
  }

  render(){
    return(
      <div className="App">
        <Header 
            city={this.state.city} 
            state={this.state.state} 
            country={this.state.country}
            temp={this.state.currentTemp}
            degree={this.state.temperature}
        />
        <Cards center={this.state.center} number={this.state.forecast} />
        <SearchBar handleClick={this.handleClick} />
        <Degree temperature={this.state.temperature} handleOptionChange={this.handleOptionChange} />
        <Forecast forecast={this.state.forecast} handleSelect={this.handleSelect} />
        <Map center={this.state.center} changeCenter={this.changeCenter} />
      </div>
    )
  }
}
export default App;
