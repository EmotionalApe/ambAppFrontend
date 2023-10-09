import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PatientHome from '../screens/PatientHome';
import Login from '../screens/Login';
import DriverHome from '../screens/DriveHome'
import DriveAmbiType from '../screens/DriveAmbiType';



const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Group>
            <Stack.Screen name="Login" component={Login}></Stack.Screen>
            
            <Stack.Screen name="Patient" component={PatientHome}></Stack.Screen>

            <Stack.Screen name="AmbuSelect" component={DriveAmbiType}></Stack.Screen>
            
            <Stack.Screen name="Driver" component={DriverHome}></Stack.Screen>
        </Stack.Group>
    </Stack.Navigator>
  )
}

export default StackNavigator