import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';

const logo = require('../assets/images/logo_transparent.png');

const Home = (props) => {
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
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Buy Policy
        </Text>
        <View style={styles.cardContent}>
          <Button
            title="Book Now"
            onPress={() =>
              this.props.navigation.navigate('Booking')
            }
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Existing Policies
        </Text>
        <View style={styles.cardContent}>
          <Button
            title="Book Now"
            onPress={() =>
              this.props.navigation.navigate('Booking')
            }
          />
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
  card: {
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity:0.05,
    shadowRadius:24,
    margin: 10,
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  cardTitle: {
    paddingBottom: 12,
  },
  cardContent: {

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
});
