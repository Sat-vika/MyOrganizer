import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const CouponCard = ({ item, onDelete, onEdit }) => {
  const { theme } = useTheme();

  const now = new Date();
  const expiry = new Date(item.expiryDate);
  const isExpired = expiry < now;
  const isExpiringSoon = !isExpired && (expiry - now) / (1000 * 60 * 60 * 24) <= 3; // within 3 days

  return (
    <TouchableOpacity
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
      onLongPress={() => onDelete(item.id)}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
      <Text style={{ color: theme.colors.text }}>Description: {item.description}</Text>
      <Text style={{ color: theme.colors.text }}>Code: {item.code}</Text>
      <Text style={{ color: theme.colors.text }}>Expiry: {item.expiryDate}</Text>
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

      <TouchableOpacity onPress={() => onEdit(item)} style={styles.editButton}>
        <Text style={{ color: theme.colors.text }}>Edit</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  badge: {
    marginTop: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  editButton: {
    marginTop: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
});

export default CouponCard;
