import React from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import CustomHeader from '../../../Component/CustomHeader';
import GST, { wp, hp, colors } from '../../../Constant';
import styles from './style';

const dummyMessages = [
  { id: '1', text: 'Hello, how can I help you?' },
  { id: '2', text: 'I have a question about my product listing.' },
];

const Chat = () => {
  const renderItem = ({ item }) => (
    <View style={styles.messageBubble}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <CustomHeader name="Chat with Admin" />
      <FlatList
        data={dummyMessages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={colors.dimBlack}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
