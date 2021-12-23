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
import ConfirmPolicy from './confirmpolicy';

const Booking = (props) => {
  const navigation = useNavigation();

  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [flightID, setFlightID] = useState('');
  const [flightCost, setFlightCost] = useState('');
  const [departure, setDeparture] = useState(new Date());
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [humDeparture, setHumDeparture] = useState('');

  const [requested, setRequested] = useState(false);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('acme_token');
      setToken(token);
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

  const handleSetName = (value) => {
    setName(value);
  }

  const handleSetFlightID = (value) => {
    setFlightID(value);
  }

  const handleMoneyChange = (value) => {
    let useValue = value.replace(/[^0-9.]/g, '');
    if (useValue.split('.').length>2) {
      useValue = useValue.replace(/\.+$/,'');
    }
    setFlightCost(useValue);
  }

  const handleDepartureChange = (event, date) => {
    let useValue = moment(date).format('YYYY-MM-DD');
    setDeparture(date);
    setHumDeparture(useValue);
  }

  const handleAgeChange = (value) => {
    let useValue = value.replace(/[^0-9]/g, '');
    setAge(useValue);
  }

  const handleGetQuote = (props) => {
    setError('');
    setLoading(true);

    axios.post(
      "http://192.168.1.102:5000/v1/insurance/policy",
      {
        "fullName": name,
        "flightCode": flightID,
        "ticketPrice": Number(flightCost),
        "departureDay": humDeparture,
        "age": Number(age)
      },
      {
        headers: {
          "Authorization": token,
          "Access-Control-Allow-Origin": "*",
        }
      },
    )
    .then((response) => {
      setLoading(false);
      if (response.data) {
        setRequested(true);
      }
    })
    .catch((e) => {
      console.log(e);
      setLoading(false);
      if (e.response.data.err_msg) {
        setError(e.response.data.err_msg);
      } else {
        setError('There was an error.');
      }
    });

  }

  const formReady = flightID && flightCost && departure && name && age;

  const flightIDRef = useRef(null);

  useEffect(() => {
    if (flightIDRef && flightIDRef.current) {
      flightIDRef.current.focus();
    }
  }, []);

  if (requested) {
    return (
      <ScrollView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.cardCon}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Policy Quote Requested
            </Text>
            <View style={styles.cardContent}>
              <Text>
                Your quote has been requested. You can view the status of your quote in your policy list.
              </Text>
              <View style={styles.inputWrap}>
                <Button
                  style={styles.buttonStyle}
                  isDisabled={!formReady}
                  onPress={() => navigation.navigate("Home")}
                >
                  View Policies
                </Button>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.cardCon}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Flight Details
          </Text>
          <View style={styles.cardContent}>

            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>
                Flight ID/Code:
              </Text>
              <Input
                ref={flightIDRef}
                variant="outline"
                placeholder="Flight ID/Code"
                style={styles.textInput}
                onChangeText={flightID => handleSetFlightID(flightID)}
                value={flightID || ''}
              />
            </View>

            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>
                Flight Cost ($):
              </Text>
              <Input
                keyboardType="numeric"
                variant="outline"
                placeholder="Flight Cost"
                style={styles.textInput}
                onChangeText={flightCost => handleMoneyChange(flightCost)}
                value={flightCost || ''}
              />
            </View>

            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>
                Departure Date:
              </Text>
              <DateTimePicker
                value={departure || new Date()}
                mode={'date'}
                display="inline"
                onChange={(event, date) => handleDepartureChange(event, date)}
                style={styles.datePickerInput}
              />
            </View>

          </View>
        </View>
      </View>
      <View style={styles.cardCon}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Passenger Details
          </Text>
          <View style={styles.cardContent}>
            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>
                Full Name:
              </Text>
              <Input
                textContentType="name"
                variant="outline"
                placeholder="Full Name"
                style={styles.textInput}
                onChangeText={name => handleSetName(name)}
                value={name || ''}
              />
            </View>

            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>
                Age:
              </Text>
              <Input
                keyboardType="numeric"
                variant="outline"
                placeholder="Age"
                style={styles.textInput}
                onChangeText={age => handleAgeChange(age)}
                value={age || ''}
              />
            </View>
            <Text styles={styles.loginErrMsg}>
              {error}
            </Text>

            <View style={styles.inputWrap}>
              <Button
                style={styles.buttonStyle}
                isDisabled={!formReady}
                onPress={() => handleGetQuote()}
              >
                Get Quote
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
      <Booking />
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
