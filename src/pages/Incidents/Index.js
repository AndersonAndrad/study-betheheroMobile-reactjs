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
          Total of
          <Text style={styles.headerTextBold}> {total} cases</Text>
        </Text>
      </View>

      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.description}>
        Choose one of the cases below and save the day.
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

            <Text style={styles.incidentProperty}>CASE:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>DESCRIPTION:</Text>
            <Text style={styles.incidentValue}>{incident.description}</Text>

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
              <Text style={styles.detailsButtonText}>See more details</Text>
              <Feather name="arrow-right" size={17} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
