import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

const Separator = () => (
  <View style={styles.separator} />
);

export default function App() {
  const [value1, onChangeValue1] = React.useState<string>("");
  const [value2, onChangeValue2] = React.useState<string>("");
  const [result, onChangeResult] = React.useState<number>(0);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>Atividade 1</Text>
        <Separator />
        <StatusBar style="auto" />

        <TextInput
          style={styles.input}
          onChangeText={text => onChangeValue1(text)}
          placeholder="Digite um número"
          keyboardType="numeric">
        </TextInput>

        <TextInput
          style={styles.input}
          onChangeText={text => onChangeValue2(text)}
          placeholder="Digite um número"
          keyboardType="numeric">
        </TextInput>

        <Button
          onPress={somaNumeros}
          title="Somar"
          color="green"
          accessibilityLabel="Somar os dois valores"
        />
        <Separator />
        <Text style={styles.text}>
          {result}
        </Text>

      </View>
    </SafeAreaView >
  );

  function somaNumeros() {
    let valor1: number = parseInt(value1);
    let valor2: number = parseInt(value2);
    let result: number = valor1 + valor2;
    console.log("somaNumeros: " + value1 + " + " + value2 + " = " + result);
    onChangeResult(result)
  }
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
