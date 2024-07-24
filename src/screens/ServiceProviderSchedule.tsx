import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Agenda, AgendaSchedule, AgendaEntry, DateData } from 'react-native-calendars';

export default function ServiceProviderSchedule() {
  const items: AgendaSchedule = {
    '2024-07-18': [{ name: 'Entrevista com candidato A', height: 50, day: '2024-07-18' }],
    '2024-07-19': [{ name: 'Reunião de equipe', height: 80, day: '2024-07-19' }],
    '2024-07-20': [],
    '2024-07-21': [
      { name: 'Entrega de relatório', height: 50, day: '2024-07-21' },
      { name: 'Análise de dados', height: 50, day: '2024-07-21' }
    ],
  };

  const renderItem = (item: AgendaEntry, firstItemInDay: boolean): JSX.Element => {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text>{item.name}</Text>
      </View>
    );
  };

  const renderEmptyDate = (): JSX.Element => {
    return (
      <View style={styles.emptyDate}>
        <Text>Sem eventos para este dia</Text>
      </View>
    );
  };

  return (
    <Agenda
      items={items}
      loadItemsForMonth={(month: {dateString: string, day: number, month: number, timestamp: number, year: number}) => {
        console.log('trigger items loading', month);
      }}
      onDayPress={(day: DateData) => {
        console.log('day pressed', day);
      }}
      selected={'2024-07-18'}
      minDate={'2024-07-01'}
      maxDate={'2024-07-31'}
      pastScrollRange={3}
      futureScrollRange={3}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      renderKnob={() => {
        return <View style={styles.knob} />;
      }}
      renderEmptyData={() => {
        return <View style={styles.emptyData} />;
      }}
      rowHasChanged={(r1: AgendaEntry, r2: AgendaEntry) => {
        return r1.name !== r2.name;
      }}
      hideKnob={false}
      showClosingKnob={true}
      markedDates={{
        '2024-07-18': { selected: true, marked: true },
        '2024-07-19': { marked: true },
        '2024-07-20': { disabled: true }
      }}
      disabledByDefault={false}
      onRefresh={() => console.log('refreshing...')}
      refreshing={false}
      theme={{
        agendaDayTextColor: 'yellow',
        agendaDayNumColor: 'green',
        agendaTodayColor: 'red',
        agendaKnobColor: 'blue'
      }}
      style={{}}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  knob: {
    width: 100,
    height: 5,
    backgroundColor: 'blue',
    marginTop: 10,
    borderRadius: 5
  },
  emptyData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});