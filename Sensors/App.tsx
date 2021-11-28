import * as React from 'react';
import { Barometer, BarometerMeasurement, Gyroscope, ThreeAxisMeasurement } from 'expo-sensors';
import { Text, Button, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [barometerData, setBarometerData] = useState<BarometerMeasurement>({ pressure: 0, relativeAltitude: 0 });
  const [gyroscopeData, setGyroscopeData] = useState<ThreeAxisMeasurement>({ x: 0, y: 0, z: 0 });

  Barometer.setUpdateInterval(500);
  Barometer.addListener(data => { setBarometerData(data) });
  Gyroscope.setUpdateInterval(500);
  Gyroscope.addListener(data => { setGyroscopeData(data) });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Barometer:</Text>

      <Text>Pressure</Text>
      <Text style={styles.input}>
        {(barometerData.pressure * 100) + "Pa"}
      </Text>

      <Text>Relative Altitude</Text>
      <Text style={styles.input}>
        {barometerData.relativeAltitude + "m"}
      </Text>

      <Text style={styles.text}>Gyroscope:</Text>

      <Text>X</Text>
      <Text style={styles.input}>
        {gyroscopeData.x}
      </Text>

      <Text>Y</Text>
      <Text style={styles.input}>
        {gyroscopeData.y}
      </Text>

      <Text>Z</Text>
      <Text style={styles.input}>
        {gyroscopeData.z}
      </Text>

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