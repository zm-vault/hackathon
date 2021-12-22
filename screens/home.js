import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import baseStyles from '../components/styles';

const logo = require('../assets/images/logo_transparent.png');

const Home = (props) => {
  const navigation = useNavigation();
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
        <View style={[styles.card, styles.buyCard]}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.buyCardBG}
          />
          <Text style={[styles.cardTitle, styles.buyCardText]}>
            Buy Policy
          </Text>
          <View style={styles.cardContent}>
            <View style={[styles.inputWrap, styles.buyCardInput]}>
              <Input
                variant="outline"
                placeholder="Flight ID"
                textContentType="text"
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
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

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
  Middle: baseStyles.center,
  textInput: baseStyles.textInput,
  inputWrap: baseStyles.inputWrap,
  buttonStyle: baseStyles.button,
  cardTitle: baseStyles.cardTitle,
  cardContent: baseStyles.cardContent,
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
    borderRadius: 4,
    overflow: 'hidden',
  },
});
