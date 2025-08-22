import { View, Text, Image, Dimensions } from 'react-native';
import React from 'react';
import Swipperbackground from '../../../Component/SwipperBackground';
import GST, { RF } from '../../../Constant';
import style from './style';
import styles from './style';
import Swiper from 'react-native-swiper';
import CustomButton from '../../../Component/Custombutton';

const OnBondingScreen = () => {
  const { width, height } = Dimensions.get("window");
const isTablet = width >= 768;

const isTabletWidth = width >= 768;
const isTabletHeight = height >= 1000;
  
  const slides = [
    {
      id: 1,
      image: require('../../../assets/Images/swipperimg2.png'),
      title: 'Hello',
      description:
        'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nSed non consectetur turpis.\nMorbi eu eleifend lacus.',
    },
    {
      id: 2,
      image: require('../../../assets/Images/swipperimg.png'),
      title: 'Hello',
      description:
        'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nSed non consectetur turpis.\nMorbi eu eleifend lacus.',
      buttonTitle: 'Let,s Start',
    },
    {
      id: 3,
      image: require('../../../assets/Images/swipperimg2.png'),
      title: 'Hello',
      description:
        'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nSed non consectetur turpis.\nMorbi eu eleifend lacus.',
      // buttonTitle: 'Next',
    },
    {
      id: 4,
      image: require('../../../assets/Images/swipperimg.png'),
      title: 'Ready?',
      description: 'Lorem ipsum dolor sit amet,\n consectetur adipiscing elit.',
      buttonTitle: 'Let,s Start',
    },
  ];
  return (
    <View style={GST.FLEX}>
      <Swipperbackground style={styles.bg} />
      <Swiper
        loop={false}
        showsButtons={false}
        showsPagination={true}
        paginationStyle={{ bottom: 20 }}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        {slides.map((item, i) => (
          <View style={styles.container}>
            <View
              style={{
                ...styles.card,
                paddingBottom: i == 3 ? RF(25) : RF(50),
              }}
            >
              <View style={styles.img}>
              <Image source={item.image} style={{height:"100%",width:"100%",resizeMode:isTablet?"stretch":"cover"}} />
              </View>
              <Text
                style={{
                  ...GST.subHeading,
                  textAlign: 'center',
                  marginTop: RF(15),
                }}
              >
                {item.title}
              </Text>
              <Text style={{ ...GST.subdescription, textAlign: 'center' }}>
                {item.description}
              </Text>
              {i === 3 && (
                <CustomButton btnTitle={item.buttonTitle} style={styles.btn} />
              )}
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default OnBondingScreen;
