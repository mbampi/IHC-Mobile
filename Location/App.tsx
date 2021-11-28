import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject>();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Sem permissão para acessar localização!');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <SafeAreaView>
      <Text style={styles.title}>{"Location:"}</Text>
      <View style={styles.separator} />

      <Text style={styles.text}>{"Latitude"}</Text>
      <Text style={styles.text}>{location?.coords.latitude}</Text>
      <View style={styles.separator} />

      <Text style={styles.text}>{"Longitude"}</Text>
      <Text style={styles.text}>{location?.coords.longitude}</Text>
      <View style={styles.separator} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center'
  },
  title: {
    color: 'green',
    fontSize: 30,
    textAlign: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  separator: {
    marginVertical: 10,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});