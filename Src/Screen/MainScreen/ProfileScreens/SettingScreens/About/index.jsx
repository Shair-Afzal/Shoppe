import { View, Text } from 'react-native';
import React from 'react';
import GST, { RF } from '../../../../../Constant';
import Appicon from '../../../../../assets/SVG/Appicon.svg';

const About = () => {
  return (
    <View style={{ ...GST.MAIN,}}>
      <View style={{ ...GST.CENTER, height: RF(270) }}>
        <Appicon
          height={RF(100)}
          width={RF(100)}
          style={{ marginTop: RF(10), alignSelf: 'center' }}
        />
      </View>
      <Text style={GST.subHeading}>About Shoppe</Text>
      <Text
        style={{
          ...GST.subdescription,
          marginTop: RF(5),
          fontFamily: 'NunitoSans-Light',
        }}
      >
        Shoppe - Shopping UI kit" is likely a user interface (UI) kit designed
        to facilitate the development of e-commerce or shopping-related
        applications. UI kits are collections of pre-designed elements,
        components, and templates that developers and designers can use to
        create consistent and visually appealing user interfaces.
      </Text>
      <Text
        style={{
          ...GST.subdescription,
          marginTop: RF(15),
          fontFamily: 'NunitoSans-Light',
        }}
      >
        If you need help or you have any questions, feel free to contact me by
        email.
      </Text>
      <Text
        style={{
          ...GST.subdescription,
          marginTop: RF(10),
          fontFamily: 'NunitoSans-Bold',
        }}
      >
        hello@mydomain.com
      </Text>
    </View>
  );
};

export default About;
