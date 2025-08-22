import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../Constant';
import CustomHeader from '../../../../Component/CustomHeader';
import Deleteicon from '../../../../assets/SVG/Deleteicon.svg';
import NewItem from '../../../../Component/NewItem';
import { newItemsData } from '../../../../utils/Dummydata';
const recommendations = [
  { id: 1, name: "T-Shirt" },
  { id: 2, name: "Sneakers" },
  { id: 3, name: "Backpack" },
  { id: 4, name: "Wrist Watch" },
  { id: 5, name: "Sunglasses" },
];
const SearchScreen = () => {
  const [data, setdata] = useState([]);
  const [value, setvalue] = useState('');
  const handleSumbit=()=>{
    setdata([value,...data])
    setvalue("")
  }
  return (
    <View style={{ ...GST.MAIN, paddingTop: RF(10) }}>
      <CustomHeader name={'Search'} input value={value} onChangetxt={(txt)=>setvalue(txt)} onSubmitEditing={handleSumbit}/>
      <View style={{ ...GST.CENTERCONTAINER, marginTop: RF(10) }}>
        <Text style={GST.subdescription}>Search history</Text>
        <TouchableOpacity>
          <Deleteicon height={RF(20)} width={RF(20)} />
        </TouchableOpacity>
      </View>
      <View 
       
      style={{...GST.ROW,gap:RF(5),flexWrap:"wrap",marginTop:RF(10)}}>
      {data.map((item,index)=>(
      
        <View 
        key={index} 
        style={{backgroundColor:colors.grey,padding:RF(10),paddingHorizontal:RF(15),borderRadius:RF(10)}}>
            <Text style={GST.subdescription}>{item}</Text>
        </View>

      
      ))}
      </View>
      
      <Text style={{...GST.subdescription,marginTop:RF(10)}}>Recommendations</Text>
      <View 
      style={{...GST.ROW,gap:RF(5),flexWrap:"wrap",marginTop:RF(10)}}>
         {recommendations.map((item,i)=>(
            <View 
            key={i}
            style={{backgroundColor:colors.grey,padding:RF(10),paddingHorizontal:RF(15),borderRadius:RF(10)}}>
                <Text>{item.name}</Text>
                </View>
         ))}
         </View>
         <Text style={{...GST.description,marginTop:RF(10)}}>Discover</Text>
         <NewItem data={newItemsData} />
    </View>
  );
};

export default SearchScreen;
