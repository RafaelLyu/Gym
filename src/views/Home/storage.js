import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para salvar dados no AsyncStorage
export const saveData = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value)); 
};

// Função para carregar dados do AsyncStorage
export const loadData = async (key) => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};
