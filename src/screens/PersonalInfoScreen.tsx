import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import EditIcon from '../assets/icons/edit.svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PersonalInfoScreen = ({ navigation }: { navigation: any }) => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Hamza',
    lastName: 'Lipshutz',
    email: 'HamzaLipshutz@gmail.com',
    phone: '+1 9003430',
  });

  const handleChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setEditMode(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Icon name="arrow-left" size={24} color="#0F1831" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Info</Text>
        <TouchableOpacity onPress={() => setEditMode(e => !e)}>
          <EditIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={profile.firstName}
          editable={editMode}
          placeholder="First Name"
          placeholderTextColor="#BFC6D1"
          onChangeText={text => handleChange('firstName', text)}
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={profile.lastName}
          editable={editMode}
          placeholder="Last Name"
          placeholderTextColor="#BFC6D1"
          onChangeText={text => handleChange('lastName', text)}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={profile.email}
          editable={editMode}
          placeholder="Email"
          placeholderTextColor="#BFC6D1"
          keyboardType="email-address"
          onChangeText={text => handleChange('email', text)}
        />
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={profile.phone}
          editable={editMode}
          placeholder="Phone"
          placeholderTextColor="#BFC6D1"
          keyboardType="phone-pad"
          onChangeText={text => handleChange('phone', text)}
        />
        <TouchableOpacity style={styles.saveBtn} disabled={!editMode} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingTop: 60,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  headerTitle: {
    fontSize: 19,
    fontFamily: 'Poppins-Bold',
    color: '#0F1831',
    textAlign: 'center',
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

export default PersonalInfoScreen;
