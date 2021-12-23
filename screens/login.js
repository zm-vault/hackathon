import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import baseStyles from '../components/styles';

const Login = (props) => {
  const navigation = useNavigation();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formReady = email && password;

  const setToken = async (value) => {
    try {
      await AsyncStorage.setItem('acme_token', value)
    } catch (e) {
      console.log(e)
      // saving error
    }
  }

  const handleLogin = (props) => {
    setError('');
    setLoading(true);

    axios.post(
      "http://192.168.1.102:5000/v1/login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      },
    )
    .then((response) => {
      setLoading(false);
      // Handle the JWT response here)
      if (response.data.token) {
        setToken(response.data.token);
      }
      navigation.reset({
        index: 0,
        routes: [{
           name: 'Home'
        }],
      });
    })
    .catch((e) => {
      console.log(e);
      setLoading(false);
      if (e.response.data.err_msg) {
        setError(e.response.data.err_msg);
      } else {
        setError('There was an error.');
      }
       // Handle returned errors here
    });

  }

  return (
    <View style={[styles.container]}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#209cff', '#68e0cf']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.background}
      />

      <View style={styles.cardCon}>
        <View style={[styles.card, styles.loginCard]}>
          <View style={styles.Middle}>
            <Text style={styles.LoginText}>Login</Text>
          </View>

          {/* Username or Email Input Field */}
          <View style={styles.inputWrap}>
            <Input
              // InputLeftElement={
              //   <Icon
              //     as={<FontAwesome5 name="user-secret" />}
              //     size="sm"
              //     m={2}
              //     _light={{
              //       color: "black",
              //     }}
              //     _dark={{
              //       color: "gray.300",
              //     }}
              //   />
              // }
              variant="outline"
              placeholder="Email"
              _light={{
                placeholderTextColor: "blueGray.400",
              }}
              _dark={{
                placeholderTextColor: "blueGray.50",
              }}
              textContentType="emailAddress"
              style={styles.textInput}
              onChangeText={text => setEmail(text)}
              value={email || ''}
              id="email"
            />
          </View>

          {/* Password Input Field */}
          <View style={styles.inputWrap}>
            <Input
              variant="outline"
              secureTextEntry={true}
              placeholder="Password"
              _light={{
                placeholderTextColor: "blueGray.400",
              }}
              _dark={{
                placeholderTextColor: "blueGray.50",
              }}
              textContentType="password"
              style={styles.textInput}
              onChangeText={text => setPassword(text)}
              value={password || ''}
            />
          </View>
          <Text styles={styles.loginErrMsg}>
            {error}
          </Text>
          {/* Button */}
          <View style={styles.inputWrap}>
            <Button
              style={styles.buttonStyle}
              isDisabled={!formReady}
              onPress={() => handleLogin()}
            >
              Login
            </Button>
          </View>
          <View style={styles.regText}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")} >
              <Text style={styles.signupText}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Login />
    </NativeBaseProvider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#209cff',
    paddingTop: 40,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  card: baseStyles.card,
  cardCon: baseStyles.cardCon,
  Middle: baseStyles.center,
  textInput: baseStyles.textInput,
  inputWrap: baseStyles.inputWrap,
  buttonStyle: baseStyles.button,
  loginErrMsg: baseStyles.loginErrMsg,
  loginCard: {
    shadowOpacity: 0,
    height: 'auto',
    paddingVertical: 40,
  },
  background: {
    position:'absolute',
    left:0,
    right:0,
    bottom:0,
    top: 0,
  },
  LoginText: {
    color: '#28241d',
    fontSize:30,
    fontWeight:'bold',
  },
  regText:{
    color: '#28241d',
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:20
  },
  signupText:{
    color: '#28241d',
    fontWeight:'bold'
  },
  emailField:{
    marginTop:30,
    marginLeft:15
  },
  lineStyle:{
    flexDirection:'row',
    marginTop:30,
    marginLeft:15,
    marginRight:15,
    alignItems:'center'
  },
  imageStyle:{
    width:80,
    height:80,
    marginLeft:20,
  },
  boxStyle:{
    flexDirection:'row',
    marginTop:30,
    marginLeft:15,
    marginRight:15,
    justifyContent:'space-around'
  },
});
