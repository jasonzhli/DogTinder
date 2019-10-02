import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Header = props => {
  return (
    <View style={styles.header}>
      <Image source={require('../logo.png')} style={{ width: 300, height: 300 }}></Image>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default Header;