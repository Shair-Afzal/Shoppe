import React, {useState, useEffect, useCallback} from 'react';
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
import GST, {wp, hp, colors, fontSize, radius, RF} from '../../../Constant';
import Search from '../../../assets/SVG/Filter.svg';
import Close from '../../../assets/SVG/Close.svg';
import UserIcon from '../../../assets/SVG/Activeprofile.svg';
import BubblesIcon from '../../../assets/SVG/Bubbles.svg';
import {useSelector, useDispatch} from 'react-redux';
import {getConversations} from '../../../Redux/slices/Action/Chatslice';
import {useFocusEffect} from '@react-navigation/native';

const AdminChatList = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const {conversations, loading} = useSelector(state => state.chat);

  const [searchText, setSearchText] = useState('');
  const [filteredChat, setFilteredChat] = useState([]);

  // Fetch conversations on screen focus
  useFocusEffect(
    useCallback(() => {
      dispatch(getConversations());
    }, []),
  );

  // Update filtered list when conversations change
  useEffect(() => {
    if (searchText.trim()) {
      handleSearch(searchText);
    } else {
      setFilteredChat(conversations || []);
    }
  }, [conversations]);

  const handleSearch = text => {
    setSearchText(text);
    if (!text.trim()) {
      setFilteredChat(conversations || []);
      return;
    }
    const filtered = (conversations || []).filter(conv => {
      const otherParticipant = conv.participants?.find(
        p => p._id !== user?._id,
      );
      return otherParticipant?.username
        ?.toLowerCase()
        .includes(text.toLowerCase());
    });
    setFilteredChat(filtered);
  };

  const handleChatPress = conversation => {
    // Find the other participant (not admin)
    const otherParticipant = conversation.participants?.find(
      p => p._id !== user?._id,
    );

    navigation.navigate('AdminChatScreen', {
      conversationId: conversation._id,
      participantName: otherParticipant?.username || 'User',
      participantRole: conversation.roomType || otherParticipant?.role || 'customer',
      participantImage: otherParticipant?.profilepic || null,
      participantId: otherParticipant?._id,
    });
  };

  const getInitials = name => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTime = dateStr => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const renderChatItem = ({item}) => {
    const otherParticipant = item.participants?.find(
      p => p._id !== user?._id,
    );
    const userName = otherParticipant?.username || 'Unknown User';
    const userRole = item.roomType || otherParticipant?.role || 'customer';
    const profilePic = otherParticipant?.profilepic;

    return (
      <TouchableOpacity
        style={styles.chatCard}
        onPress={() => handleChatPress(item)}
        activeOpacity={0.7}>
        <View style={styles.chatCardContent}>
          {/* User Avatar */}
          <View style={styles.avatarContainer}>
            {item.roomType === 'seller' ? (
              <View style={[styles.userAvatar, styles.avatarPlaceholder, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
                <Text style={{ fontSize: RF(18) }}>🏪</Text>
              </View>
            ) : profilePic ? (
              <Image
                source={{uri: profilePic}}
                style={styles.userAvatar}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.userAvatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarInitials}>
                  {getInitials(userName)}
                </Text>
              </View>
            )}
            {/* Role badge */}
            <View
              style={[
                styles.roleBadge,
                {
                  backgroundColor:
                    userRole === 'seller'
                      ? colors.sellerWarning
                      : colors.sellerAccent,
                },
              ]}>
              <Text style={styles.roleBadgeText}>
                {userRole === 'seller' ? 'S' : 'U'}
              </Text>
            </View>
          </View>

          {/* Chat Info */}
          <View style={styles.chatInfoContainer}>
            <View style={styles.chatHeaderRow}>
              <Text style={styles.userName} numberOfLines={1}>
                {userName}
              </Text>
              <Text style={styles.timestamp}>
                {formatTime(item.lastMessageAt || item.updatedAt)}
              </Text>
            </View>
            <View style={styles.lastMessageRow}>
              <Text style={styles.lastMessage} numberOfLines={1}>
                {item.lastMessage || 'No messages yet'}
              </Text>
              <View
                style={[
                  styles.roleTag,
                  {
                    backgroundColor:
                      userRole === 'seller'
                        ? 'rgba(245, 158, 11, 0.1)'
                        : 'rgba(6, 182, 212, 0.1)',
                  },
                ]}>
                <Text
                  style={[
                    styles.roleTagText,
                    {
                      color:
                        userRole === 'seller'
                          ? colors.sellerWarning
                          : colors.sellerAccent,
                    },
                  ]}>
                  {userRole}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.sellerBg} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Messages</Text>
            <Text style={styles.headerSubtitle}>
              {(conversations || []).length} conversation
              {(conversations || []).length !== 1 ? 's' : ''}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('AdminProfile')}
            style={styles.profileIcon}>
            <UserIcon width={wp('8%')} height={wp('8%')} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search
            width={wp('5%')}
            height={wp('5%')}
            style={styles.searchIcon}
          />
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
        {loading && (conversations || []).length === 0 ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.sellerPrimary} />
            <Text style={styles.loadingText}>Loading conversations...</Text>
          </View>
        ) : filteredChat.length > 0 ? (
          <FlatList
            data={filteredChat}
            renderItem={renderChatItem}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: hp('2%')}}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <BubblesIcon
              width={wp('15%')}
              height={wp('15%')}
              style={{marginBottom: hp('2%')}}
            />
            <Text style={styles.emptyTitle}>
              {searchText ? 'No Results Found' : 'No Messages Yet'}
            </Text>
            <Text style={styles.emptyText}>
              {searchText
                ? 'Try searching with a different name'
                : 'When users or sellers message you, conversations will appear here'}
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
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: fontSize.mediumLarge,
    fontWeight: '700',
    color: colors.sellerText,
  },
  headerSubtitle: {
    fontSize: fontSize.extraSmall,
    color: colors.sellerSubText,
    marginTop: hp('0.2%'),
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
    marginVertical: hp('0.5%'),
    backgroundColor: colors.sellerCard,
    borderRadius: radius.radius3,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    borderWidth: 1,
    borderColor: colors.sellerBorder,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
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
  avatarPlaceholder: {
    backgroundColor: colors.sellerPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    color: colors.white,
    fontSize: fontSize.small,
    fontWeight: '700',
  },
  roleBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: wp('5%'),
    height: wp('5%'),
    borderRadius: wp('2.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.sellerCard,
  },
  roleBadgeText: {
    color: colors.white,
    fontSize: RF(8),
    fontWeight: '700',
  },
  chatInfoContainer: {
    flex: 1,
  },
  chatHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('0.4%'),
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
  lastMessageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    flex: 1,
    fontSize: fontSize.avgSmall,
    color: colors.sellerSubText,
  },
  roleTag: {
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.2%'),
    borderRadius: radius.radius2,
    marginLeft: wp('2%'),
  },
  roleTagText: {
    fontSize: RF(10),
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: hp('1%'),
    fontSize: fontSize.avgSmall,
    color: colors.sellerSubText,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('10%'),
  },
  emptyTitle: {
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.sellerText,
    marginBottom: hp('0.5%'),
  },
  emptyText: {
    fontSize: fontSize.avgSmall,
    color: colors.sellerSubText,
    textAlign: 'center',
    lineHeight: RF(20),
  },
});

export default AdminChatList;
