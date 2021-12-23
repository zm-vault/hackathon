import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Divider, Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";

import baseStyles from '../components/styles';

const logo = require('../assets/images/logo_transparent.png');

const Home = (props) => {
  const navigation = useNavigation();

  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [policies, setPolicies] = useState([]);

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
        handleGetPolicies(data);
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

  const handleGetPolicies = (token) => {
    setError('');
    setLoading(true);
    axios.get(
      "http://35.190.192.18/v1/insurance/policy",
      {
        headers: {
          "Authorization": token,
          "Access-Control-Allow-Origin": "*",
        }
      },
    )
    .then((response) => {
      if (response.data) {
        setPolicies(response.data);
      }
    })
    .catch((e) => {
      if (e.response.data.err_msg) {
        setError(e.response.data.err_msg);
      } else {
        setError('There was an error.');
      }
    });
  }

  const policyLoop = policies && policies.map((item, index) => {

    let humDeparture = '--';
    if (item.departureScheduledTimeTimestamp) {
      humDeparture = moment.unix(item.departureScheduledTimeTimestamp).format('MMMM Do YYYY, h:mm:ss a');
    }

    let humLocalDeparture = '--';
    if (item.departureScheduledLocalTime) {
      humLocalDeparture = moment(item.departureScheduledLocalTime).format('MMMM Do YYYY, h:mm:ss a');
    }

    let humFlightCode = '--';
    if (item.flightCode) {
      humFlightCode = item.flightCode.toUpperCase();
    }

    return (
      <View key={index}>
        <View style={styles.dataLabelC}>
          <Text style={styles.dataLabelL}>
            Flight Code:
          </Text>
          <Text style={styles.dataLabelD}>
            {humFlightCode}
          </Text>
        </View>
        <View style={styles.dataLabelC}>
          <Text style={styles.dataLabelL}>
            Status:
          </Text>
          <Text style={styles.dataLabelD}>
            {item.status || '--'}
          </Text>
        </View>
        <View style={styles.dataLabelC}>
          <Text style={styles.dataLabelL}>
            Departure:
          </Text>
          <Text style={styles.dataLabelD}>
            {humDeparture}
          </Text>
        </View>
        <View style={styles.dataLabelC}>
          <Text style={styles.dataLabelL}>
            Departure (Local Time):
          </Text>
          <Text style={styles.dataLabelD}>
            {humLocalDeparture}
          </Text>
        </View>
        <View style={styles.inputWrap}>
          <Button
            style={styles.buttonStyle}
            onPress={() => {
              navigation.navigate('Details', { policyId: item.referenceId });
            }}
          >
            View Details
          </Button>
        </View>
        {policies && policies.length > 1 ? (
          <Divider my="6" />
        ) : (
          null
        )}
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#209cff', '#68e0cf']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.background}
      >
        <Image
          source={logo}
          alt="ACME Care"
          size="xl"
        />
      </LinearGradient>
      <TouchableWithoutFeedback
        onPressIn={() => navigation.navigate('Booking')}
      >
        <View style={styles.cardCon}>
          <View style={[styles.card, styles.buyCard]}>
            <View style={styles.buyCardOverlay}>
            </View>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.buyCardBG}
            />
            <Text style={[styles.cardTitle, styles.buyCardText]}>
              Buy Policy
            </Text>
            <Text style={[styles.cardText, styles.buyCardText]}>
              Enter your flight ID below to get started.
            </Text>
            <View style={styles.cardContent}>
              <View style={[styles.inputWrap, styles.buyCardInput]}>
                <Input
                  variant="outline"
                  placeholder="Flight ID"
                  style={[styles.textInput]}
                  InputLeftElement={
                    <FontAwesome5
                      name="plane"
                      size={30}
                      color="rgba(0,0,0,0.5)"
                      style={{marginLeft: 8}}
                      solid
                    />
                  }
                  isDisabled
                  onPressIn={() => navigation.navigate('Booking')}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.cardCon}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Existing Policies
          </Text>
          <View style={styles.cardContent}>
            {policyLoop && policyLoop.length ? (
              policyLoop
            ) : (
              <View>
                <Text>No Policies</Text>
                <View style={styles.inputWrap}>
                  <Button
                    style={styles.buttonStyle}
                    onPress={() => isLoggedIn()}
                  >
                    Refresh
                  </Button>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>

    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Home />
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
  background: {
    height: 250,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  card: baseStyles.card,
  cardCon: baseStyles.cardCon,
  Middle: baseStyles.center,
  textInput: baseStyles.textInput,
  inputWrap: baseStyles.inputWrap,
  buttonStyle: baseStyles.button,
  cardTitle: baseStyles.cardTitle,
  cardContent: baseStyles.cardContent,
  dataLabelC: baseStyles.dataLabelC,
  dataLabelL: baseStyles.dataLabelL,
  dataLabelD: baseStyles.dataLabelD,
  buyCard: {
    position: 'relative',
    backgroundColor: '#8ec5fc',
  },
  buyCardBG: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  buyCardText: {
    color: '#fff',
  },
  buyCardInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity:0.4,
    shadowRadius:24,
    elevation: 3,
  },
  buyCardOverlay: {
    backgroundColor: 'rgba(255,255,255,0)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  }
});
