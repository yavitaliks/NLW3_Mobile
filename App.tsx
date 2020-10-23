import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, {Marker, Callout}  from 'react-native-maps';
import mapMarker from './src/images/map-marker.png';
import {Feather} from '@expo/vector-icons';
import {useFonts} from 'expo-font';
import {Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold} from '@expo-google-fonts/nunito'

export default function App() {

  const [ fontsLoaded ] = useFonts ({
    Nunito_600SemiBold, 
    Nunito_700Bold, 
    Nunito_800ExtraBold
  });

  if(!fontsLoaded){
    return null;
  }


  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      initialRegion={{
        latitude: 0.0945352,
        longitude: -51.1271811,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
        }}>
          <Marker 
          icon={mapMarker}
          coordinate={{
            latitude: 0.0989052, 
            longitude: -51.1211811
            }}
            calloutAnchor={{
               x: 2.5,
               y: 0.8
            }}>
              <Callout tooltip
              onPress={()=>{alert("oi")}}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>Lar das Meninas</Text>
                </View>
              </Callout>
          </Marker>
        </MapView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>2 orfanatos encontrados</Text>
          <TouchableOpacity style={styles.footerToch} onPress={()=>{}}>
            <Feather name="plus" size={20} color='#FFF' />
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 16,
    justifyContent: 'center',
    elevation: 5,
  },

  calloutText: {
    color: '#0089a5',
    fontFamily: 'Nunito_700Bold',
  },

  footer:{
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#fff',
    borderRadius: 20,
    height:56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
  },

  footerText:{
     color: '#8fa7b3',
     fontFamily: 'Nunito_700Bold'
  },

  footerToch:{
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
