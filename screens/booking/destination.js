import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Destination extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Destination</Text>
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

export default Destination;
