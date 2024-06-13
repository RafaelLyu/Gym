import { View, Text, TextInput, Button, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native'; // Importe Button de 'react-native'
import React, { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faLock, faEnvelope, faCalendarDays } from '@fortawesome/free-solid-svg-icons'

import DateTimePicker from '@react-native-community/datetimepicker';

export default function CadastroScreen() {
    const [nome, setNome] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const isCadastroDisabled = !email || !password || !nome ;


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };


    const createUser = async(nome , email, data, password) => {
        console.log("Cadastro aqui")
        const Data1 = {
            nome , email , data , password
        }
        await fetch("http://192.168.0.12:8005/api/cadrasto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Data1)
        });
        } 


    const handleSave = () => {
        createUser(nome, email, date.toISOString().split('T')[0], password);
    };

    return (
        <View style={styles.container}>
            {/* <View style={styles.topImageContainer}>
                <Image source={require("../../../assets/VectorTop.png")} style={styles.topImage} />
            </View> */}

            <View style={styles.introducao}>
                <Text style={styles.Textintroducao}>Cadastro</Text>
                <Text style={styles.SubTextintroducao}>Sua Jornada Começa Aqui</Text>
            </View>

            <View style={styles.inputContainer}>
                <FontAwesomeIcon
                    icon={faUser}
                    color="#BEBEBE"
                    size={15}
                    style={styles.inputIcon}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Digite seu Nome'
                    value={nome}
                    onChangeText={setNome}
                />
            </View>

            <View style={styles.inputContainer}>
                <FontAwesomeIcon
                    icon={faEnvelope}
                    color="#BEBEBE"
                    size={15}
                    style={styles.inputIcon}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Digite seu E-mail'
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <FontAwesomeIcon
                    icon={faCalendarDays}
                    color="#BEBEBE"
                    size={15}
                    style={styles.inputIcon}
                />
                <TouchableOpacity onPress={showDatepicker} style={styles.textInput}>
                    <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
                </TouchableOpacity>
            </View>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    onChange={onChange}
                />
            )}

            <View style={styles.inputContainer}>
                <FontAwesomeIcon
                    icon={faLock}
                    color="#BEBEBE"
                    size={15}
                    style={styles.inputIcon}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Criar Senha'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            <View style={styles.signInButtonContainer}>
                <Button
                    style={styles.signInButton}
                    title='Cadastrar'
                    onPress={handleSave}
                    disabled={isCadastroDisabled}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        position: 'relative',
    },
    topImageContainer: {
        width: "100%",
        height: 180,
    },
    topImage: {
        width: "100%",
        height: "100%",
    },
    introducao: {
        marginBottom: 40,
    },
    Textintroducao: {
        fontSize: 40,
        color: 'black',
        fontWeight: "600",
        letterSpacing: 2.0,
        textAlign: 'center',
    },
    SubTextintroducao: {
        textAlign: 'center',
        fontWeight: "400",
        letterSpacing: 1.5,
        color: "#447da9",
    },
    inputContainer: {
        backgroundColor: '#F8F8FF',
        borderRadius: 20,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 15,
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        height: 40,
        flex: 1,
        color: "#BEBEBE",
    },
    dateText: {
        color: "#BEBEBE",
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    inputIcon: {
        marginLeft: 10,
        marginRight: 5,
        color: "#BEBEBE",
    },
    signInButtonContainer: {
        justifyContent: 'center',
        padding: 20,
    },
    signInButton: {
        borderRadius: 20,
        letterSpacing: 2.0,
    },
    SignIn: {
        color: "#262626",
        fontSize: 25,
        fontWeight: 'bold',
    },
});
