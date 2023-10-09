import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Pressable, Alert} from 'react-native'
import React from 'react'
import Header from '../components/Header'
import HomeMap from '../components/HomeMap'
import RouteMap from '../components/RouteMap'
import { useState } from 'react'
import driverData from '../assets/driverData'
import { useNavigation } from '@react-navigation/native';


const DriveHome = ({ route }) => {
  const [isConfirmed, setConfirmed] = useState(false)
  const [isOnDuty, setDuty] = useState(false)
  const navigation = useNavigation()

  const { ambuType } = route.params;
  
  const handleConfirm = ()=> {
    setConfirmed(true);
    Alert.alert('Confirmation', 'Patient alerted.', [
      {text: 'OK', onPress: () => console.log('OK')},
    ]);
  }

  const handleCall = ()=> {
    Alert.alert('Calling', 'Connecting to patient...', [
      {text: 'OK', onPress: () => console.log('OK')},
    ]);
  }

  const handleCancel = ()=> {
    setConfirmed(false);
    Alert.alert('Cancellation', 'Ride Cancelled', [
      {text: 'OK', onPress: () => console.log('OK')},
    ]);
  }

  const handleLogout = ()=> {
    Alert.alert('Log Out', 'Logged out', [
        {text: 'OK', onPress: () => navigation.navigate("Login")},]);
  }

  const coordinates = {
    origin : {
      latitude: 18.485870,
      longitude: 73.905853
    },

    destination: {
      latitude: 18.5147062,
      longitude: 73.8800204
    }
  }

  return (

    <View style={styles.container}>
      
      <Header title='Ambulance Driver App' /> 

      <StatusBar style="auto" />

      
      {!isConfirmed ? <HomeMap coords={coordinates} class={'driver'}/> 
                    : <RouteMap coords={coordinates} class={'driver'}/>}

      <View style={{alignItems:'center', marginTop: 10, flexDirection: 'row', justifyContent:'space-evenly'}}>
        <Pressable style={{backgroundColor:'black', padding: 10, borderRadius:100}}
          onPress={()=> {
            setDuty(!isOnDuty);
            if (!isOnDuty) {Alert.alert('Alert', 'Your location is now being shared', [
              {text: 'OK', onPress: () => console.log('OK')},
            ]);}
          }}>
          {isOnDuty ? <Text style={{fontWeight:'bold', color:'white'}}>On Duty</Text> 
            : <Text style={{fontWeight:'bold', color:'white'}}>Off Duty</Text>} 
        </Pressable>

        {/* <Text style={{color: 'darkblue', fontSize: 15, fontWeight:'bold'}}>{ambuType}</Text> */}

        {ambuType=='venti'? <Text style={{color: 'darkblue', fontSize: 15, fontWeight:'bold'}}>Ventilator | ₹34/km</Text> 
                            : <Text style={{color: 'darkblue', fontSize: 15, fontWeight:'bold'}}> Regular | ₹30/km</Text>}
        

      </View>
      

      {(!isConfirmed && isOnDuty)? 
      <View>
        <View style={styles.ambNear}>
          <Text style={{fontSize:18, fontWeight: 'bold', color:'#001f2b'}}>Current Emergencies: </Text>
        </View> 

        {driverData.map((item)=> (
        <View key={item.id}
          style={styles.emerContainer}>  

          <Text style={styles.emerName}>{item.name}</Text>

          <Pressable onPress={handleConfirm} style={styles.btnConf}>
            <Text style={styles.btnText}>Confirm</Text>
          </Pressable>

          <Pressable onPress={handleCall} style={styles.btnCall}>
            <Text style={styles.btnText}>Call</Text>
          </Pressable>
        </View>  
        ))}

        {/* <Pressable style={styles.btnCall}
        onPress={handleLogout} >
            <Text style={styles.btnText}>Logout</Text>
        </Pressable> */}
        
      </View>

      : 
      <View>
      </View>}
      
      {(isConfirmed && isOnDuty) ? 
      <View style={styles.ambNear}>
          <Text style={{fontSize:18, fontWeight: 'bold', color:'#001f2b'}}>Going to patient.</Text>
          <Pressable onPress={handleCall} style={styles.btnCall}>
              <Text style={styles.btnText}>Call</Text>
          </Pressable>

          <Pressable onPress={handleCancel} style={styles.emerName}>
              <Text style={styles.btnText}>Cancel</Text>
          </Pressable>

        </View> 
        : <View>
          </View>}
      
      
    </View>
  );
}

export default DriveHome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,
    backgroundColor: '#d0d4f2'
  },

  ambNear: {
    marginTop: 10,
    alignItems: 'center',
    width: '100%'
  },

  emerContainer: { 
    margin: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },

  btnConf: {
    borderRadius: 8,
    padding: 6,
    height: 45,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: 'darkblue'
  },

  btnCall: {
    borderRadius: 8,
    padding: 6,
    height: 45,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: 'darkgreen'
  },

  emerName: {
    borderRadius: 8,
    textAlign : 'center',
    textAlignVertical: 'center',
    height: 45,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: 'black',
    fontSize: 15,
    color: 'white',
  },

  btnText: {
    fontSize: 18,
    color: 'white',
  }

});
