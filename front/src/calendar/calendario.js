import React from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import {View} from 'react-native';

import { useTheme } from '../themes/themeContext'; // Modo light/dark
import { lightTheme, darkTheme } from '../themes/themes';

LocaleConfig.locales['pt-br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
    dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
};
  
LocaleConfig.defaultLocale = 'pt-br';



export default function Calendario({ selectedDates, setSelectedDates }) {
  // Config de temas (dark ou light)
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

    const handleDayPress = (date) => {

        let updatedSelectedDates = { ...selectedDates };
        // Verificar se a data já está marcada
        if (updatedSelectedDates[date.dateString]) {
          // Se estiver marcada, remover
          delete updatedSelectedDates[date.dateString];
        } else {
          // Se não estiver marcada, adicionar
          //Aqui define a cor da marcação
          updatedSelectedDates = { ...selectedDates, [date.dateString]: {selected: true, selectedColor: '#32CD32'} };
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
  
      dayTextStyle={{
        color: currentTheme.dayTextStyle, 
      }}
      theme={{
        calendarBackground: currentTheme.background,
        textSectionTitleColor: currentTheme.text,
        todayTextColor: currentTheme.todayTextColor,
        dayTextColor: currentTheme.text,
        arrowColor: currentTheme.text,
        monthTextColor: currentTheme.text,
        textDayFontFamily: 'monospace',
        textMonthFontFamily: 'monospace',
        textDayHeaderFontFamily: 'monospace',
      }}
    />
    </View>
  );
}