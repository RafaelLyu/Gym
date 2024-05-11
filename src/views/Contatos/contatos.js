import React from 'react';
import { View, Text, Button, Linking} from 'react-native';

export default function ContatosScreen() {
  
    const numeroContato = '+5521965326546';

    const handlePressWhatsapp = () => {
      
      Linking.openURL('https://wa.me/'+ numeroContato);
    };
  
    return (
      <View>
        <Text>Entre em contato</Text>
        <Text>
          9999-9999
        </Text>
        <Button
          onPress={handlePressWhatsapp}
          title="WhatsApp"
        />
        <Button
          onPress={() => Linking.openURL('https://www.instagram.com/')}
          title="Instagram"
        />
      </View>
    );
  
  }
