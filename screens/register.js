import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { alignContent, flex, flexDirection, width } from 'styled-system';
import baseStyles from '../components/styles';

const Register = (props) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const formReady = email && password && confirmPassword && (password === confirmPassword);

  const handleRegister = (props) => {
    navigation.reset({
      index: 0,
      routes: [{
         name: 'Home'
      }],
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
      <View style={[styles.card, styles.loginCard]}>
        <View style={styles.Middle}>
          <Text style={styles.LoginText}>Register</Text>
        </View>

        {/* Username or Email Input Field */}
        <View style={styles.inputWrap}>
          <Input
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
            value={email}
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
            textContentType="newPassword"
            style={styles.textInput}
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </View>
        <View style={[styles.inputWrap, styles.passConfirm]}>
          <Input
            variant="outline"
            secureTextEntry={true}
            placeholder="Confirm Password"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
            textContentType="newPassword"
            style={styles.textInput}
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
          />
          <Text
            style={styles.passConfirmErr}
          >
            {password && confirmPassword && (password !== confirmPassword) ? (
              'Passwords do not match'
            ) : (
              ''
            )}
          </Text>
        </View>

        {/* Button */}
        <View style={styles.inputWrap}>
          <Button
            style={styles.buttonStyle}
            isDisabled={!formReady}
            onPress={() => handleRegister()}
          >
            Register
          </Button>
        </View>
        <View style={styles.regText}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")} >
            <Text style={styles.signupText}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Register />
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
  Middle: baseStyles.center,
  textInput: baseStyles.textInput,
  inputWrap: baseStyles.inputWrap,
  buttonStyle: baseStyles.button,
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
  passConfirm:{
    marginBottom:20,
    position:'relative',
  },
  passConfirmErr:{
    color: 'red',
    position: 'absolute',
    bottom: -24,
    textAlign: 'center',
    width: '100%',
  }
});
