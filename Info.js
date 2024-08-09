import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

function Info() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const navigation = useNavigation();

  const submit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/adduser", { name, age });
      console.log(response.data);
      Alert.alert("Success", "Data inserted successfully");
      navigation.navigate('Home', { name, age });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "There was a problem submitting your data");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <Text style={styles.header}>Enter Your Information</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={name}
            placeholderTextColor={"#000"}
            onChangeText={(text) => setName(text)}
            placeholder="Enter Your Name"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={"#000"}
            value={age}
            onChangeText={(text) => setAge(text)}
            placeholder="Enter Your Age"
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={submit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Added background color for better visibility
  },
  centerContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFF', // Added background color for the input container
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5, // Added border radius for a rounded input look
  },
  submitButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Info;
