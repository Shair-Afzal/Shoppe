import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GST, { colors, RF } from '../../../../Constant';
import CustomHeader from '../../../../Component/CustomHeader';
import Deleteicon from '../../../../assets/SVG/Deleteicon.svg';
import NewItem from '../../../../Component/NewItem';
import { newItemsData } from '../../../../utils/Dummydata';
import Model from '../../../../Component/ImageModel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const recommendations = [
  { id: 1, name: 'T-Shirt' },
  { id: 2, name: 'Sneakers' },
  { id: 3, name: 'Backpack' },
  { id: 4, name: 'Wrist Watch' },
  { id: 5, name: 'Sunglasses' },
];

const SearchScreen = ({navigation}) => {
  // history entries are objects: { id: string, term: string }
  const [history, setHistory] = useState([]);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  const insets = useSafeAreaInsets();

  const handleSubmit = () => {
    const term = value.trim();
    if (!term) return;

    // de-dupe (move existing to front), then add with a stable id
    setHistory(prev => {
      const withoutDup = prev.filter(
        h => h.term.toLowerCase() !== term.toLowerCase(),
      );
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      return [{ id, term }, ...withoutDup];
    });
    setValue('');
    navigation.navigate('Shop')
  };

  const clearHistory = () => setHistory([]);

  return (
    <View style={{ ...GST.MAIN, paddingTop: insets.top }}>
      <Model visible={show} onClose={() => setShow(false)} />

      <CustomHeader
        name="Search"
        input
        value={value}
        onChangetxt={setValue}
        onSubmitEditing={handleSubmit}
        onimagpicked={() => setShow(true)}
        placholder="Search..."
      />

      <View style={{ ...GST.CENTERCONTAINER, marginTop: RF(10) }}>
        <Text style={GST.subdescription}>Search history</Text>
        <TouchableOpacity
          onPress={clearHistory}
          accessibilityLabel="Clear search history"
        >
          <Deleteicon height={RF(20)} width={RF(20)} />
        </TouchableOpacity>
      </View>

      <View
        style={{ ...GST.ROW, gap: RF(5), flexWrap: 'wrap', marginTop: RF(10) }}
      >
        {history.map(item => (
          <View
            key={item.id}
            style={{
              backgroundColor: colors.grey,
              padding: RF(10),
              paddingHorizontal: RF(15),
              borderRadius: RF(10),
            }}
          >
            <Text style={GST.subdescription}>{item.term}</Text>
          </View>
        ))}
      </View>

      <Text style={{ ...GST.subdescription, marginTop: RF(10) }}>
        Recommendations
      </Text>
      <View
        style={{ ...GST.ROW, gap: RF(5), flexWrap: 'wrap', marginTop: RF(10) }}
      >
        {recommendations.map(item => (
          <View
            key={String(item.id)}
            style={{
              backgroundColor: colors.grey,
              padding: RF(10),
              paddingHorizontal: RF(15),
              borderRadius: RF(10),
            }}
          >
            <Text>{item.name}</Text>
          </View>
        ))}
      </View>

      <Text style={{ ...GST.description, marginTop: RF(10) }}>Discover</Text>

      {/* If NewItem uses FlatList internally, it’s fine here since we’re not inside a ScrollView.
         If your NewItem supports it, you can pass scrollEnabled={false} to be extra safe. */}
      <NewItem data={newItemsData} /* scrollEnabled={false} */ />
    </View>
  );
};

export default SearchScreen;
