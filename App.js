import React, { useState, useEffect, useRef } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NativeBaseProvider, Button } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from './screens/user';
import Home from './screens/home';
import Booking from './screens/booking';
import Login from './screens/login';
import Register from './screens/register';

const Stack = createStackNavigator();

const mainHeader = ({navigation}) => ({
  title: '',
  headerTransparent: true,
  headerTintColor: '#fff',
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate("Account")}>
      <FontAwesome5
        name="user-circle"
        size={30}
        style={{marginRight: 8}}
        color="white"
        solid
      />
    </TouchableOpacity>
  ),
});

const smallHeader = ({navigation}, title) => ({
  title: title,
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
  headerTintColor: '#fff',
  headerBackground: () => (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['#209cff', '#68e0cf']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
    />
  ),
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate("Account")}>
      <FontAwesome5
        name="user-circle"
        size={30}
        style={{marginRight: 8}}
        color="white"
        solid
      />
    </TouchableOpacity>
  ),
});

const App = (props) => {

  const setToken = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      console.log(e)
      // saving error
    }
  }

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }

  useEffect(() => {
    setToken('bumfluff');
    getToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Account"
          component={User}
          options={({navigation}) => smallHeader({navigation}, 'Account')}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={mainHeader}
        />
        <Stack.Screen
          name="Booking"
          component={Booking}
          options={({navigation}) => smallHeader({navigation}, 'New Policy')}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <App />
    </NativeBaseProvider>
  )
}
