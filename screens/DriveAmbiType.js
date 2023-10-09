import { View, Text,StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'


const DriveAmbiType = () => {
    const navigation = useNavigation()
    const [ambuType, setAmbuType] = useState('normal')

    return (
        <View style={styles.container}>
            <Text style={{fontSize:25, fontWeight:'bold', width:'90%', textAlign: 'center'}}>What type of Ambulance do you have?</Text>

            <Pressable style={[{borderRadius: 50,marginTop:20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', padding: 8}, ambuType=='regular'?{backgroundColor:'#4287f5'}:{backgroundColor:'#d0d4f2'}]} onPress={()=> {setAmbuType('regular')}}>
                <Image style={{width: 70, height: 35, marginRight: 5}} 
                    source={require('../assets/ambulanceIcon.png') } />
                <Text style={{fontSize: 15, width: '50%', margin: 5}}>Regular Ambulance</Text>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>₹30/km</Text>
            </Pressable>

            <Pressable style={[{borderRadius: 50, marginBottom:10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', padding: 8}, ambuType=='venti'?{backgroundColor:'#4287f5'}:{backgroundColor:'#d0d4f2'}]} onPress={()=> {setAmbuType('venti')}}>
                <Image style={{width: 70, height: 35, marginRight: 5}} 
                    source={require('../assets/ambulanceIcon.png') } />
                <Text style={{fontSize: 15, width: '50%', margin: 5}}>Ambulance with Oxygen and Ventilator</Text>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>₹34/km</Text>
            </Pressable>

            <Pressable style={{borderRadius: 50,marginTop:20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 0, backgroundColor: 'black', width: '40%', height: '6%'}} onPress={()=> {
                navigation.navigate("Driver",{ambuType})
            }}>
                <Text style={{fontSize: 15, color: 'white'}}>Confirm</Text>
            </Pressable>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop:40,
      backgroundColor: '#d0d4f2',
      justifyContent: 'center',
      alignItems: 'center'
    },
})

export default DriveAmbiType

