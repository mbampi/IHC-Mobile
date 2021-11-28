import * as React from 'react';
import { Accelerometer } from 'expo-sensors';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Button, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { useState } from 'react';

type RootStackParamList = {
  Home: undefined;
  Atividade3: { message: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Atividade3'>;

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Atividade1"
          component={HomeScreen}
          options={{ title: 'Atividade 3' }}
        />
        <Stack.Screen name="Atividade3" component={MessageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const isEqual = (n: number, t: number) => {
  if (n > (t - 0.1) && n < (t + 0.1))
    return true;
  return false;
}

const HomeScreen = ({ navigation }: Props) => {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  if (!Accelerometer.isAvailableAsync()) {
    Accelerometer.requestPermissionsAsync();
  } else {
    Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
      if (isEqual(accelerometerData.x, 0) && isEqual(accelerometerData.y, 0) && isEqual(accelerometerData.z, -1)) {
        navigation.navigate('Atividade3', { message: "Posição correta! X=0, Y=0, Z=-1" });
      }
    });
    Accelerometer.setUpdateInterval(500);
  }

  return (
    <SafeAreaView style={styles.container}>

      <Text>X:</Text>
      <TextInput
        style={styles.input}
        keyboardType="default"> {Math.round(data.x * 100) / 100}
      </TextInput>

      <Text>Y:</Text>
      <TextInput
        style={styles.input}
        keyboardType="default"> {Math.round(data.y * 100) / 100}
      </TextInput>

      <Text>Z:</Text>
      <TextInput
        style={styles.input}
        keyboardType="default"> {Math.round(data.z * 100) / 100}
      </TextInput>
    </SafeAreaView>
  );
};

const MessageScreen = ({ navigation, route }: Props) => {
  return <Text>{route.params.message}</Text>;
};

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
