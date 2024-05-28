import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Picker } from 'react-native';

const metas = [
  { label: 'Emagrecer', valorDiario: "500 calorias por dia abaixo do seu gasto calórico total"}, 
  { label: 'Ganhar Massa Muscular', valorDiario: "aumento de 300 calorias por dia"}, 
  { label: 'Prática de Exercício', valorDiario: "em média 2000 calorias por dia"}, 
  { label: 'Outra', valorDiario: 0 }, 
];

export default function AvaliacaoScreen() {
  const [meta, setMeta] = useState('');
  const [metaSelecionada, setMetaSelecionada] = useState(null);
  const [imc, setIMC] = useState('');
  const [medidas, setMedidas] = useState({
    "cintura :": '',
    "abdomen :": '',
    "pescoco :": '',
    "torax :": '',
    "quadril :": '',
    "braço esq. :": '',
    "braço dir. :": '',
    "antebraço esq. :": '',
    "antebraço dir. :": '',
    "punho esq. :": '',
    "punho dir. :": '',
    "coxa esq. :": '',
    "coxa dir. :": '',
    "panturrilha esq. :": '',
    "panturrilha dir. :": '',
  });
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
      return '#006400'; // Verde escuro para abaixo do peso
    } else if (imcFloat >= 18.5 && imcFloat <= 24.9) {
      return '#00FF00'; // Verde claro para peso saudável
    } else if (imcFloat >= 25 && imcFloat <= 30) {
      return '#FFFF00'; // Amarelo para sobrepeso
    } else if (imcFloat >= 30.1 && imcFloat <= 39.9) {
      return '#FF0000'; // Vermelho para obeso
    } else {
      return '#800000'; // Vinho para obeso mórbido
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
  const handleMetaChange = (metaSelecionada) => {
    setMeta(metaSelecionada);
    const meta = metas.find(item => item.label === metaSelecionada);
    setMetaSelecionada(meta);
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Avaliação</Text>
      <Text style={styles.sectionTitle}>Minha meta</Text>
      <Picker
        style={styles.input}
        selectedValue={meta}
        onValueChange={(itemValue) => handleMetaChange(itemValue)}
      >
        <Picker.Item label="Selecione a meta" value="" />
        {metas.map((value, index) => (
          <Picker.Item key={index} label={value.label} value={value.label} />
        ))}
      </Picker>
      {metaSelecionada && (
        <Text style={styles.result}>
          Consumo calórico diário médio: {metaSelecionada.valorDiario}"consulte um nutricionista"
        </Text>
      )}
      <Text style={styles.sectionTitle}>Medidas Corporais</Text>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Altura:</Text>
        <Picker
          style={styles.picker}
          selectedValue={medidas.altura}
          onValueChange={(itemValue, itemIndex) => handleInputChange('altura', itemValue)}
        >
          {Array.from({ length: 161 }, (_, i) => (i + 120)).map((value) => (
            <Picker.Item key={value} label={`${value} cm`} value={value.toString()} />
          ))}
        </Picker>
        <Text style={styles.label}>Peso:</Text>
        <Picker
          style={styles.picker}
          selectedValue={medidas.peso}
          onValueChange={(itemValue, itemIndex) => handleInputChange('peso', itemValue)}
        >
          {Array.from({ length: 301 }, (_, i) => (i + 20)).map((value) => (
            <Picker.Item key={value} label={`${value} kg`} value={value.toString()} />
          ))}
        </Picker>
        <TouchableOpacity style={styles.button} onPress={handleCalcularIMC}>
          <Text style={styles.buttonText}>Calcular IMC</Text>
        </TouchableOpacity>
        {imc !== '' && (
          <Text style={[styles.result, { color: colorByIMC(imc) }]}>IMC: {imc}</Text>
        )}
      </View>
      <View style={styles.infoRow}>
        <View style={[styles.bullet, { backgroundColor: '#006400' }]} />
        <Text style={styles.info}>
          Abaixo do peso: Menor que 18,5
        </Text>
      </View>
      <View style={styles.infoRow}>
        <View style={[styles.bullet, { backgroundColor: '#00FF00' }]} />
        <Text style={styles.info}>
          Peso saudável: 18,5 - 24,9
        </Text>
      </View>
      <View style={styles.infoRow}>
        <View style={[styles.bullet, { backgroundColor: '#FFFF00' }]} />
        <Text style={styles.info}>
          Sobrepeso: 25,0 - 30,0
        </Text>
      </View>
      <View style={styles.infoRow}>
        <View style={[styles.bullet, { backgroundColor: '#FF0000' }]} />
        <Text style={styles.info}>
          Obeso: 30,1 - 39,9
        </Text>
      </View>
      <View style={styles.infoRow}>
        <View style={[styles.bullet, { backgroundColor: '#800000' }]} />
        <Text style={styles.info}>
          Obeso Mórbido: Maior que 40
        </Text>
      </View>
      <Text style={styles.sectionTitle}>Medidas de Membros</Text>
      {Object.entries(medidas).map(([key, value]) => {
        if (key !== 'altura' && key !== 'peso') {
          return (
            <View key={key} style={styles.inputRow}>
              <Text style={styles.label}>{key}</Text>
              <Picker
                style={styles.picker}
                selectedValue={value}
                onValueChange={(itemValue) => handleInputChange(key, itemValue)}
              >
                {Array.from({ length: 201 }, (_, i) => i).map((value) => (
                  <Picker.Item key={value} label={`${value} cm`} value={value.toString()} />
                ))}
              </Picker>
            </View>
          );
        }
        return null;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 10,
    justifyContent: 'center', 
  },
  label: {
    flex: 1,
    marginRight: 80,
    textAlign: 'center',
    fontSize: 16,
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16, 
  },
  picker: {
    flex: 2,
    fontSize: 14, 
  },
   
  button: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  result: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
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
    width: 70,
    height: 10,
    borderRadius: 4,
    marginVertical: 10,
  },
});