import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, Callout,PROVIDER_GOOGLE } from 'react-native-maps'

import getLocalIP from '../services/getIP'

import { Feather } from '@expo/vector-icons'
import mapMarker from '../images/map-marker.png';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';


interface OrphanageItem {
  id:number;
  name:string;
  latitude:number;
  longitude:number
}

const OrphanagesMap: React.FC = () => {
  const navigation = useNavigation();

  const [ orphanages, setOrphanages] = useState<OrphanageItem[]>([]);

  useFocusEffect(()=>{
    api.get('orphanages').then(response => {
      setOrphanages(response.data)
    })
  })

  function handleNavToOrphanageDetails(id: number){
    navigation.navigate('OrphanageDetails', { id })
  }

  function handleNavToCreateOrphanage(){
    navigation.navigate('SelectMapPosition')
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -23.3637786,
          longitude: -46.7422638,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        { orphanages.map( orphanage => {
          return (
            <Marker
            key={orphanage.id}
            icon={mapMarker}
            coordinate={{ latitude: orphanage.latitude, longitude: orphanage.longitude }}
            calloutAnchor={{ x: 2.7, y: 0.9 }}
          >
            <Callout
              tooltip
              onPress={() => handleNavToOrphanageDetails(orphanage.id)}
            >
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{ orphanage.name }</Text>
              </View>
            </Callout>
          </Marker>
          )
        }) }
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{ orphanages.length } orfanatos encontrados</Text>
        <RectButton onPress={handleNavToCreateOrphanage} style={styles.createOrphanage}>
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
};

export default OrphanagesMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  },

  calloutContainer:{
    width:160,
    height:46,
    paddingHorizontal:16,
    backgroundColor:'#FFFD',
    borderRadius:16,
    justifyContent:'center',
  },

  calloutText:{
    color:'#0089a5',
    fontSize:14,
    fontFamily:'Nunito_800ExtraBold',
  },

  footer:{
    position:'absolute',
    left:24,
    right:24,
    bottom:32,

    backgroundColor:'#fff',
    borderRadius:20,
    height:56,
    paddingLeft:24,

    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation:3,
    shadowColor:'#555',
    shadowOffset:{
      width:3,
      height:3,
    },
    shadowOpacity:0.8,
    shadowRadius:5,

  },

  footerText:{
    fontFamily:'Nunito_700Bold',
    color:'#8fa7b3'
  },

  createOrphanage:{
    width:56,
    height:56,
    backgroundColor:'#15c3d6',
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center'
  },
});

