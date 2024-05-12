import React from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import {AsyncStorage, View} from 'react-native';


// Configurar em português
LocaleConfig.locales['pt-br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
    dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
};
  
LocaleConfig.defaultLocale = 'pt-br'; // Defini como localização padrão



export default function Calendario({ selectedDates, setSelectedDates }) {

    const handleDayPress = (date) => {

        let updatedSelectedDates = { ...selectedDates };
        // Verificar se a data já está marcada
        if (updatedSelectedDates[date.dateString]) {
          // Se estiver marcada, remover
          delete updatedSelectedDates[date.dateString];
        } else {
          // Se não estiver marcada, adicionar
          //Aqui define a cor da marcação
          updatedSelectedDates = { ...selectedDates, [date.dateString]: { marked: true, selected: true, dotColor: 'green', selectedColor: 'green'} };
        }
    
        setSelectedDates(updatedSelectedDates);

        // Salvar datas selecionadas no AsyncStorage
        AsyncStorage.setItem('selectedDates', JSON.stringify(updatedSelectedDates))
    };

  return (
    <View>
    <Calendar
      hideExtraDays={true}
      onDayPress={handleDayPress}
      markedDates={selectedDates}
    />
    </View>
  );
}
