import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RangeSlider from 'rn-range-slider';
import GST, { colors, fontFamily, fontSize, RF } from '../../Constant';

const RangeSliderComponent = () => {
  const [low, setLow] = useState(10);
  const [high, setHigh] = useState(90);

  const renderThumb = useCallback(() => <View style={styles.thumb} />, []);
  const renderRail = useCallback(() => <View style={styles.rail} />, []);
  const renderRailSelected = useCallback(() => <View style={styles.railSelected} />, []);
  const renderLabel = useCallback(value => (
    <View style={styles.label}>
      <Text style={styles.labelText}>{value}</Text>
    </View>
  ), []);
  const renderNotch = useCallback(() => <View style={styles.notch} />, []);

  return (
    <View style={styles.container}>
    <View style={GST.CENTERCONTAINER}>
      <Text style={styles.title}>Price Range</Text>
      <Text style={GST.subdescription}> ${low} - ${high}</Text>
      </View>
      <RangeSlider
        style={styles.slider}
        min={0}
        max={100}
        step={1}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={(lowValue, highValue) => {
          setLow(lowValue);
          setHigh(highValue);
        }}
      />
      
    </View>
  );
};

export default RangeSliderComponent;

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: fontSize.medium,fontFamily:fontFamily.bold,color:colors.darkblack  },
  slider: { marginTop: 20 },
  thumb: {
    width: RF(30),
    height: RF(30),
    borderRadius: RF(100),
    backgroundColor: colors.DarkWhite,
    elevation:5,
  },
  rail: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
  },
  railSelected: {
    height: 4,
    backgroundColor:colors.blue,
    borderRadius: 2,
  },
  label: {
    alignItems: 'center',
    padding: 5,
    backgroundColor:colors.blue,
    borderRadius: 4,
  },
  labelText: { color: '#fff', fontSize: 12 },
  notch: {
    width: 8,
    height: 8,
    backgroundColor: '#0CA8B9',
    transform: [{ rotate: '45deg' }],
  },
//   value: { marginTop: 10, fontSize: 16, fontWeight: '500' },
});
