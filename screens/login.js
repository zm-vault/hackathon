import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { alignContent, flex, flexDirection, width } from 'styled-system';


const Login = (props) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formReady = email && password;

  return (
    <View style={[styles.container]}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#209cff', '#68e0cf']}
        start={{
          x: 0,
          y: 0
        }}
        end={{
          x: 1,
          y: 1
        }}
        style={styles.background}
      />
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

        {/* Button */}
        <View style={styles.inputWrap}>
          <Button
            style={styles.buttonStyle}
            isDisabled={!formReady}
            onPress={() => navigation.navigate("Home")}
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
  card: {
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity:0.2,
    shadowRadius:24,
    margin: 10,
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  loginCard: {
    shadowOpacity: 0,
    height: 'auto',
    marginHorizontal: 20,
    paddingVertical: 40,
  },
  background: {
    position:'absolute',
    left:0,
    right:0,
    bottom:0,
    top: 0,
  },
  Middle:{
    alignItems:'center',
    justifyContent:'center',
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
  textInput:{
    paddingTop:16,
    paddingBottom:16,
    paddingLeft:16,
    paddingRight:16,
  },
  inputWrap:{
    marginTop:15,
    marginLeft:15,
    marginRight:15
  },
  buttonStyle:{
    marginTop:30,
    marginLeft:15,
    marginRight:15
  },
  buttonStyle:{
    paddingTop:12,
    paddingBottom:12,
    paddingLeft:12,
    paddingRight:12,
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
