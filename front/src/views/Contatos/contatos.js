import React from 'react';
import {View, Text, Linking, TouchableOpacity, Platform, StyleSheet, ScrollView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {lightTheme, darkTheme} from '../../themes/themes';
import {useTheme} from '../../themes/themeContext';

const numeroContato = '+5521998366215'; // Número de telefone pra ligar
const instagram = 'https://www.instagram.com/likefitnessgym?igsh=MXFpZzQ4YmY4NzlyMQ=='; //Insta da academia
const numeroWhatsapp = '+5521998366215'; //Contato do Zap Zap



export default function ContatosScreen() {
  
const {theme} = useTheme();
const currentTheme = theme === 'light' ? lightTheme : darkTheme;


  const botaoWhatsapp = () => {
    Linking.openURL('https://wa.me/' + numeroWhatsapp);
  };

  const discar = () => {
    const url = `tel:${numeroContato}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={[styles.viewConteiner, {backgroundColor: currentTheme.background}]}>
      <View style={styles.infoView}>
        <Text style={[styles.avisoText, {color: currentTheme.text}]}>Entre em contato conosco</Text>
        <Text style={[styles.infoText, {color: currentTheme.text}]}>Atendimentos</Text>
        <Text style={[styles.infoText, {color: currentTheme.text}]}>Seg a Sexta: 6 ás 22:00 | Sáb e Dom: 8 ás 12:00</Text>
      </View>

      <View style={styles.spacer} />
        <TouchableOpacity onPress={discar} style={[styles.ligarTouchable, {backgroundColor:currentTheme.backgroundOposto}]}>
          <Icon name='phone' size={25} color={currentTheme.textOposto} />
        </TouchableOpacity>
        
        <View style={[styles.separator, {backgroundColor: currentTheme.separator}]}/>

        <TouchableOpacity onPress={botaoWhatsapp} style={styles.whatsappTouchable}>
          <Icon name='whatsapp' size={25} color='white'/>        
        </TouchableOpacity>

        <View style={[styles.separator, {backgroundColor: currentTheme.separator}]}/>

        <TouchableOpacity onPress={() => Linking.openURL(instagram)}>
          <LinearGradient
            colors={['#9B30FF', '#FF1493', '#FF4500', '#FFA500', '#FFFF00' ]}
            style={styles.instagramTouchable}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <Icon name='instagram' size={25} color='white'/>
          </LinearGradient>
        </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewConteiner:{ 
    flex: 1, 
    alignItems: 'center', 
    justifyContent:'space-evenly',
  },
  spacer: {
    height:30
  },
  infoView:{
    alignItems: 'center', 
    gap:10,
  },
  avisoText:{
     fontSize: 24,
    },
  infoText:{
    fontSize:15,
    textAlign:'center',
  },
  ligarTouchable:{
 // backgroundColor: '#0C0F11', 
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