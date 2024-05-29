import React from 'react';
import { View, Image, Text, Linking, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import SendIntentAndroid from 'react-native-send-intent';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '../../themes/ThemeContext'; // Modo light/dark
import {lightTheme, darkTheme } from '../../themes/themes';

//Pra discar o numero, Rodei npm install react-native-send-intent

const numeroContato = '+5521998366215'; // Número de telefone pra ligar
const instagram = 'https://www.instagram.com/likefitnessgym?igsh=MXFpZzQ4YmY4NzlyMQ=='; //Insta da academia
const numeroWhatsapp = '+5521998366215'; //Contato do Zap Zap



//<Icon name='phone' size={20} color={'black'} />
//<Icon name='instagram' size={20} color={'white'} />
//<Icon name='whatsapp' size={20} color={'green'} />

export default function ContatosScreen() {


  
const {theme} = useTheme();
const currentTheme = theme === 'light' ? lightTheme : darkTheme;


  const botaoWhatsapp = () => {
    Linking.openURL('https://wa.me/' + numeroWhatsapp);
  };

  const discar = () => {
    if (Platform.OS === 'android') {
      SendIntentAndroid.sendPhoneCall(numeroContato);
    } else {
      const url = `tel:${numeroContato}`;
      Linking.openURL(url);
    }
  };

  return (
    <View style={[styles.viewConteiner, {backgroundColor: currentTheme.background}]}>
      <View style={styles.touchableView}>
        <Text style={[styles.avisoText, {color: currentTheme.text}]}>Entre em contato conosco</Text>
        <Text style={[styles.infoText, {color: currentTheme.text}]}>Atendimentos</Text>
        <Text style={[styles.infoText, {color: currentTheme.text}]}>Seg a Sexta: 6 ás 22:00 | Sáb e Dom: 8 ás 12:00</Text>
      </View>

        <TouchableOpacity onPress={discar} style={styles.ligarTouchable}>
          <Icon name='phone' size={25} color={'white'} />
        </TouchableOpacity>

        <View style={[styles.separator, {backgroundColor: currentTheme.separator}]}/>

        <TouchableOpacity onPress={botaoWhatsapp} style={styles.whatsappTouchable}>
          <Icon name='whatsapp' size={25} color={'white'} />        
        </TouchableOpacity>

        <View style={[styles.separator, {backgroundColor: currentTheme.separator}]}/>

        <TouchableOpacity onPress={() => Linking.openURL(instagram)}>
          <LinearGradient
            colors={['#9B30FF', '#FF1493', '#FF4500', '#FFA500', '#FFFF00' ]}
            style={styles.instagramTouchable}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>

            <Icon name='instagram' size={25} color={'white'} />

          </LinearGradient>
        </TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({
  viewConteiner:{ 
    flex: 1, 
    alignItems: 'center', 
    justifyContent:'space-evenly'

  },
  touchableView:{
    alignItems: 'center', 
    gap:10
  },
  avisoText:{
     fontSize: 24,
    },
  infoText:{
    fontSize:15,
    textAlign:'center'
  },
  ligarTouchable:{
  backgroundColor: '#0C0F11', 
  borderRadius: 10, 
  borderColor: '#32CD32', 
  borderWidth: 1, 
  paddingHorizontal:60,
  paddingVertical:10

  },
  whatsappTouchable:{
    backgroundColor: 'green', 
    borderRadius: 10, 
    paddingHorizontal:60,
    paddingVertical:10
  },
  instagramTouchable:{
    paddingVertical: 10, 
    paddingHorizontal: 60,
    borderRadius: 10 

  },
  separator: {
    height: 1,
    width: '90%', 
    marginVertical: 10, 
    
  },
});