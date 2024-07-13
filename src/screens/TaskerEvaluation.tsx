import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button } from 'react-native';

export function TaskerEvaluationScreen() {
  // Defina os dados do tasker diretamente no componente
  const tasker = {
    name: 'Ike. H',
    date: '06/06/23',
    image: 'https://via.placeholder.com/55',
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.taskerImage} source={{ uri: tasker.image }} />
        <Text style={styles.taskerName}>{tasker.name}</Text>
        <Text style={styles.taskerDate}>{tasker.date}</Text>
      </View>
      <Text style={styles.question}>Como foi o serviço?</Text>
      <Text style={styles.label}>Pontualidade:</Text>
      <View style={styles.range}>
        <Text>1</Text>
        <View style={styles.slider}></View>
        <Text>5</Text>
      </View>
      <Text style={styles.label}>Qualidade do serviço:</Text>
      <View style={styles.range}>
        <Text>1</Text>
        <View style={styles.slider}></View>
        <Text>5</Text>
      </View>
      <Text style={styles.label}>Comunicação:</Text>
      <View style={styles.range}>
        <Text>1</Text>
        <View style={styles.slider}></View>
        <Text>5</Text>
      </View>
      <Text style={styles.label}>Nos conte um pouco mais sobre {tasker.name}</Text>
      <TextInput style={styles.input} />
      <Button title="Enviar" onPress={() => { /* Função de envio */ }} />
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  taskerImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
  taskerName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#233DFF',
    marginLeft: 10,
  },
  taskerDate: {
    fontSize: 12,
    color: '#757B7C',
    marginLeft: 10,
  },
  question: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
    color: '#12229D',
  },
  label: {
    fontSize: 18,
    color: '#12229D',
    marginLeft: 20,
  },
  range: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  slider: {
    height: 4,
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#12229D',
  },
  input: {
    height: 40,
    borderColor: '#12229D',
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 20,
    paddingLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
