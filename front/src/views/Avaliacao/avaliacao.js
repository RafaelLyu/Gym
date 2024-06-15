import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../themes/themeContext'; 
import { lightTheme, darkTheme } from '../../themes/themes';

export default function AvaliacaoScreen() {
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  const metas = [
    { label: 'Emagrecer', valorDiario: "500 calorias por dia abaixo do seu gasto calórico total", color: '#FF6347' }, 
    { label: 'Ganhar Massa Muscular', valorDiario: "aumento de 300 calorias por dia", color: '#00BFFF' }, 
    { label: 'Prática de Exercício', valorDiario: "em média 2000 calorias por dia", color: '#9ACD32' }, 
    { label: 'Outra', valorDiario: '', color: '#9370DB' }, 
  ];

  const [metaSelecionada, setMetaSelecionada] = useState(null);
  const [imc, setIMC] = useState('');
  const [medidas, setMedidas] = useState({
    altura : '',
    peso : '',
    cintura : '',
    abdomen : '',
    pescoco : '',
    torax : '',
    quadril : '',
    bracoesq : '',
    bracodir : '',
    antebracoesq: '',
    antebracodir: '',
    punhoesq: '',
    punhodir: '',
    coxaesq: '',
    coxadir: '',
    panturrilhaesq: '',
    panturrilhadir: '',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedMeta = await AsyncStorage.getItem('metaSelecionada');
        const savedMedidas = await AsyncStorage.getItem('medidas');
        const savedIMC = await AsyncStorage.getItem('imc');
        if (savedMeta !== null) setMetaSelecionada(savedMeta);
        if (savedMedidas !== null) setMedidas(JSON.parse(savedMedidas));
        if (savedIMC !== null) setIMC(savedIMC);
      } catch (error) {
        Alert.alert('Erro', 'Falha ao carregar dados');
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('metaSelecionada', metaSelecionada || '');
        await AsyncStorage.setItem('medidas', JSON.stringify(medidas));
        await AsyncStorage.setItem('imc', imc);
      } catch (error) {
        Alert.alert('Erro', 'Falha ao salvar dados');
      }
    };
    saveData();
  }, [metaSelecionada, medidas, imc]);

  const calcularIMC = (peso, altura) => {
    const pesoFloat = parseFloat(peso);
    const alturaFloat = parseFloat(altura);

    if (isNaN(pesoFloat) || isNaN(alturaFloat) || alturaFloat === 0) {
      return 0;
    }

    const alturaMetros = alturaFloat / 100;
    return (pesoFloat / (alturaMetros * alturaMetros)).toFixed(2);
  };

  const colorByIMC = (imc) => {
    const imcFloat = parseFloat(imc);
    if (imcFloat < 18.5) {
      return '#006400'; 
    } else if (imcFloat >= 18.5 && imcFloat <= 24.9) {
      return '#00FF00'; 
    } else if (imcFloat >= 25 && imcFloat <= 30) {
      return '#FFFF00'; 
    } else if (imcFloat >= 30.1 && imcFloat <= 39.9) {
      return '#FF0000'; 
    } else {
      return '#800000';
    }
  };

  const handleCalcularIMC = () => {
    const indice = calcularIMC(parseFloat(medidas.peso), parseFloat(medidas.altura));
    setIMC(indice);
  };

  const handleInputChange = (key, value) => {
    const newValue = value.replace(/[^0-9.]/g, '');
    setMedidas({ ...medidas, [key]: newValue });
  };

  const handleMetaChange = (meta) => {
    setMetaSelecionada(meta);
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.title, { color: currentTheme.text }]}>Avaliação</Text>
      <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Minha meta</Text>
      <View style={styles.buttonContainer}>
        {metas.map((meta, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.metaButton,
              { 
                backgroundColor: metaSelecionada === meta.label ? meta.color : currentTheme.translucentButtonBackground,
                borderRadius: 5, 
              },
            ]}
            onPress={() => handleMetaChange(meta.label)}
          >
            <Text style={[styles.buttonText, { color: currentTheme.text }]}>{meta.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {metaSelecionada && (
        <Text style={[styles.result, { color: currentTheme.text }]}>
          Consumo calórico diário médio: {metas.find(item => item.label === metaSelecionada)?.valorDiario} "consulte um nutricionista"
        </Text>
      )}
      <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Medidas Corporais</Text>
      <View style={styles.inputRow}>
        <Text style={[styles.label, { color: currentTheme.text }]}>Altura:</Text>
        <TextInput
          style={[styles.textInput, { color: currentTheme.text, backgroundColor: 'transparent' }]}
          value={medidas.altura}
          onChangeText={(value) => handleInputChange('altura', value)}
          keyboardType="numeric"
          placeholder="cm"
          placeholderTextColor={currentTheme.placeholder}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={[styles.label, { color: currentTheme.text }]}>Peso:</Text>
        <TextInput
          style={[styles.textInput, { color: currentTheme.text, backgroundColor: 'transparent' }]}
          value={medidas.peso}
          onChangeText={(value) => handleInputChange('peso', value)}
          keyboardType="numeric"
          placeholder="kg"
          placeholderTextColor={currentTheme.placeholder}
        />
      </View>
      <TouchableOpacity style={[styles.button, { backgroundColor: currentTheme.buttonBackground }]} onPress={handleCalcularIMC}>
        <Text style={[styles.buttonText, { color: currentTheme.buttonText }]}>Calcular IMC</Text>
      </TouchableOpacity>
      {imc !== '' && (
        <Text style={[styles.result, { color: colorByIMC(imc) }]}>IMC: {imc}</Text>
      )}
      <View style={styles.infoRow}>
        <View style={[styles.bullet, { backgroundColor: '#006400' }]} />
        <Text style={[styles.info, { color: currentTheme.text }]}>
          Abaixo do peso: Menor que 18,5
        </Text>
      </View>
      <View style={styles.infoRow}>
        <View style={[styles.bullet, { backgroundColor: '#00FF00' }]} />
        <Text style={[styles.info, { color: currentTheme.text }]}>
          Peso saudável: 18,5 - 24,9
        </Text>
      </View>
      <View style={styles.infoRow}>
        <View style={[styles.bullet, { backgroundColor: '#FFFF00' }]} />
        <Text style={[styles.info, { color: currentTheme.text }]}>
          Sobrepeso: 25,0 - 30,0
        </Text>
      </View>
      <View style={styles.infoRow}>
        <View style={[styles.bullet, { backgroundColor: '#FF0000' }]} />
        <Text style={[styles.info, { color: currentTheme.text }]}>
          Obeso: 30,1 - 39,9
        </Text>
      </View>
      <View style={styles.infoRow}>
        <View style={[styles.bullet, { backgroundColor: '#800000' }]} />
        <Text style={[styles.info, { color: currentTheme.text }]}>
          Obeso Mórbido: Maior que 40
        </Text>
      </View>
      <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Medidas de Membros</Text>
      {Object.entries(medidas).map(([key, value]) => {
        if (key !== 'altura' && key !== 'peso') {
          return (
            <View key={key} style={styles.inputRow}>
              <Text style={[styles.label, { color: currentTheme.text }]}>{key}:</Text>
              <TextInput
                style={[styles.textInput, { color: currentTheme.text, backgroundColor: 'transparent' }]}
                value={value}
                onChangeText={(itemValue) => handleInputChange(key, itemValue)}
                keyboardType="numeric"
                placeholder="cm"
                placeholderTextColor={currentTheme.placeholder}
              />
            </View>
          );
        }
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
    marginLeft: 20, // Margem esquerda
    marginRight: 20, // Margem direita
  },
  metaButton: {
    width: '35%',
    aspectRatio: 2,
    borderRadius: 4, // Aqui está o tamanho das bordas dos botões de metas
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 14, // Reduzido o tamanho da fonte
    textAlign: 'center',
  },
  result: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  textInput: {
    flex: 2,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#32CD32',
    padding: 8,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  info: {
    flex: 1,
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 4,
    marginVertical: 10,
  },
});
