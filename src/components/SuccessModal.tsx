import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PRIMARY = '#2853AF';

interface Props {
  visible: boolean;
  title: string;
  message: string;
  buttonLabel?: string;
  onPress: () => void;
}

const SuccessModal: React.FC<Props> = ({ visible, title, message, buttonLabel = 'Continue', onPress }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconWrapper}>
            <Icon name="check" size={32} color="#fff" />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.85}>
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#51B56D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#111',
    marginBottom: 8,
  },
  message: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#6B6F80',
    lineHeight: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: PRIMARY,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default SuccessModal;
