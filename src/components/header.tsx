import React from 'react';
import {Text, View, StyleSheet} from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

interface HeaderProps{
    title: string,
    showCancel?: boolean,
}

export default function Header({title, showCancel = true}: HeaderProps){

    const navigation = useNavigation();
    function goToBackInicializate(){
        navigation.navigate('OrphanagemMap')
    }

    return(
        <View style={style.container}>
            <BorderlessButton onPress={navigation.goBack}>
                <Feather name="arrow-left" size={24} color='#15b6a6'/>
            </BorderlessButton>
            <Text style={style.titleHeader}>{title}</Text> 
            {showCancel ? (
                <BorderlessButton onPress={goToBackInicializate}>
                
                <Feather name="x" size={24} color='#ff669d'/>
            </BorderlessButton>
            ):
                <View/>
            }
        </View>
    );
}

const style = StyleSheet.create({
    container:{
        padding:24,
        backgroundColor: '#f9fafc',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        paddingTop: 44,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    titleHeader: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#8fa7b3',
        fontSize: 16
    }
})