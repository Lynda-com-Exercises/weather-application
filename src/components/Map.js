import React, { Component } from 'react';
import '../css/Map.css';
import './geocode.js';

const mapboxKey = require('./keys.js');
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')
mapboxgl.accessToken = mapboxKey;
var marker = new mapboxgl.Marker({
    draggable: true
});

class Map extends Component{
    constructor(props){
        super(props);
    }

    onDragEnd(){
        let lngLat = marker.getLngLat();
        this.props.changeCityCenter(lngLat.lng, lngLat.lat);
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
    }

    render(){
        return(
            <div id="map"></div>
        )
    }
}
export default Map;