import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import GST, { colors, RF } from '../../../Constant';
import CustomButton from '../../../Component/Custombutton';
import CustomInput from '../../../Component/Custominput';
import AppLogo from '../../../Component/Applogo';
import Arrowbtn from '../../../assets/SVG/Arrowbtn.svg';
import styles from './Style';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ScreenContentWrapper}>
        <AppLogo />
        <Text style={GST.heading}>Shoppe</Text>
        <Text style={styles.text}>
          Beautiful eCommerce UI Kit{'\n'}for your online store
        </Text>
        <View style={styles.btntxtcontainer}>
          <CustomButton
            btnTitle={"Let's get started"}
            onPress={() => navigation.navigate('Create')}
          />
          <View style={styles.rowcontainer}>
            <Text style={GST.subdescription}>I already have an account</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.7}
            >
              <Arrowbtn height={RF(30)} width={RF(30)} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
