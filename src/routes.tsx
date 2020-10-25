import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import OrphanagemMap from './pages/OrphanagemMap';
import OrphanageDetail from './pages/OrphanageDetails';
import MapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';

import Header from './components/header';

const { Navigator, Screen } = createStackNavigator()

export default function Routes(){
    return(
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, 
                                        cardStyle:{
                                            backgroundColor: '#f2f3f5',
                                        }
                                    }} >
                <Screen component={OrphanagemMap} name="OrphanagemMap" options={
                    {
                        headerShown: false,
                    }
                }/>
                <Screen component={OrphanageDetail} name="OrphanageDetail" options={
                    {
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Orfanato" />  
                    }
                }/>
                <Screen component={MapPosition} name="MapPosition" options={
                    {
                        headerShown: true,
                        header: () => <Header title="Escolha local" /> 
                    }
                }/>
                <Screen component={OrphanageData} name="OrphanageData" options={
                    {
                        headerShown: true,
                        header: () => <Header title="Novo orfanato" /> 
                    }
                }/>
            </Navigator>

        </NavigationContainer>
    )
}