import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

// import { Container } from './styles';

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

const Header: React.FC<HeaderProps> = ({title, showCancel = true}) => {

  const navigation = useNavigation();

  function handleGoHomePage(){
    navigation.navigate('OrphanagesMap')
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>

      <Text style={styles.title}>{ title }</Text>

      { showCancel ? (
        <BorderlessButton onPress={handleGoHomePage}>
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View style={ styles.invisibleView }/>
      )}
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  
  container:{
    padding:10,
    paddingHorizontal:24,
    paddingTop:60,
    backgroundColor:'#f9fafc',
    borderBottomWidth:1,
    borderColor:'#dde3f0',

    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },

  title:{
    fontFamily:'Nunito_600SemiBold',
    color:'#8fa7b3',
    fontSize:16,
  },
  invisibleView:{
    width:24,
  }
})