import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

export function Navbar() {
  return (
    <View style={styles.navbar}>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    width: 315,
    height: 24,
    left: 30,
    top: 43,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
