import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NativeBaseProvider, Button } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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

const smallHeader = ({navigation}) => ({
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
          options={smallHeader}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={mainHeader}
        />
        <Stack.Screen
          name="Booking"
          component={Booking}
          options={mainHeader}
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
