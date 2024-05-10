import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';

export default function PerfilScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [date, setDate] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil do Cliente</Text>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder=" "
          value={nome}
          onChangeText={setNome}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder=" "
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Telefone:</Text>
        <TextInput
          style={styles.input}
          placeholder=" "
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Endereço:</Text>
        <TextInput
          style={styles.input}
          placeholder=" "
          value={endereco}
          onChangeText={setEndereco}
          keyboardType="address-line1"
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Data de nascimento:</Text>
        <View style={styles.dateInput}>
          <TextInput
            style={[styles.inputDate, { marginRight: 5 }]}
            placeholder="DD"
            maxLength={2}
            keyboardType="numeric"
            onChangeText={(setDate) => {
              // Adicionar lógica para lidar com a entrada do dia
            }}
          />
          <TextInput
            style={[styles.inputDate, { marginRight: 5 }]}
            placeholder="MM"
            maxLength={2}
            keyboardType="numeric"
            onChangeText={(setDate) => {
              // Adicionar lógica para lidar com a entrada do mês
            }}
          />
          <TextInput
            style={styles.inputDate}
            placeholder="AAAA"
            maxLength={4}
            keyboardType="numeric"
            onChangeText={(setDate) => {
              // Adicionar lógica para lidar com a entrada do ano
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    flex: 1,
    marginRight: 10,
    textAlign: 'left',
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  inputDate: {
    flex: 1,
    width: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 7,
    fontSize: 12,
  },
  dateInput: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
});
