import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import  {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import LocationScreen from './LocationScreen';



const MainScreen = () => {

    const navigation = useNavigation();

    const handleButtonPress = async () => {
      try {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;
          navigation.navigate('Second', { latitude, longitude });
        } else {
          console.log('Location permission denied');
        }
      } catch (error) {
        console.log('Error requesting location permission:', error);
      }
    };
    

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gas Finder</Text>
      <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>Get Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainScreen;
