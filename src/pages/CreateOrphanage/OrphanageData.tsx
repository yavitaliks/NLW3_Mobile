import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';

import * as ImagePiker from 'expo-image-picker';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';

interface DataOrphanage{
  name: string,
  latitude: number,
  longitude: number,
  about: string,
  instructions: string,
  opening_hours: string,
  open_day_weekends: boolean,
  images: Array<{
    url: string,
  }>
}

interface PositionOrphanage{
  position:{
  latitude: number,
  longitude:number
  }
}

export default function OrphanageData() {
  const route = useRoute();
  const params = route.params as PositionOrphanage;
  const [data, setData] = useState<DataOrphanage>({
    name: "",
    latitude: 0,
    longitude: 0,
    about: "",
    instructions: "",
    opening_hours: "",
    open_day_weekends: false,
    images: []  
  });
  const [image, setImages]= useState<string[]>([]);

  const dataPost = new FormData();
  const navigation = useNavigation();

  dataPost.append('name', data.name);
  dataPost.append('about', data.about);
  dataPost.append('latitude', String(data.latitude));
  dataPost.append('longitude', String(data.longitude));
  dataPost.append('instructions', data.instructions);
  dataPost.append('opening_hours', data.opening_hours);
  dataPost.append('open_day_weekends', String(data.open_day_weekends));

  image.forEach((item, index)=>{
    dataPost.append('images', {
      type: 'image/jpg',
      name: `image_${index}.jpg`,
      uri: item,
    } as any);
  })
  

  async function handlerSelectImagens(){
    const {status} = await ImagePiker.requestCameraRollPermissionsAsync();
    if(status!== 'granted'){
      alert("Precisamos de acesso para sua galeria");
      return;
    }

    const result = await ImagePiker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePiker.MediaTypeOptions.Images,
    })
    console.log("RESULT IMAGE", result)

    if(result.cancelled){
      return;
    }
    const {uri} = result;
    setImages([...image, uri])
    console.log("ARAI IMAGES", image)
  }

  async function createNewOrphanagem(){
    setData({...data, 
      latitude: params.position.latitude,
      longitude: params.position.longitude})
      
      const response = await api.post('/orphanats', dataPost)
    navigation.navigate('OrphanagemMap')
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={data.name}
        onChangeText={input => setData({...data, name: input})}
        style={styles.input}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        value={data.about}
        onChangeText={input => setData({...data, about: input})}
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
      />

      <Text style={styles.label}>Fotos</Text>
      <ScrollView horizontal >
      <View style={styles.uploadImagesContainer}>
        {image.map(item => {
          return(
          <Image 
          key={item}
          source={{uri: item}}
          style={styles.uploadedImagem} />);
        })}
      </View>
      </ScrollView>
      <TouchableOpacity style={styles.imagesInput} onPress={handlerSelectImagens}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        value={data.instructions}
        onChangeText={input => setData({...data, instructions: input})}
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        value={data.opening_hours}
        onChangeText={input => setData({...data, opening_hours: input})}
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch 
          value={data.open_day_weekends}
          onValueChange={() =>  setData({...data, open_day_weekends: !data.open_day_weekends})}
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={createNewOrphanagem}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
  uploadImagesContainer:{
    flexDirection: 'row',

  },
  uploadedImagem:{
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight:8,
  }
})