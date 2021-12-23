import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Divider, Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
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
  const [hasAccepted, setHasAccepted] = useState(false);
  const [hasRejected, setHasRejected] = useState(false);

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
        setPolicy(response.data);
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

  const handleAcceptPolicy = async () => {
    getToken()
    .then(data => {
      if (data) {
        acceptPolicy(data);
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

  const acceptPolicy = (token) => {
    setError('');
    setLoading(true);
    axios.post(
      "http://35.190.192.18/v1/insurance/policy/modify",
      {
        "policyId": policy.referenceId
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
        setHasAccepted(true);
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
       // Handle returned errors here
    });

  }

  const handleRejectPolicy = async () => {
    getToken()
    .then(data => {
      if (data) {
        rejectPolicy(data);
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

  const rejectPolicy = (token) => {
    setError('');
    setLoading(true);
    console.log(345345, token)
    const url = 'http://35.190.192.18/v1/insurance/policy/modify?policyId=' + policy.referenceId;

    axios.delete(
      url,
      {
        headers: {
          "Authorization": token,
          "Access-Control-Allow-Origin": "*",
        }
      },
    )
    .then((response) => {
      setLoading(false);
      if (response) {
        setHasRejected(true);
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
       // Handle returned errors here
    });

  }

  let humDeparture;
  if (policy && policy.departureScheduledTimeTimestamp) {
    humDeparture = moment.unix(policy.departureScheduledTimeTimestamp).format('MMMM Do YYYY, h:mm:ss a');
  }

  let humLocalDeparture;
  if (policy && policy.departureScheduledLocalTime) {
    humLocalDeparture = moment(policy.departureScheduledLocalTime).format('MMMM Do YYYY, h:mm:ss a');
  }

  if (hasAccepted || hasRejected) {
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.cardCon}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {hasAccepted ? (
              'Policy Accepted'
            ) : (null)}
            {hasRejected ? (
              'Policy Rejected'
            ) : (null)}
          </Text>
          <View style={styles.cardContent}>
            {hasAccepted ? (
              <Text>
                You have accepted the policy. This may take a minute to reflect in the app.
              </Text>
            ) : (null)}
            {hasRejected ? (
              <Text>
                You have rejected the policy. This may take a minute to reflect in the app.
              </Text>
            ) : (null)}
            <View style={styles.inputWrap}>
              <Button
                style={styles.buttonStyle}
                onPress={() => navigation.reset({index: 0, routes: [{name: 'Home'}],})}
              >
                View Policies
              </Button>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomSpacer} />
    </ScrollView>
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

            <View style={styles.dataLabelC}>
              <Text style={styles.dataLabelL}>
                Status:
              </Text>
              <Text style={styles.dataLabelD}>
                {policy.status || '--'}
              </Text>
            </View>
            <View style={styles.dataLabelC}>
              <Text style={styles.dataLabelL}>
                Insurance Cost ($):
              </Text>
              <Text style={styles.dataLabelD}>
                {policy.insuranceCost || '--'}
              </Text>
            </View>
          </View>

          <Divider my="4" />

          <Text style={styles.cardTitle}>
            Policy Payouts
          </Text>

          <View style={styles.cardContent}>
            <View style={styles.dataLabelC}>
              <Text style={styles.dataLabelL}>
                Cancellation Refund Amount ($):
              </Text>
              <Text style={styles.dataLabelD}>
                {policy.cancelRefundAmount || '--'}
              </Text>
            </View>

            <View style={styles.dataLabelC}>
              <Text style={styles.dataLabelL}>
                3-6 Hours Delay Refund Amount ($):
              </Text>
              <Text style={styles.dataLabelD}>
                {policy.moreThan3HoursLessThan6Amaount || '--'}
              </Text>
            </View>

            <View style={styles.dataLabelC}>
              <Text style={styles.dataLabelL}>
                6+ Hours Delay Refund Amount ($):
              </Text>
              <Text style={styles.dataLabelD}>
                {policy.moreThan6HoursAmount || '--'}
              </Text>
            </View>

            {policy && policy.status === 'PENDING' ? (
              <View>
                <View style={styles.inputWrap}>
                  <Button
                    style={styles.buttonStyle}
                    onPress={() => handleAcceptPolicy()}
                  >
                    Accept
                  </Button>
                </View>
                <View style={styles.inputWrap}>
                  <Button
                    style={styles.buttonStyle}
                    colorScheme="secondary"
                    onPress={() => handleRejectPolicy()}
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

      <View style={styles.cardCon}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Flight Details
          </Text>
          <View style={styles.cardContent}>
            <View style={styles.dataLabelC}>
              <Text style={styles.dataLabelL}>
                Flight ID/Code:
              </Text>
              <Text style={styles.dataLabelD}>
                {policy.flightCode || '--'}
              </Text>
            </View>
            <View style={styles.dataLabelC}>
              <Text style={styles.dataLabelL}>
                Ticket Price ($):
              </Text>
              <Text style={styles.dataLabelD}>
                {policy.ticketPrice || '--'}
              </Text>
            </View>
            <View style={styles.dataLabelC}>
              <Text style={styles.dataLabelL}>
                Departure:
              </Text>
              <Text style={styles.dataLabelD}>
                {humDeparture || '--'}
              </Text>
            </View>
            <View style={styles.dataLabelC}>
              <Text style={styles.dataLabelL}>
                Departure (Local Time):
              </Text>
              <Text style={styles.dataLabelD}>
                {humLocalDeparture || '--'}
              </Text>
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
            <View style={styles.dataLabelC}>
              <Text style={styles.dataLabelL}>
                Name:
              </Text>
              <Text style={styles.dataLabelD}>
                {policy.fullName || '--'}
              </Text>
            </View>
            <View style={styles.dataLabelC}>
              <Text style={styles.dataLabelL}>
                Age:
              </Text>
              <Text style={styles.dataLabelD}>
                {policy.age || '--'}
              </Text>
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
