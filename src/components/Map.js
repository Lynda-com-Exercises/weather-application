import React, { Component } from 'react';
import '../css/Map.css';
import './geocode.js';

const mapboxKey = require('./keys.js');
const geo = require('./geocode.js');
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')
mapboxgl.accessToken = mapboxKey;
var marker = new mapboxgl.Marker({
    draggable: true
});

var city;

class Map extends Component{
    constructor(props){
        super(props);

        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(){
        let lngLat = marker.getLngLat();

        city = [lngLat.lng, lngLat.lat];

        this.props.changeCenter(city);
    }

    onDrag(){
        var coordinates = document.getElementById('coordinates');
        var lngLat = marker.getLngLat();

        geo.reverseGeocode(lngLat, mapboxKey).then(function(result){
            if(result.features.some(place => place.id.substring(0,5) === "place")){
                coordinates.innerHTML = result.features[2].place_name;
            }
 
        });
    }

    componentDidMount(){
        var mapCenter = this.props.center;

        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            zoom: 10,
            center: mapCenter
        });

        marker.setLngLat(mapCenter);
        marker.addTo(map);
        marker.on('dragend', this.onDragEnd);
        marker.on('drag', this.onDrag);
    }

    render(){
        return(
            <div>
                <div id="map" onChange={this.onDragEnd}></div>
                <pre id="coordinates" className="coordinates"></pre>
            </div>
            
        )
    }
}
export default Map;