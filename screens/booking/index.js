import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class Booking extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Booking</Text>
        <Button
          title="Home"
          onPress={() =>
            this.props.navigation.navigate('Home')
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Booking;
