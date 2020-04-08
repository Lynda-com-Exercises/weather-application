import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import Cards from './components/Cards';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Degree from './components/Degree';
import Forecast from './components/Forecast';
import Logo from './components/Logo';

const geo = require('./components/geocode.js');
const keys = require('./components/keys.js');
const converters = require('./components/tempConverters.js');
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
      currentTemp: 0,
      currentIcon: '',
      daysForecast: []
    }

    this.changeCenter = this.changeCenter.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.changeTemp = this.changeTemp.bind(this);
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

  changeTemp(){
    let that = this;
    let center = this.state.center;
    const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkSkyKey}/${center[1]},${center[0]}`;

    fetch(url).then(data => data.json()).then(data => {
      console.log(data);

      that.setState({
        currentTemp: data.currently.temperature,
        currentIcon: data.currently.icon,
        daysForecast: data.daily.data
      })
    })
  }

  formatDate(date){
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let daysOfWeek = ["Sun", "Mon", "Tues", 'Wed', "Thu", "Fri", "Sat"];

    let str = `${daysOfWeek[date.getUTCDay()]} ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

    return str;
  }

  componentDidMount(){
    let that = this;

    that.changeCity();
    that.changeTemp();
  }

  componentDidUpdate(prevProps, prevState){
    let that = this;

    //compare with previous state to avoid an infinite loop
    if(prevState.center !==  that.state.center){
      that.changeCity();
      that.changeTemp();
    }
    
  }

  render(){
    let allForecast = this.state.daysForecast;
    let limit = this.state.forecast;
    let degree = this.state.temperature;
    let icon = this.state.currentIcon;
    icon = icon.replace(/-/g, "_").toUpperCase();
    let allCards = [];

    if(allForecast && allForecast.length > 0){
      for(let i = 0; i < limit; i++){
        let high, low;
        let date = new Date(allForecast[i].time * 1000);
        //let dateFormat = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
        let dateFormat = this.formatDate(date);

        if(degree === 'F'){
          high = Math.round(allForecast[i].temperatureHigh);
          low = Math.round(allForecast[i].temperatureLow);
        }else if(degree === 'C'){
          high = Math.round(converters.tempFToC(allForecast[i].temperatureHigh));
          low = Math.round(converters.tempFToC(allForecast[i].temperatureLow));
        }else if(degree === 'K'){
          high = Math.round(converters.tempFtoK(allForecast[i].temperatureHigh));
          low = Math.round(converters.tempFtoK(allForecast[i].temperatureLow));
        }

        let day = {
          icon: allForecast[i].icon,
          temperatureHigh: high,
          temperatureLow: low,
          humidity: allForecast[i].humidity,
          pressure: allForecast[i].pressure,
          summary: allForecast[i].summary,
          windSpeed: allForecast[i].windSpeed,
          time: dateFormat
        }

        allCards.push(day);
      }
    }

    return(
      <div className="App">
        <Logo />
        <nav>
          <SearchBar handleClick={this.handleClick} />
          <Degree temperature={this.state.temperature} handleOptionChange={this.handleOptionChange} />
          <Forecast forecast={this.state.forecast} handleSelect={this.handleSelect} />
        </nav>
        <Header 
            city={this.state.city} 
            state={this.state.state} 
            country={this.state.country}
            temp={this.state.currentTemp}
            degree={this.state.temperature}
            icon={icon}
        />  
        <Cards days={allCards} degree={degree} />
        <Map center={this.state.center} changeCenter={this.changeCenter} />
      </div>
    )
  }
}
export default App;
