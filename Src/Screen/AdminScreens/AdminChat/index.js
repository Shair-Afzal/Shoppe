import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import GST, { wp, hp, colors, fontSize, radius } from '../../../Constant';
import Search from '../../../assets/SVG/Filter.svg';
import Close from '../../../assets/SVG/Close.svg';
import UserIcon from '../../../assets/SVG/Activeprofile.svg';
import BubblesIcon from '../../../assets/SVG/Bubbles.svg';

const AdminChatList = ({ navigation }) => {
  const [chatList, setChatList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredChat, setFilteredChat] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample data - replace with actual API call
  useEffect(() => {
    loadChatList();
  }, []);

  const loadChatList = async () => {
    setLoading(true);
    try {
      // Replace with actual API call
      const dummyChats = [
        {
          id: '1',
          userId: 'user_001',
          userName: 'Ahmed Khan',
          userImage: 'https://via.placeholder.com/50/4F46E5/ffffff?text=AK',
          lastMessage: 'Hello, I have a question about my order',
          lastMessageTime: '10:30 AM',
          unreadCount: 2,
          online: true,
        },
        {
          id: '2',
          userId: 'user_002',
          userName: 'Sara Ali',
          userImage: 'https://via.placeholder.com/50/4F46E5/ffffff?text=SA',
          lastMessage: 'Thank you for your help!',
          lastMessageTime: '9:15 AM',
          unreadCount: 0,
          online: false,
        },
        {
          id: '3',
          userId: 'user_003',
          userName: 'Hassan Raza',
          userImage: 'https://via.placeholder.com/50/4F46E5/ffffff?text=HR',
          lastMessage: 'When will my product be delivered?',
          lastMessageTime: 'Yesterday',
          unreadCount: 1,
          online: true,
        },
        {
          id: '4',
          userId: 'user_004',
          userName: 'Fatima Noor',
          userImage: 'https://via.placeholder.com/50/4F46E5/ffffff?text=FN',
          lastMessage: 'I want to return my order',
          lastMessageTime: '2 days ago',
          unreadCount: 0,
          online: false,
        },
      ];
      setChatList(dummyChats);
      setFilteredChat(dummyChats);
    } catch (error) {
      console.log('Error loading chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = chatList.filter((chat) =>
      chat.userName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredChat(filtered);
  };

  const handleChatPress = (chat) => {
    navigation.navigate('AdminChatScreen', { chatData: chat });
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatCard}
      onPress={() => handleChatPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.chatCardContent}>
        {/* User Avatar with Online Status */}
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: item.userImage }}
            style={styles.userAvatar}
            resizeMode="cover"
          />
          {item.online && <View style={styles.onlineIndicator} />}
        </View>

        {/* Chat Info */}
        <View style={styles.chatInfoContainer}>
          <View style={styles.chatHeaderRow}>
            <Text style={styles.userName} numberOfLines={1}>
              {item.userName}
            </Text>
            <Text style={styles.timestamp}>{item.lastMessageTime}</Text>
          </View>
          <Text style={styles.lastMessage} numberOfLines={2}>
            {item.lastMessage}
          </Text>
        </View>

        {/* Unread Badge */}
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.sellerBg} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Messages</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AdminProfile')}
            style={styles.profileIcon}
          >
            <UserIcon width={wp('8%')} height={wp('8%')} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search width={wp('5%')} height={wp('5%')} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            placeholderTextColor={colors.sellerSubText}
            value={searchText}
            onChangeText={handleSearch}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Close width={wp('5%')} height={wp('5%')} />
            </TouchableOpacity>
          )}
        </View>

        {/* Chat List */}
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.sellerPrimary} />
          </View>
        ) : filteredChat.length > 0 ? (
          <FlatList
            data={filteredChat}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={true}
            scrollIndicatorInsets={{ right: 1 }}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <BubblesIcon width={wp('15%')} height={wp('15%')} style={{ marginBottom: hp('2%') }} />
            <Text style={styles.emptyText}>
              {searchText ? 'No conversations found' : 'No messages yet'}
            </Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sellerBg,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    backgroundColor: colors.sellerCard,
    borderBottomWidth: 1,
    borderBottomColor: colors.sellerBorder,
  },
  headerTitle: {
    fontSize: fontSize.mediumLarge,
    fontWeight: '700',
    color: colors.sellerText,
  },
  profileIcon: {
    padding: wp('2%'),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('4%'),
    marginVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    backgroundColor: colors.sellerCard,
    borderRadius: radius.radius3,
    borderWidth: 1,
    borderColor: colors.sellerBorder,
  },
  searchIcon: {
    marginRight: wp('2%'),
  },
  searchInput: {
    flex: 1,
    paddingVertical: hp('1.2%'),
    fontSize: fontSize.small,
    color: colors.sellerText,
  },
  chatCard: {
    marginHorizontal: wp('4%'),
    marginVertical: hp('0.8%'),
    backgroundColor: colors.sellerCard,
    borderRadius: radius.radius3,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    borderWidth: 1,
    borderColor: colors.sellerBorder,
  },
  chatCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: wp('3%'),
  },
  userAvatar: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    resizeMode: 'cover',
    backgroundColor: colors.sellerBorder,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: wp('3%'),
    height: wp('3%'),
    borderRadius: radius.radius5,
    backgroundColor: colors.sellerSuccess,
    borderWidth: 2,
    borderColor: colors.sellerCard,
  },
  chatInfoContainer: {
    flex: 1,
  },
  chatHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('0.5%'),
  },
  userName: {
    flex: 1,
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.sellerText,
  },
  timestamp: {
    fontSize: fontSize.extraSmall,
    color: colors.sellerSubText,
    marginLeft: wp('2%'),
  },
  lastMessage: {
    fontSize: fontSize.avgSmall,
    color: colors.sellerSubText,
  },
  unreadBadge: {
    backgroundColor: colors.sellerPrimary,
    borderRadius: radius.radius5,
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.4%'),
    marginLeft: wp('2%'),
  },
  unreadText: {
    color: colors.white,
    fontSize: fontSize.regSmall,
    fontWeight: '600',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: fontSize.small,
    color: colors.sellerSubText,
    textAlign: 'center',
  },
});

export default AdminChatList;
