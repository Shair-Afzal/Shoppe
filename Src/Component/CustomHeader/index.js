import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import GST from '../../Constant';
import RightComponent from '../RightComponent';
import Leftcomponent from '../Leftcomponent';

const CustomHeader = ({
  name,
  descrip,
  profilepic,
  source,
  icon,
  input,
  placholder,
  Time,
  focus,
  value,
  onChangetxt,
  onSubmitEditing,
  onimagpicked,
  recimg,
  btn,
  txt,
  ActiveVourcher,
  containerStyle,
  placeholderTextColor,
  inputstyle,
  filter
}) => {
  return (
    <View style={GST.CENTERCONTAINER}>
      <View style={GST.CENTERCONTAINER}>
        <RightComponent
          name={name}
          descrip={descrip}
          profilepic={profilepic}
          source={source}
          recimg={recimg}
          btn={btn}
          txt={txt}
        />

        <Leftcomponent
          icon={icon}
          input={input}
          placeholder={placholder}
          time={Time}
          onFocus={focus}
          value={value}
          onChangetxt={onChangetxt}
          onSubmitEditing={onSubmitEditing}
          onimagpicked={onimagpicked}
          Active={ActiveVourcher}
          containerStyle={containerStyle}
          placeholderTextColor={placeholderTextColor}
          inputstyle={inputstyle}
          filter={filter}
        />
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
