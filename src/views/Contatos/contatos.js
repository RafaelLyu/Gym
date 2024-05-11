import React from 'react';
import { View, Text, Button, Linking,  Platform} from 'react-native';
import SendIntentAndroid from 'react-native-send-intent';

const numeroContato = '+5521998366215'; // Número de telefone pra ligar
const instagram = 'https://www.instagram.com/likefitnessgym?igsh=MXFpZzQ4YmY4NzlyMQ=='; //Insta da academia
const numeroWhatsapp = '+5521998366215'; //Contato do Zap Zap

export default function ContatosScreen() {
  
  const botaoWhatsapp = () => {
    Linking.openURL('https://wa.me/'+ numeroWhatsapp);
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
    <View>
      <Text>Entre em contato</Text>

      <Button title="Ligar" onPress={discar} />

      <Button
        onPress={botaoWhatsapp}
        title="WhatsApp"
      />

      <Button
        onPress={() => Linking.openURL(instagram)}
        title="Instagram"
      />
    </View>
  );
  
}
