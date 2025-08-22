import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../Constant';
import Polygon from '../../assets/SVG/Polygon.svg';

const FilterBar = () => {
    const [select,setselect]=useState('all')
  return (
    <View style={styles.Container}>
      <TouchableOpacity
        style={select =="all"?styles.txtcontainer:null}
        onPress={()=>setselect("all")}
      >
        {select =="all"&&
        <Polygon
          height={RF(10)}
          width={RF(10)}
          style={styles.iconstyle}
        />
      }
        <Text style={styles.txt}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity style={select =="10%"?styles.txtcontainer:null}
      onPress={()=>setselect("10%")}
      >{select =="10%"&&
        <Polygon
          height={RF(10)}
          width={RF(10)}
          style={styles.iconstyle}
        />
      }
        
        <Text style={styles.txt}>10%</Text>
      </TouchableOpacity>
      <TouchableOpacity style={select =="20%"?styles.txtcontainer:null}
            onPress={()=>setselect("20%")}
            
    
      >
       
        {select =="20%"&&
        <Polygon
          height={RF(10)}
          width={RF(10)}
          style={styles.iconstyle}
        />
      }
        <Text style={styles.txt}>20%</Text>
      </TouchableOpacity >
      <TouchableOpacity style={select =="30%"?styles.txtcontainer:null}
      onPress={()=>setselect("30%")}
      >
       {select =="30%"&&
        <Polygon
          height={RF(10)}
          width={RF(10)}
          style={styles.iconstyle}
        />
      }
        <Text style={styles.txt}>30%</Text>
      </TouchableOpacity>
      <TouchableOpacity style={select =="40%"?styles.txtcontainer:null}
      onPress={()=>setselect("40%")}
      >
       {select =="40%"&&
        <Polygon
          height={RF(10)}
          width={RF(10)}
          style={styles.iconstyle}
        />
      }
        <Text style={styles.txt}>40%</Text>
      </TouchableOpacity>
      <TouchableOpacity style={select =="50%"?styles.txtcontainer:null}
      onPress={()=>setselect("50%")}
      >
        {select =="50%"&&
        <Polygon
          height={RF(10)}
          width={RF(10)}
          style={styles.iconstyle}
        />
      }
        <Text style={styles.txt}>50%</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  txt: {
    ...GST.subdescription,
    fontFamily: 'Raleway-Bold',
  },
  Container: {
    backgroundColor: colors.grey,
    height: RF(40),
    ...GST.CENTERCONTAINER,
    borderRadius: RF(10),
    paddingHorizontal: RF(20),
    marginTop:RF(35)
  },
  txtcontainer:{
    backgroundColor: colors.DarkWhite,
          borderWidth: 1,
          padding: RF(10),
          paddingHorizontal: RF(18),
          borderColor: colors.blue,
          borderRadius: RF(18),
  },
  iconstyle:{
    position: 'absolute',
     top: -1, 
     alignSelf: 'center' 
  }
});
