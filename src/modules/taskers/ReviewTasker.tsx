import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


interface Tasker {
    name: string;
    date: string;
    image: string;
  }
  
  interface ReviewTaskerProps {
    tasker: Tasker;
  }

  export function ReviewTasker({ tasker }: ReviewTaskerProps) {
    return (
    <View style={styles.card}>
      <Image source={{ uri: tasker.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{tasker.name}</Text>
        <Text style={styles.date}>{tasker.date}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Avaliar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: 315,
    height: 101,
    left: 44,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#00108B',
    borderRadius: 20,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
  },
});
