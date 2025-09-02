import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GST, { colors, RF } from '../../../../Constant';
import CustomHeader from '../../../../Component/CustomHeader';
import Deleteicon from '../../../../assets/SVG/Deleteicon.svg';
import NewItem from '../../../../Component/NewItem';
import { newItemsData } from '../../../../utils/Dummydata';
import Model from '../../../../Component/ImageModel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './style';   // ⬅️ external stylesheet
import Loader from '../../../../Component/Loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "searchHistory"; // ✅ key for AsyncStorage

const recommendations = [
  { id: 1, name: 'T-Shirt' },
  { id: 2, name: 'Sneakers' },
  { id: 3, name: 'Backpack' },
  { id: 4, name: 'Wrist Watch' },
  { id: 5, name: 'Sunglasses' },
];

const SearchScreen = ({ navigation }) => {
  const [history, setHistory] = useState([]);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  const [loading, setloading] = useState(false);
  const insets = useSafeAreaInsets();

  // ✅ Load history on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setHistory(JSON.parse(stored));
        }
      } catch (err) {
        console.error("Error loading search history", err);
      }
    };
    loadHistory();
  }, []);

  // ✅ Save history whenever it changes
  useEffect(() => {
    const saveHistory = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      } catch (err) {
        console.error("Error saving search history", err);
      }
    };
    if (history.length > 0) {
      saveHistory();
    }
  }, [history]);

  const handleSubmit = (text) => {
    const term = text.trim();
    if (!term) return;

    setHistory(prev => {
      const withoutDup = prev.filter(
        h => h.term.toLowerCase() !== term.toLowerCase(),
      );
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      return [{ id, term }, ...withoutDup];
    });

    setloading(true);
    setTimeout(() => {
      setloading(false);
      navigation.navigate('Shop', { Searchvalue: text });
      setValue('');
    }, 1500);
  };

  const clearHistory = async () => {
    setHistory([]);
    await AsyncStorage.removeItem(STORAGE_KEY); // ✅ clear from storage too
  };

  return (
    <View style={[GST.MAIN, { paddingTop: insets.top }]}>
      <Model visible={show} onClose={() => setShow(false)} />
      {loading && (
        <View style={styles.loadingstyle}>
          <Loader />
        </View>
      )}

      <CustomHeader
        name="Search"
        input
        value={value}
        onChangetxt={setValue}
        onSubmitEditing={() => handleSubmit(value)}
        onimagpicked={() => setShow(true)}
        placholder="Search..."
      />

      <View style={[GST.CENTERCONTAINER, styles.historyHeader]}>
        <Text style={GST.subdescription}>Search history</Text>
        <TouchableOpacity
          onPress={clearHistory}
          accessibilityLabel="Clear search history"
        >
          <Deleteicon height={RF(20)} width={RF(20)} />
        </TouchableOpacity>
      </View>

      <View style={[GST.ROW, styles.historyWrapper]}>
        {history.length === 0 && (
          <Text style={GST.subdescription}>No history found</Text>
        )}

        {history.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.historyItem}
            onPress={() => {
              setValue(item.term);
              handleSubmit(item.term);
            }}
          >
            <Text style={GST.subdescription}>{item.term}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[GST.subdescription, styles.recommendationsTitle]}>
        Recommendations
      </Text>
      <View style={[GST.ROW, styles.recommendWrapper]}>
        {recommendations.map(item => (
          <TouchableOpacity
            key={String(item.id)}
            style={styles.recommendItem}
            onPress={() => {
              setValue(item.name);
              handleSubmit(item.name);
            }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[GST.description, styles.discoverTitle]}>Discover</Text>

      <NewItem data={newItemsData} />
    </View>
  );
};

export default SearchScreen;
