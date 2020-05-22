import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Api from '../../services/api';

//styles
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import logoImg from '../../assets/logo.png';

export default function Detail() {
  // use state
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident });
  }

  //functions
  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);

    // const reponse = await Api.get(`incidents?page=${page}`);
    const reponse = await Api.get('incidents', {
      params: { page },
    });

    setIncidents([...incidents, ...reponse.data]);
    setTotal(reponse.headers['x-total-count']);
    setPage(page + 1);

    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de
          <Text style={styles.headerTextBold}> {total} casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem vindo</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>

      <FlatList
        data={incidents}
        style={styles.incidentsList}
        keyExtractor={(incident) => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>
            <Text style={styles.incidentValue}>{incident.id}</Text>
            <Text style={styles.incidentValue}>{page}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALUE:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>ver mais detalhes</Text>
              <Feather name="arrow-right" size={17} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
