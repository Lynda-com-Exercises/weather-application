import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import Cards from './components/Cards';
import SearchBar from './components/SearchBar';

class App extends Component{
  constructor(){
    super();

    this.state = {
      center: [-98.4916, 29.4252]
    }

    this.changeCenter = this.changeCenter.bind(this);
  }

  changeCenter(city){
    var that = this;
    console.log(city);

    that.setState({
      center: city
    })
  }

  render(){
    return(
      <div className="App">
        <Cards center={this.state.center}/>
        <SearchBar changeCenter={this.changeCenter}/>
        <Map center={this.state.center} changeCenter={this.changeCenter} />
      </div>
    )
  }
}
export default App;
