import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import GST, { colors, RF} from '../../Constant';

const Loader = ({ }) => {
 
  return (
    <View style={styles.overlay}>
  <ActivityIndicator size={"large"} color={colors.blue}/>

</View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  overlay: {
   flex:1,
   ...GST.CENTER,
   position:"absolute",
   top:0,
   bottom:0,
   backgroundColor:"rgba(0,0,0,0.1)",
   zIndex:100,
   width:"100%"
  },
  
});
