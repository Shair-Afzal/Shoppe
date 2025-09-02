import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import GST, { RF } from '../../../../../Constant';
import Appicon from '../../../../../assets/SVG/Appicon.svg';
import styles from './style';

const About = () => {
  return (
    <View style={GST.MAIN}>
      <View style={styles.iconWrapper}>
        <Appicon
          height={RF(100)}
          width={RF(100)}
          style={styles.appIcon}
        />
      </View>
      <Text style={GST.subHeading}>About Shoppe</Text>
      <Text style={styles.description}>
        Shoppe - Shopping UI kit" is likely a user interface (UI) kit designed
        to facilitate the development of e-commerce or shopping-related
        applications. UI kits are collections of pre-designed elements,
        components, and templates that developers and designers can use to
        create consistent and visually appealing user interfaces.
      </Text>
      <Text style={styles.helpText}>
        If you need help or you have any questions, feel free to contact me by
        email.
      </Text>
      <Text style={styles.email}>
        hello@mydomain.com
      </Text>
    </View>
  );
};



export default About;
