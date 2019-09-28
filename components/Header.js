import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Header = props => {
  return (
    <View style={styles.header}>
      <Image source={require('../logo.png')} style={{ width: 120, height: 120 }}></Image>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 70,
    paddingTop: 20,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default Header;