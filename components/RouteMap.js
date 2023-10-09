import React from 'react'
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import data from '../assets/data';
import { Image} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';

function RouteMap(props) {
    const mapStyle=[
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ]
    const origin = {
        // latitude: 18.5147062,:
        // longitude: 73.8800204

        latitude: props.coords.origin.latitude,
        longitude: props.coords.origin.longitude
    }

    const dest = {
        
        // latitude: 18.485870,
        // longitude: 73.905853

        latitude: props.coords.destination.latitude,
        longitude: props.coords.destination.longitude
    }

    const apikey='AIzaSyBwhekKooSCDP-Bi3KyGxSgQ6xicDhbjXk'

  return (
    <MapView customMapStyle={mapStyle}
    style={{height: '55%', width: '100%'}} 
      initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}>


      <Marker coordinate={{...origin}}>
        <Image style={{width: 35, height: 35, resizeMode:'cover'}} 
                source={require('../assets/yourLocation.png') } />
      
      </Marker>

      <Marker coordinate={{...dest}}>

        {/* <Image style={{width: 25, height: 20, resizeMode:'cover'}} 
                source={require('../assets/ambulance3.png')} /> */}


        {props.class=='patient' ? 
                (<Image style={{width: 25, height: 20, resizeMode:'cover'}} 
                source={require('../assets/ambulance3.png')} />) 
                : (<Image style={{width: 30, height: 30, resizeMode:'cover'}} 
                source={require('../assets/emer.png')} />)}
      </Marker>

        
      <MapViewDirections origin={origin} destination={dest} apikey={apikey}/>
      

    </MapView> 
  )
}

export default RouteMap

