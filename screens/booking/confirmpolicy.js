import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

import baseStyles from '../../components/styles';

const ConfirmPolicy = (props) => {
  const navigation = useNavigation();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [flightID, setFlightID] = useState('');
  const [flightCost, setFlightCost] = useState('');
  const [departure, setDeparture] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

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

  const acceptPolicy = (props) => {
    setError('');
    setLoading(true);

    axios.post(
      "http://192.168.1.102:5000/v1/insurance/policy/modify",
      {
        "policyId": quote.policyId
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
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.cardCon}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Policy Terms
          </Text>
          <View style={styles.cardContent}>

            <View style={styles.dataLabelC}>
              <Text style={styles.dataLabelL}>
                Policy ID:
              </Text>
              <Text style={styles.dataLabelD}>
                {quote.policyId || '--'}
              </Text>
            </View>

            <View style={styles.dataLabelC}>
              <Text style={styles.dataLabelL}>
                Insurance Cost ($):
              </Text>
              <Text style={styles.dataLabelD}>
                {quote.insuranceCost || '--'}
              </Text>
            </View>

            <View style={styles.dataLabelC}>
              <Text style={styles.dataLabelL}>
                Cancellation Refund ($):
              </Text>
              <Text style={styles.dataLabelD}>
                {quote.cancelRefundAmount || '--'}
              </Text>
            </View>

            <View style={styles.dataLabelC}>
              <Text style={styles.dataLabelL}>
                3-6 Hour Delay Refund ($):
              </Text>
              <Text style={styles.dataLabelD}>
                {quote.moreThan3HoursLessThan6Amount || '--'}
              </Text>
            </View>

            <View style={styles.dataLabelC}>
              <Text style={styles.dataLabelL}>
                6+ Hour Delay Refund ($):
              </Text>
              <Text style={styles.dataLabelD}>
                {quote.moreThan6HoursAmount || '--'}
              </Text>
            </View>

            <View style={styles.inputWrap}>
              <Button
                style={styles.buttonStyle}
                isDisabled={!formReady}
                onPress={() => handleGetQuote()}
              >
                Accept
              </Button>
            </View>
            <View style={styles.inputWrap}>
              <Button
                style={styles.buttonStyle}
                isDisabled={!formReady}
                onPress={() => handleGetQuote()}
              >
                Reject
              </Button>
            </View>

          </View>
        </View>
      </View>
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <ConfirmPolicy />
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f8f8ff',
    paddingBottom: 120,
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
  inputLabel: baseStyles.inputLabel,
  buttonStyle: baseStyles.button,
  cardTitle: baseStyles.cardTitle,
  cardContent: baseStyles.cardContent,
  title: baseStyles.headerTitle,
  dataLabelC: baseStyles.dataLabelC,
  dataLabelL: baseStyles.dataLabelL,
  dataLabelD: baseStyles.dataLabelD,
  bottomSpacer: baseStyles.bottomSpacer,
});
