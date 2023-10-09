import React from 'react'
import { Text } from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps'
import data from '../assets/data';
import { Image, View } from 'react-native';
import driverData from '../assets/driverData';


function HomeMap(props) {
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
  
  return (
    <MapView provider={PROVIDER_GOOGLE} customMapStyle={mapStyle} 
    style={{height: '55%', width: '100%'}} 
      initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}>
        
        {props.class=='patient'? (data.map((hosp)=> (
          <Marker 
          key={hosp.id}
          coordinate={{latitude: hosp.latitute,longitude: hosp.longitude}}>
            <Image style={{width: 25, height: 20}} 
                source={require('../assets/ambulance3.png')} />
          </Marker>
        ))) 
        : (driverData.map((emer)=> (
          <Marker 
          key={emer.id}
          coordinate={{latitude: emer.latitute,longitude: emer.longitude}}>
            <Image style={{width: 25, height: 20}} 
                source={require('../assets/emer.png')} />
          </Marker>
        )))}


        {/* {data.map((hosp)=> (
          <Marker 
          key={hosp.id}
          coordinate={{latitude: hosp.latitute,longitude: hosp.longitude}}>
            <Image style={{width: 25, height: 20}} 
                source={require('../assets/ambulance3.png')} />
          </Marker>
        ))} */}

        <Marker coordinate={{...origin}}>
          <Image style={{width: 35, height: 35, resizeMode:'cover'}} 
                source={require('../assets/yourLocation.png')} />
        </Marker>

      </MapView> 
  )
}

export default HomeMap