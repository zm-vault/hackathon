import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import baseStyles from '../components/styles';

const User = (props) => {
  const navigation = useNavigation();

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('acme_token');
      return token;
    } catch(e) {
      console.log(e);
      // error reading value
    }
  }

  const isLoggedIn = async () => {
    getToken()
    .then(data => {
      if (data) {
        return;
      } else {
        navigation.reset({
          index: 0,
          routes: [{
             name: 'Login'
          }],
        });
      }
    })
  }

  useEffect(() => {
    isLoggedIn()
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('acme_token')
    } catch(e) {
      console.log(e);
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{
         name: 'Login'
      }],
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.cardCon}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            User
          </Text>
          <View style={styles.cardContent}>
            <View style={styles.dataLabelC}>
              <Text style={styles.dataLabelL}>
                Name:
              </Text>
              <Text style={styles.dataLabelD}>
                John Smith
              </Text>
            </View>
            <View style={styles.dataLabelC}>
              <Text style={styles.dataLabelL}>
                Email:
              </Text>
              <Text style={styles.dataLabelD}>
                placeholder@email.com
              </Text>
            </View>
          </View>
          <Button
            style={styles.buttonStyle}
            onPress={() => handleLogout()}
          >
            Logout
          </Button>
        </View>
      </View>
      <View style={styles.cardCon}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Support
          </Text>
          <View style={styles.cardContent}>
            <View style={styles.dataLabelC}>
              <Text style={styles.dataLabelL}>
                Customer Support:
              </Text>
              <Text style={styles.dataLabelD}>
                placeholder@acme.com
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <User />
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f8f8ff',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  card: baseStyles.card,
  cardCon: baseStyles.cardCon,
  Middle: baseStyles.center,
  textInput: baseStyles.textInput,
  inputWrap: baseStyles.inputWrap,
  buttonStyle: baseStyles.button,
  cardTitle: baseStyles.cardTitle,
  cardContent: baseStyles.cardContent,
  title: baseStyles.headerTitle,
  dataLabelC: baseStyles.dataLabelC,
  dataLabelL: baseStyles.dataLabelL,
  dataLabelD: baseStyles.dataLabelD,
});
