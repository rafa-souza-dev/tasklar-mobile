import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const proposals = [
  { name: 'Ike. H', date: '06/06/23 - 13h', service: 'Serviço - Encanador', image: 'https://via.placeholder.com/55', commentIcon: require('../../assets/comment.png') },
];

export function SolicitationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Propostas Solicitadas</Text>
      <View style={styles.list}>
        {proposals.map((proposal, index) => (
          <View key={index} style={styles.card}>
            <Image style={styles.ellipse} source={{ uri: proposal.image }} />
            <Text style={styles.name}>{proposal.name}</Text>
            <Text style={styles.date}>{proposal.date}</Text>
            <Text style={styles.service}>{proposal.service}</Text>
            <Image style={styles.commentIcon} source={proposal.commentIcon} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.acceptButton}>
                <Text style={styles.buttonText}>Aceitar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rejectButton}>
                <Text style={styles.buttonText}>Recusar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <View style={styles.icon} />
        <View style={styles.icon} />
        <View style={styles.icon} />
        <View style={styles.icon} />
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
    width: 297,
    height: 34,
    left: 48,
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
  card: {
    position: 'relative',
    width: 315,
    height: 150,
    left: 44,
    marginBottom: 20,
    borderRadius: 1,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  ellipse: {
    position: 'absolute',
    width: 55,
    height: 55,
    left: 11,
    top: 17,
    borderRadius: 27.5,
  },
  name: {
    position: 'absolute',
    width: 100,
    height: 29,
    left: 72,
    top: 17,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 29,
    textAlign: 'center',
    color: '#233DFF',
  },
  date: {
    position: 'absolute',
    width: 151,
    height: 20,
    left: 72,
    top: 46,
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
    color: '#757B7C',
  },
  service: {
    position: 'absolute',
    width: 151,
    height: 20,
    left: 72,
    top: 66,
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
    color: '#757B7C',
  },
  commentIcon: {
    position: 'absolute',
    width: 29,
    height: 29,
    left: 224,
    top: 44,
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    bottom: 10,
    paddingHorizontal: 10,
  },
  acceptButton: {
    width: 98,
    height: 30,
    backgroundColor: '#00108B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  rejectButton: {
    width: 98,
    height: 30,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 23,
    color: '#FFFFFF',
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
