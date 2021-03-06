import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import style from '../Welcome/style';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import { AuthContext } from '../../contexts/authContext';
const profile = require('../../../assets/profile.png');

import { StackScreenProps } from '@react-navigation/stack';
import RouterDefinition from '../../RouterDefinition';

type Props = StackScreenProps<RouterDefinition, 'Menu'>;
const Menu = ({ route, navigation}: Props) => {

  const { signOut, credential } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState({ uri: 'https://i.stack.imgur.com/l60Hf.png'}) ;

  

  useEffect(() => {
    if(credential){
      setProfilePicture({ uri: credential.profilePicture })
    }
    
  }, []);

  return(
    <View style={styles.container}>
      <StatusBar style="light"/>
      <View style={styles.topContent}>

        <View style={styles.rightContent}>
          <Image style={styles.image} source={credential? profilePicture:profile}/>
        </View>

        <View style={styles.leftContent}>         
          <TouchableOpacity style={styles.param}>
            <Text style={styles.label}>Nome</Text>
            <Text style={styles.configText}>{credential?.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.param}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.configText}>{credential?.email}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={signOut} style={styles.signOutButton}>           
            <Text style={styles.configText}>Sair</Text>
            <Feather name="log-out" color="#FFF" size={40} />
          </TouchableOpacity>
        </View>
        
      </View>

      <View>
        <TouchableOpacity onPress={() => navigation.navigate('UserItinerary')} style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Meus Roteiros</Text>
          <Feather name="compass" color="#FFF" size={40} />
        </TouchableOpacity>

      </View>
    </View>
  );
}

export default Menu;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: colors.blueDefault,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  topContent: {
    justifyContent: 'center',
    alignItems:'center'
  },
  leftContent:{
    width: widthPercentageToDP(100),
    paddingLeft: 10,
    marginTop: 10,
  },
  label: {
    color: '#BEBEBE'
  },
  param:{
    marginBottom: 20
  },
  signOutButton:{
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:'center',
  },
  configText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold'
  },
  rightContent: {
    width: widthPercentageToDP(100),
    alignItems: 'center',
    marginTop: 20
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 100,
    marginLeft: 10
  },
  bottomContent: {

  },bottomButton:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#3497C1',
    width: 250,
    marginBottom: 80,
    borderRadius: 100,
    height: 60
  },bottomButtonText:{
    marginRight: 10,
    color: colors.white,
    fontWeight: 'bold',

  }
})