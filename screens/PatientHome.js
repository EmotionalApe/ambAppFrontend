import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, Alert, Pressable, RootTagContext} from 'react-native';
import HomeMap from '../components/HomeMap';
import RouteMap from '../components/RouteMap';
import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useStripe } from '@stripe/stripe-react-native';


const PatientHome = () => {
    const [isSelected, setSelected] = useState(false)
    const [ambuType, setAmbuType] = useState('regular')
    const [amount, setAmount] = useState(150)
    const [paymentMode, setPaymentMode] = useState('cash')

    const stripe = useStripe();
    
    const navigation = useNavigation()
  
    const handleConfirm = async ()=> {
      if (paymentMode=='card') {
        try {
          const response = await fetch ("https://vast-tan-bear-gown.cyclic.app/pay", {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body : JSON.stringify({"amount" : amount}),
          })
          const data = await response.json(); 
          if (!response.ok) return Alert.alert(data.message)
          const clientSecret = data.clientSecret
          const initSheet = await stripe.initPaymentSheet({
            paymentIntentClientSecret: clientSecret,
            merchantDisplayName: 'CareFlight',
            defaultBillingDetails: {
              address: {
               country: 'IN'}}
          })
          if (initSheet.error) return Alert.alert(initSheet.error.message)
          const presentSheet = await stripe.presentPaymentSheet({clientSecret})
          if (presentSheet.error) return Alert.alert(presentSheet.error.message)
          
          setSelected(true)
          Alert.alert('Confirmation', 'Your Ambulance has been confirmed.', [
          {text: 'OK', onPress: () => console.log('OK')},
          ])
  
        } catch (error) {
          console.error(error);
          Alert.alert("Something went wrong")
        }
      }

      else if (paymentMode=='cash') {
        setSelected(true)
          Alert.alert('Confirmation', 'Your Ambulance has been confirmed.', [
          {text: 'OK', onPress: () => console.log('OK')},
          ])
      }
      
    }

    const handleCancel = ()=> {
        setSelected(false);
        
        Alert.alert('Cancellation', 'Your Ambulance has been cancelled.', [
        {text: 'OK', onPress: () => console.log('OK')},
        ]);
    }

    const handleCall = ()=> {
      Alert.alert('Calling', 'Connecting to patient...', [
        {text: 'OK', onPress: () => console.log('OK')},
      ]);
    }

    const handleLogout = ()=> {
        Alert.alert('Log Out', 'Logged out', [
            {text: 'OK', onPress: () => navigation.navigate("Login")},
            ]);
    }

  const coordinates = {
    origin : {
      latitude: 18.5147062,
      longitude: 73.8800204
    },

    destination: {
      latitude: 18.485870,
      longitude: 73.905853
    }
  }

  return (

    <View style={styles.container}>

      {/* <Header title='Ambulance App' />  */}
      <StatusBar style="auto" />

      
      {!isSelected ? <HomeMap coords={coordinates} class={'patient'}/> 
                              : <RouteMap coords={coordinates} class={'patient'}/>}
                              
      {!isSelected ? 
      <View> 
        <View style={{flexDirection:'row', marginTop: 15, marginBottom: 0, justifyContent:'space-evenly'}}>
          <View style={styles.pickUp}>
            <Image style={{width: 20, height: 30, marginRight: 5}} 
                    source={require('../assets/yourLocation.png') } />
            <Text style={{fontSize:18, fontWeight: 'bold', color:'#001f2b'}}>Pickup Point</Text>
          </View>

          <View style={styles.pickUp}>
            <Image style={{width: 30, height: 20, marginRight: 5}} 
                    source={require('../assets/ambulance3.png') } />
            <Text style={{fontSize:18, fontWeight: 'bold', color:'#001f2b'}}>Ambulances</Text>
          </View>
        </View>

        <Pressable style={[{borderRadius: 50,marginTop:20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', padding: 8}, ambuType=='regular'?{backgroundColor:'#4287f5'}:{backgroundColor:'#d0d4f2'}]} onPress={()=> {setAmbuType('regular'), setAmount(150)}}>
          <Image style={{width: 70, height: 35, marginRight: 5}} 
                  source={require('../assets/ambulanceIcon.png') } />
          <Text style={{fontSize: 15, width: '50%'}}>Regular Ambulance</Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>₹150</Text>
        </Pressable>

        <Pressable style={[{borderRadius: 50, marginBottom:10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', padding: 8}, ambuType=='venti'?{backgroundColor:'#4287f5'}:{backgroundColor:'#d0d4f2'}]} onPress={()=> {setAmbuType('venti'), setAmount(200)}}>
          <Image style={{width: 70, height: 35, marginRight: 5}} 
                  source={require('../assets/ambulanceIcon.png') } />
          <Text style={{fontSize: 15, width: '50%'}}>Ambulance with Oxygen and Ventilator Ambulance</Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>₹200</Text>
        </Pressable>

        <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop:15}}>

          <Pressable style={[{flexDirection:'row', alignItems: 'center', paddingHorizontal:20, paddingVertical: 3, borderRadius:5},paymentMode=='cash'?{backgroundColor:'#4287f5'}:{backgroundColor:'#d0d4f2'}]} onPress={()=> {setPaymentMode('cash')}}>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>Cash</Text>
            <Image style={{width: 40, height: 40, marginLeft: 10}} 
                  source={require('../assets/cash.png') } />
          </Pressable>

          <Pressable style={[{flexDirection:'row', alignItems: 'center', paddingHorizontal:20, paddingVertical: 3, borderRadius:5},paymentMode=='card'?{backgroundColor:'#4287f5'}:{backgroundColor:'#d0d4f2'}]} onPress={()=> {setPaymentMode('card')}}>

            <Text style={{fontSize: 17, fontWeight: 'bold'}}>Card</Text>
            <Image style={{width: 40, height: 40, marginLeft: 10}} 
                  source={require('../assets/card.png') } />
          </Pressable>   
        </View>
        
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleConfirm} style={styles.btn}>
            <Text style={styles.btnText}>Book Ambulance</Text>
          </Pressable>
        </View>


      </View> : 
      <View>
        <View style={{marginTop: 10,justifyContent:'center', alignItems:'center'}}>

          <Text style={{fontSize:18, fontWeight: 'bold', color:'#001f2b'}}>Your Ambulance is on the way.</Text>
        
          <Image style={{width: 60, height: 60, marginTop: 20}} 
                  source={require('../assets/driver.png') } />

          <Text style={{fontSize:18, fontWeight: 'bold', color:'#001f2b'}}>Rajesh Kumar</Text>
        </View>
          
        <View style={styles.buttonContainer}>

          <Pressable onPress={handleCall} style={[styles.btn, {backgroundColor:'green'}]}>
            <Text style={[styles.btnText]}>Call</Text>
          </Pressable>

          <Pressable onPress={handleCancel} style={styles.btn}>
            <Text style={styles.btnText}>Cancel</Text>
          </Pressable>
      
        </View>

      </View>
    }

    </View>
  )
}

export default PatientHome

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop:40,
      backgroundColor: '#d0d4f2'
    },
  
    pickUp: {
      marginTop: 10,
      flexDirection: 'row',
    },
  
    buttonContainer: { 
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    btn: {
      borderRadius: 20,
      padding: 6,
      height: 50,
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      margin: 5,
    },
  
    btnText: {
      fontSize: 18,
      color: 'white',
    }
  
});