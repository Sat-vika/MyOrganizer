import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const CouponCard = ({ item, onDelete, onEdit }) => {
  const { theme } = useTheme();

  const now = new Date();
  const expiry = new Date(item.expiryDate);
  const isExpired = expiry < now;
  const isExpiringSoon =
    !isExpired && (expiry - now) / (1000 * 60 * 60 * 24) <= 2;

  const confirmDelete = () => {
    Alert.alert(
      'Delete Coupon',
      `Are you sure you want to delete "${item.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(item.id) },
      ]
    );
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderLeftColor: isExpired
            ? '#e53935'
            : isExpiringSoon
            ? '#fbc02d'
            : theme.colors.primary,
          borderLeftWidth: 4,
        },
      ]}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {item.title}
      </Text>
      <Text style={{ color: theme.colors.text }}>
        Description: {item.description}
      </Text>
      <Text style={{ color: theme.colors.text }}>Code: {item.code}</Text>
      <Text style={{ color: theme.colors.text }}>
        Expiry: {item.expiryDate}
      </Text>
      <Text style={{ color: theme.colors.text, fontSize: 12 }}>
        Added on: {new Date(item.timestamp).toLocaleString()}
      </Text>

      {isExpired && (
        <Text style={[styles.badge, { backgroundColor: '#e57373', color: '#fff' }]}>
          ❌ Expired
        </Text>
      )}
      {isExpiringSoon && (
        <Text style={[styles.badge, { backgroundColor: '#fff59d', color: '#000' }]}>
          ⏰ Expiring Soon
        </Text>
      )}

      <View style={styles.actionRow}>
        <TouchableOpacity onPress={() => onEdit(item)} style={styles.actionButton}>
          <Text style={styles.actionText}>✏️ Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={confirmDelete} style={[styles.actionButton, styles.deleteButton]}>
          <Text style={styles.actionText}>🗑️ Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
  },
  badge: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    fontWeight: '600',
    overflow: 'hidden',
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#ddd',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#ffcccc',
  },
  actionText: {
    fontWeight: '600',
    color: '#333',
  },
});

export default CouponCard;
