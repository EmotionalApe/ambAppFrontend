import { View, Text,StyleSheet, Pressable, Alert, TextInput, SafeAreaView, Image} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
    const navigation = useNavigation()

    const handlePatient = ()=> {
        Alert.alert('Confirmation', 'Logged in as Patient', [
        {text: 'OK', onPress: () => navigation.navigate("Patient")},
        ]);
        setName(''); setPass('');
    }

    const handleDriver = ()=> {
        Alert.alert('Confirmation', 'Logged in as Driver', [
        {text: 'OK', onPress: () => navigation.navigate("AmbuSelect")},
        ]);
        setName(''); setPass('');
    }

    const [userName, setName] = useState('');
    const [password, setPass] = useState('');

  return (
    <View style={styles.container}> 

    <Image style={{width: 100, height: 50}} 
                source={require('../assets/ambulanceIcon.png') } />
    
    <Text style={styles.heading}>Welcome To Careflight</Text>

      <SafeAreaView style={{width: '70%'}}>
        <Text style={styles.labelText}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          type="text" 
          value={userName}
          onChangeText={setName}
          // placeholder='Phone No.'
        />
        <Text style={styles.labelText}>Password</Text>
        <TextInput
          style={styles.input}
          type='password' 
          value={password}
          onChangeText={setPass}
          // placeholder='Password'
        />
      </SafeAreaView>

        <View style={styles.buttonContainer}>  
            <Pressable onPress={handlePatient} style={styles.btn}>
                <Text style={styles.btnText}>Login as Patient</Text>
            </Pressable>

            <Pressable onPress={handleDriver} style={styles.btn}>
                <Text style={styles.btnText}>Login as Driver</Text>
            </Pressable>
        </View> 
    </View>  
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
      paddingTop:50,
      backgroundColor: '#d0d4f2', 
      justifyContent:'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    },

    heading: {
      color: '#091fbd',
      fontWeight: '900',
      fontSize: 30,
      margin: 20,
    },

    labelText: {
      fontSize : 16,
      fontWeight: 'bold',
      borderRadius : 8,
      color : '#3141b5',
    },

    input: {
      fontSize: 15,
      color: 'black',
      marginBottom: 10,
      backgroundColor: '#96a0e3',
      padding: 5,
      borderRadius: 8,
    },
  
  
    buttonContainer: { 
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
  
    btn: {
      borderRadius: 8,
      padding: 6,
      height: 50,
      width: '40%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3f4ba1',
      margin: 5,
    },
  
    btnText: {
      fontSize: 16,
      color: 'white',
      fontWeight: 'bold'
    }
  
});