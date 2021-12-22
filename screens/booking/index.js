import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import baseStyles from '../../components/styles';


const Booking = (props) => {
  const [flightID, setFlightID] = useState('');
  const [flightCost, setFlightCost] = useState('');
  const [departure, setDeparture] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const flightIDRef = useRef(null);

  useEffect(() => {
    flightIDRef.current.focus();
  }, []);

  const handleMoneyChange = (value) => {
    let useValue = value.replace(/[^0-9.]/g, '');
    if (useValue.split('.').length>2) {
      useValue = useValue.replace(/\.+$/,'');
    }
    useValue = parseFloat(useValue).toFixed(2);
    setFlightCost(useValue);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.cardCon}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Flight Details
          </Text>
          <View style={styles.cardContent}>

            <View style={styles.inputWrap}>
              <Input
                ref={flightIDRef}
                variant="outline"
                placeholder="Flight ID"
                style={styles.textInput}
                onChangeText={flightID => setFlightID(flightID)}
                value={flightID || ''}
              />
            </View>

            <View style={styles.inputWrap}>
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
              <Input
                variant="outline"
                placeholder="Departure Date"
                style={styles.textInput}
                onChangeText={departure => setDeparture(departure)}
                value={departure || ''}
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
              <Input
                textContentType="name"
                variant="outline"
                placeholder="Full Name"
                style={styles.textInput}
                onChangeText={name => setName(name)}
                value={name || ''}
              />
            </View>

            <View style={styles.inputWrap}>
              <Input
                keyboardType="numeric"
                variant="outline"
                placeholder="Age"
                style={styles.textInput}
                onChangeText={age => setAge(age)}
                value={age || ''}
              />
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
      <Booking />
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
