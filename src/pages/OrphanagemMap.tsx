import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import MapView, {Marker, Callout}  from 'react-native-maps';
import mapMarker from '../images/map-marker.png';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'
import api from '../services/api'

interface DataOrphanats{
  id: number,
  latitude: number,
  longitude: number,
  name: string,
}
  
export default function Mapa() {

  const [orphanats, setOrphanats] = useState<DataOrphanats[]>([]);
  const navigator = useNavigation();

  function getOrphanages(){
    const response = api.get('/orphanats').then(response => {
      setOrphanats(response.data)
    });
    
  }

  function goToOrphanagemDetail(id: number){
    navigator.navigate('OrphanageDetail', {id});
  }

  function registerNewOrphanage(){
    navigator.navigate('MapPosition');
  }

  useEffect(() =>{
    getOrphanages();
  }, [])

  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      initialRegion={{
        latitude: 0.0945352,
        longitude: -51.1271811,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
        }}>
          {orphanats.map(item=>{
            return(
            <Marker 
            key={item.id}
            icon={mapMarker}
            coordinate={{
              latitude: item.latitude, 
              longitude: item.longitude
              }}
              calloutAnchor={{
                 x: 2.5,
                 y: 0.8
              }}>
                <Callout tooltip
                onPress={()=>goToOrphanagemDetail(item.id)}>
                  <View style={styles.calloutContainer}>
            <Text style={styles.calloutText}>{item.name}</Text>
                  </View>
                </Callout>
            </Marker>
          )})}          
        </MapView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>{orphanats.length}orfanatos encontrado</Text>
          <TouchableOpacity style={styles.footerToch} onPress={registerNewOrphanage}>
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