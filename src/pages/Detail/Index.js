import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import Api from '../../services/api';

// styles
import logoImg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';
import style from './styles';

export default function Detail() {
  // react consts
  const navigation = useNavigation();
  const router = useRoute();
  const [incidents, setIncidents] = useState([]);
  const incident = router.params.incident;

  const message = `Ola ${
    incident.name
  } estou entrando em contato pois gostaria de ajudar no "${
    incident.title
  }" com o valor de ${Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(incident.value)}`;

  // functions
  function navigationToIncidents() {
    navigation.navigate('Incidents');
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    );
  }

  function sendEmail() {
    MailComposer.composeAsync({
      subject: `Heroi do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  }

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Image source={logoImg} />
        <TouchableOpacity>
          <Feather
            name="arrow-left"
            size={28}
            color="#e82041"
            onPress={navigationToIncidents}
          />
        </TouchableOpacity>
      </View>

      <View style={style.incident}>
        <Text style={[style.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={style.incidentValue}>
          {incident.name} de {incident.city}/{incident.uf}
        </Text>

        <Text style={style.incidentProperty}>CASE:</Text>
        <Text style={style.incidentValue}>{incident.title}</Text>

        <Text style={style.incidentProperty}>DESCRIPTION:</Text>
        <Text style={style.incidentValue}>{incident.description}</Text>

        <Text style={style.incidentProperty}>VALUE:</Text>
        <Text style={style.incidentValue}>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(incident.value)}
        </Text>
      </View>

      <View style={style.contactBox}>
        <Text style={style.heroTitle}>Save the day</Text>
        <Text style={style.heroTitle}>Be the hero of this case</Text>

        <Text style={style.heroDescription}>Contact</Text>

        <View style={style.actions}>
          <TouchableOpacity style={style.action} onPress={sendWhatsapp}>
            <Text style={style.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.action} onPress={sendEmail}>
            <Text style={style.actionText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
