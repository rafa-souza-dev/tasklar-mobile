import React from 'react';
import { Image ,StyleSheet, View, Text } from 'react-native';
import { Navbar } from '../modules/taskers/Navbar';
import { ReviewTasker } from '../modules/taskers/ReviewTasker';

const taskers = [
  { name: 'Ike. H', date: '06/06/23', image: 'https://via.placeholder.com/55' },
  { name: 'Ike. H', date: '06/06/23', image: 'https://via.placeholder.com/55' },
  { name: 'Ike. H', date: '06/06/23', image: 'https://via.placeholder.com/55' },
  { name: 'Ike. H', date: '06/06/23', image: 'https://via.placeholder.com/55' },
];

export function ReviewScreen() {
  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.title}>Avaliar Serviços</Text>
      <View style={styles.list}>
        {taskers.map((tasker, index) => (
          <ReviewTasker key={index} tasker={tasker} />
        ))}
      </View>
      <View style={styles.footer}>
        <Image style={styles.icon} source={require('../../assets/Home.png')} />
        <Image style={styles.icon} source={require('../../assets/Star.png')} />
        <Image style={styles.icon} source={require('../../assets/Plus.png')} />
        <Image style={styles.icon} source={require('../../assets/ListMenu.png')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FB',
    paddingTop: 40,
  },
  title: {
    position: 'absolute',
    width: 216,
    height: 34,
    left: 80,
    top: 50,
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 28,
    lineHeight: 34,
    color: '#12229D',
  },
  list: {
    marginTop: 120,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    backgroundColor: '#fff',
  },
  icon: {
    width: 30,
    height: 30,
    backgroundColor: '#00108B',
    borderRadius: 15,
  },
});
