import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BellIcon from '../../assets/icons/bell-1.svg';
import EditIcon from '../../assets/icons/edit.svg';
import GlobeIcon from '../../assets/icons/globe.svg';
import HelpIcon from '../../assets/icons/help.svg';
import Infocon from '../../assets/icons/info.svg';
import SheildIcon from '../../assets/icons/sheild.svg';
import WalletIcon from '../../assets/icons/wallet.svg';

const ProfileScreen = ({ navigation }: any) => {
  const [logoutVisible, setLogoutVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.profileRow}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>Brooklyn Simmons</Text>
          <Text style={styles.username}>@Broklyn</Text>
        </View>
        <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('Personal')}>
          <EditIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 14 }} >
        <Text style={{ fontSize: 16, fontFamily: 'Poppins-Bold', color: '#cecece' }}>Settings</Text>
      </View>
      {/* Settings List */}
      <View style={styles.settings}>
        <SettingItem icon={WalletIcon} label="Your Card" />
        <SettingItem icon={SheildIcon} label="Security" />
        <SettingItem icon={BellIcon} label="Notification" />
        <SettingItem icon={GlobeIcon} label="Languages" />
        <SettingItem icon={Infocon} label="Help and Support" />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={() => setLogoutVisible(true)}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Logout Modal */}
      <Modal
        visible={logoutVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLogoutVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconWrap}>
              <HelpIcon width={90} height={90} />
            </View>
            <Text style={styles.modalTitle}>Are You Sure?</Text>
            <Text style={styles.modalDesc}>Do you want to log out ?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalLogoutBtn}>
                <Text style={styles.modalLogoutText}>Log Out</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setLogoutVisible(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

type SettingItemProps = {
  icon: React.FC<{
    width?: number;
    height?: number;
    fill?: string;
  }>;
  label: string;
};

const SettingItem: React.FC<SettingItemProps> = ({ icon: IconComponent, label }) => (
  <TouchableOpacity style={styles.settingItem}>
    <IconComponent width={24} height={24} />
    <Text style={styles.settingLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingTop: 24,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    gap: 14,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 10,
  },
  name: {
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
    color: '#0F1831',
  },
  username: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#8C95A8',
    marginTop: 2,
  },
  editBtn: {
    marginLeft: 'auto',
    padding: 6,
  },
  settings: {
    marginBottom: 30,
    gap: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F7',
    gap: 18,
  },
  settingLabel: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
  },
  logoutBtn: {
    marginTop: 18,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#F45B84',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15,24,49,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 28,
    alignItems: 'center',
    elevation: 8,
  },
  modalIconWrap: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  modalTitle: {
    fontSize: 19,
    fontFamily: 'Poppins-Bold',
    color: '#0F1831',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalDesc: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8C95A8',
    marginBottom: 22,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 16,
  },
  modalLogoutBtn: {
    borderWidth: 2,
    borderColor: '#F45B84',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 28,
    backgroundColor: '#fff',
  },
  modalLogoutText: {
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    color: '#F45B84',
  },
  modalCancelBtn: {
    borderWidth: 2,
    borderColor: '#2853AF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 28,
    backgroundColor: '#2853AF',
  },
  modalCancelText: {
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  form: {
    marginTop: 10,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#0F1831',
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#0F1831',
    marginBottom: 2,
  },
  saveBtn: {
    marginTop: 32,
    backgroundColor: '#F2F6FB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    opacity: 1,
  },
  saveBtnText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#BFC6D1',
  },
});

export default ProfileScreen;