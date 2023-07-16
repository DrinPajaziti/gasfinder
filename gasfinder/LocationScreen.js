import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Location from 'expo-location';
import Permissions from 'expo-permissions';

const LocationScreen = ({ route }) => {
  const { latitude, longitude } = route.params;

  const fetchGasStations = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=42.662914,21.165503&radius=5000&type=gas_station&key=AIzaSyCHOhBaVgGwyL2gJ2t5z4yrb4JKWgSgywk`
      );
      const data = await response.json();
      setGasStations(data.results);
    } catch (error) {
      console.log('Error fetching gas stations:', error);
    }
  };


  const initialRegion = {
    latitude,
    longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      {Location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 42.662914,
            longitude: 21.165503,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {gasStations.map((gasStation) => (
            <Marker
              key={gasStation.place_id}
              coordinate={{
                latitude: 42.662914,
                longitude: 21.165503,
              }}
              title={gasStation.name}
              description={gasStation.vicinity}
            />
          ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default LocationScreen;
