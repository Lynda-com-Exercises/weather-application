import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';

class App extends Component{
  constructor(){
    super();
    this.state = {
      center: [-98.4916, 29.4252]
    }

    this.changeCenter = this.changeCenter.bind(this);
  }

  changeCenter(long, lat){
    let city = [long, lat];

    this.setState({
      center: city
    })
  }

  render(){
    return(
      <div className="App">
        <Map center={this.state.center} changeCityCenter={this.changeCenter} />
      </div>
    )
  }
}
export default App;
