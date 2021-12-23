import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

import baseStyles from '../../components/styles';

const Details = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [policy, setPolicy] = useState('');

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
        getPolicy(data);
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

  const getPolicy = (token) => {
    const useID = route.params.policyId;
    setError('');
    setLoading(true);
    const url = 'http://35.190.192.18/v1/insurance/policy?policyId=' + useID;
    axios.get(
      url,
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

  useEffect(() => {
    getPolicy()
  }, []);

  const acceptPolicy = (props) => {
    setError('');
    setLoading(true);

    axios.post(
      "http://35.190.192.18/v1/insurance/policy/modify",
      {
        "policyId": policy.policyId
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

  const rejectPolicy = (props) => {

  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.cardCon}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Policy Details
          </Text>
          <View style={styles.cardContent}>

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


            {policy && policy.status === 'PENDING' ? (
              <View>
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
            ) : (
              null
            )}

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
      <Details />
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
