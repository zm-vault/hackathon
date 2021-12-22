import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import baseStyles from '../components/styles';

const User = (props) => {
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
