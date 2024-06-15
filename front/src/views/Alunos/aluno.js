import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';

export default function AlunosScreen() {
    const [alunos, setAlunos] = useState([]);
    const [selectedAluno, setSelectedAluno] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetch('http://192.168.0.12:8005/api/alunos')
            .then(response => response.json())
            .then(data => setAlunos(data))
            .catch(error => console.error('Erro ao buscar alunos:', error));
    }, []);

    const handleDelete = (id) => {
        fetch(`http://192.168.0.12:8005/api/alunos/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao deletar aluno');
                }
                return response.json();
            })
            .then(() => {
                setAlunos(prevAlunos => prevAlunos.filter(aluno => aluno.id !== id));
                setModalVisible(false);
            })
            .catch(error => console.error('Erro ao deletar aluno:', error));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cancelar Matrícula</Text>
            <View style={styles.tableHeader}>
                <Text style={styles.headerText}>Nome</Text>
                <Text style={styles.headerText}>Matrícula</Text>
            </View>
            <FlatList
                data={alunos}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>{item.nome.toUpperCase()}</Text>
                        <Text style={styles.itemText}>{item.matricula}</Text>
                        <TouchableOpacity onPress={() => { setSelectedAluno(item); setModalVisible(true); }}>
                            <Text style={styles.deleteButton}>X</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            {selectedAluno && (
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Tem certeza que deseja excluir a matrícula de {selectedAluno.nome.toUpperCase()}?</Text>
                            <Button title="Cancelar" color='#32cd32' onPress={() => setModalVisible(false)} />
                            <Button title="Excluir" color='#32cd32' onPress={() => handleDelete(selectedAluno.id)} />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#32cd32'
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#ddd',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'left',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    itemText: {
        fontSize: 18,
        flex: 1,
        textAlign: 'left',
    },
    deleteButton: {
        color: 'red',
        fontSize: 18,
        marginLeft: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        gap: 10
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 18,
    },
});
