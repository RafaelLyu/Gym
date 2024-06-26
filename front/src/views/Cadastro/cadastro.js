import { View, Text, TextInput, Button, StyleSheet, CheckBox } from 'react-native';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faLock, faEnvelope, faCalendarDays, faMobile } from '@fortawesome/free-solid-svg-icons';

export default function CadastroScreen() {
    const [nome, setNome] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isProfessor, setIsProfessor] = useState(false);

    const isCadastroDisabled = !email || !password || !nome;

    const createUser = async (nome, email, telefone, data, password, roleid) => {
        try {
            const Data1 = {
                nome, email, telefone, data, password, roleid
            };
            await fetch("http://10.12.156.139:8005/api/cadastro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Data1)
            });
            setFeedbackMessage("Cadastro realizado com sucesso!");
            resetInputs();
        } catch (error) {
            setFeedbackMessage("Erro ao cadastrar usuário.");
        }
    };

    const resetInputs = () => {
        setNome('');
        setPassword('');
        setEmail('');
        setTelefone('');
        setDate(new Date().toISOString().split('T')[0]);
        setIsProfessor(false);
    };

    const handleSave = () => {
        const roleid = isProfessor ? 2 : 1;
        createUser(nome, email, telefone, date, password, roleid);
    };

    return (
        <View style={styles.container}>
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
                    placeholder='Nome do Usuário'
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
                    placeholder='E-mail'
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <FontAwesomeIcon
                    icon={faMobile}
                    color="#BEBEBE"
                    size={15}
                    style={styles.inputIcon}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Telefone'
                    value={telefone}
                    onChangeText={setTelefone}
                />
            </View>

            <View style={styles.inputContainer}>
                <FontAwesomeIcon
                    icon={faCalendarDays}
                    color="#BEBEBE"
                    size={15}
                    style={styles.inputIcon}
                />
                <TextInput
                    style={styles.textInput}
                    type="date"
                    value={date}
                    onChangeText={setDate}
                />
            </View>

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

            <View style={styles.inputContainer}>
                <CheckBox
                    value={isProfessor}
                    onValueChange={setIsProfessor}
                />
                <Text style={styles.checkboxLabel}>Cadastrar como professor</Text>
            </View>

            {feedbackMessage ? <Text style={styles.feedbackText}>{feedbackMessage}</Text> : null}

            <View style={styles.signInButtonContainer}>
                <Button
                    style={styles.signInButton}
                    title='Cadastrar'
                    onPress={handleSave}
                    disabled={isCadastroDisabled}
                    color='#32cd32'
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
        color: "#32cd32",
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
    checkboxLabel: {
        flex: 1,
        color: "#BEBEBE",
        paddingLeft: 10,
        alignContent:'center',
        width: "100%"
    },
    feedbackText: {
        textAlign: 'center',
        marginVertical: 10,
        color: 'green',
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
