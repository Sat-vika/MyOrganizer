
import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CouponContext } from '../context/CouponContext';
import { useTheme } from '../context/ThemeContext';
import CouponCard from '../components/CouponCard';
import SearchBar from '../components/SearchBar';
import ThemeToggleButton from '../components/ThemeToggleButton';
import { useNavigation } from '@react-navigation/native';
//import DateTimePicker from '@react-native-community/datetimepicker';


const ViewCouponsScreen = () => {
  const { coupons, deleteCoupon } = useContext(CouponContext);
  const { dark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [showExpired, setShowExpired] = useState(false);
  const [sortOption, setSortOption] = useState('expiryAsc');

  const now = new Date();

  const handleDelete = (id) => deleteCoupon(id);

 
  const navigation = useNavigation();

  const handleEdit = (coupon) => {
    navigation.navigate('EditCoupon', { coupon });
  };
  
  const filteredCoupons = coupons.filter((coupon) => {
    if (!coupon) return false;

    const isExpired = new Date(coupon.expiryDate) < now;
    if (!showExpired && isExpired) return false;

    const text = `${coupon.app} ${coupon.code} ${coupon.description}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  const sortedCoupons = [...filteredCoupons].sort((a, b) => {
    if (sortOption === 'expiryAsc') {
      return new Date(a.expiryDate) - new Date(b.expiryDate);
    } else if (sortOption === 'expiryDesc') {
      return new Date(b.expiryDate) - new Date(a.expiryDate);
    } else if (sortOption === 'newest') {
      return new Date(b.timestamp) - new Date(a.timestamp);
    }
    return 0;
  });

  const groupedCoupons = sortedCoupons.reduce((groups, coupon) => {
    const appName = coupon.app || 'Other';
    if (!groups[appName]) groups[appName] = [];
    groups[appName].push(coupon);
    return groups;
  }, {});

  const renderGroupedCoupons = () => {
    return Object.entries(groupedCoupons).map(([app, appCoupons]) => (
      <View key={app} style={styles.groupContainer}>
        <Text style={[styles.groupTitle, { color: dark ? '#4dd0e1' : '#4a90e2' }]}>{app}</Text>
        {appCoupons.map((coupon) => {
          const isExpired = new Date(coupon.expiryDate) < now;
          return (
            <View key={coupon.id}>
              <CouponCard item={coupon} onDelete={handleDelete} onEdit={handleEdit} />
              {isExpired && showExpired && (
                <Text style={[styles.expiredLabel, { color: dark ? '#f88' : '#b00' }]}>
                  ⚠️ Expired
                </Text>
              )}
            </View>
          );
        })}
      </View>
    ));
  };

  return (
    <FlatList
      data={[{ key: 'dummy' }]}
      renderItem={() => renderGroupedCoupons()}
      keyExtractor={(item) => item.key}
      ListHeaderComponent={
        <View>
          <ThemeToggleButton />
          <SearchBar searchTerm={searchTerm} onChange={setSearchTerm} />

          <View style={styles.toggleRow}>
            <Text style={{ color: dark ? '#fff' : '#000' }}>Show Expired Coupons</Text>
            <Switch value={showExpired} onValueChange={setShowExpired} />
          </View>

          <View style={styles.sortRow}>
            <Text style={{ color: dark ? '#fff' : '#000', marginRight: 8 }}>Sort By:</Text>
            <Picker
              selectedValue={sortOption}
              style={{ flex: 1, color: dark ? '#fff' : '#000' }}
              onValueChange={(itemValue) => setSortOption(itemValue)}
              dropdownIconColor={dark ? '#fff' : '#000'}
            >
              <Picker.Item label="Expiry (Soonest)" value="expiryAsc" />
              <Picker.Item label="Expiry (Latest)" value="expiryDesc" />
              <Picker.Item label="Newest First" value="newest" />
            </Picker>
          </View>

          <Text
            style={[
              styles.header,
              { color: dark ? '#fff' : '#000', backgroundColor: dark ? '#000' : '#fff' },
            ]}
          >
            Your Coupons
          </Text>
        </View>
      }
      contentContainerStyle={{ paddingBottom: 40 }}
      ListEmptyComponent={
        <Text style={{ color: dark ? '#aaa' : '#333', textAlign: 'center', marginTop: 40 }}>
          No coupons found.
        </Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  groupContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  expiredLabel: {
    fontSize: 14,
    fontWeight: '600',
    paddingLeft: 16,
    paddingTop: 2,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
});

export default ViewCouponsScreen;
