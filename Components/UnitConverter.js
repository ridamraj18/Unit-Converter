import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';

const UnitConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [result, setResult] = useState('');
  const [category, setCategory] = useState('length');

  const conversions = {
    length: {
      meter: 1,
      kilometer: 0.001,
      centimeter: 100,
      inch: 39.37,
      foot: 3.281,
    },
    weight: {
      kilogram: 1,
      gram: 1000,
      pound: 2.20462,
      ounce: 35.274,
    },
    temperature: {
      celsius: (val) => val,
      fahrenheit: (val) => (val * 9) / 5 + 32,
      kelvin: (val) => val + 273.15,
    },
  };

  const handleConversion = () => {
    if (!inputValue || !selectedUnit) return;

    const value = parseFloat(inputValue);
    if (category === 'temperature') {
      const convertedValue = conversions[category][selectedUnit](value);
      setResult(`${convertedValue.toFixed(2)} ${selectedUnit}`);
    } else {
      const convertedValue = value * conversions[category][selectedUnit];
      setResult(`${convertedValue.toFixed(2)} ${selectedUnit}`);
    }
  };

  const units = Object.keys(conversions[category]).map((unit) => ({
    label: unit.charAt(0).toUpperCase() + unit.slice(1),
    value: unit,
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Unit Converter</Text>

      <RNPickerSelect
        onValueChange={(value) => setCategory(value)}
        items={[
          { label: 'Length', value: 'length' },
          { label: 'Weight', value: 'weight' },
          { label: 'Temperature', value: 'temperature' },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: 'Select Category', value: null }}
      />

      <RNPickerSelect
        onValueChange={(value) => setSelectedUnit(value)}
        items={units}
        style={pickerSelectStyles}
        placeholder={{ label: 'Select Unit', value: null }}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter value"
        keyboardType="numeric"
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleConversion}>
        <Text style={styles.buttonText}>Convert</Text>
      </TouchableOpacity>

      {result ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Result: {result}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
    marginBottom: 10,
  },
};

export default UnitConverter;
