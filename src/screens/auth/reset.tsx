import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    StatusBar,
    Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SuccessModal from '../../components/SuccessModal';

type Props = NativeStackScreenProps<RootStackParamList, 'Reset'>;

const PRIMARY = '#2853AF';

const ResetScreen = ({ navigation }: Props) => {
    const insets = useSafeAreaInsets();
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSignUp = () => {
        // if (!password) {
        //     Alert.alert('Error', 'Please fill in all fields');
        //     return;
        // }
        // Add your signup logic here
        setShowSuccess(true);
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar barStyle="dark-content" />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.title}>Create a New Password</Text>
                <Text style={styles.subtitle}>
                    Enter your new password below to reset your account password.
                </Text>

                {/* Form */}
                <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Enter your password"
                            placeholderTextColor="#999"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Icon
                                name={showPassword ? 'eye-off' : 'eye-off-outline'}
                                size={20}
                                color="#000"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.fieldWrapper}>
                    <Text style={styles.label}>New Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Enter your new password"
                            placeholderTextColor="#999"
                            secureTextEntry={!showNewPassword}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setShowNewPassword(!showNewPassword)}
                        >
                            <Icon
                                name={showNewPassword ? 'eye-off' : 'eye-off-outline'}
                                size={20}
                                color="#000"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Create Account Button */}
                <TouchableOpacity style={styles.ctaButton} onPress={handleSignUp}>
                    <Text style={styles.ctaText}>Reset Password</Text>
                </TouchableOpacity>
                <View style={styles.altPromptRow}>
                    <Text style={styles.altPromptText}>Remember your password?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')} activeOpacity={0.8}>
                        <Text style={styles.altPromptLink}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <SuccessModal
                visible={showSuccess}
                title="Success"
                message={'Your password has been reset successfully!'}
                onPress={() => {
                    setShowSuccess(false);
                    navigation.replace('Main');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 24,
        paddingBottom: 40,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Poppins-Bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#666',
        marginBottom: 32,
    },
    formContainer: {
        marginBottom: 24,
    },
    fieldWrapper: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: '#000',
        marginBottom: 8,
    },
    input: {
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        backgroundColor: '#F5F5F5',
        color: '#000',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#000',
    },
    eyeButton: {
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ctaButton: {
        backgroundColor: PRIMARY,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 22,
    },
    ctaText: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Poppins-SemiBold',
    },
    altPromptRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        marginBottom: 26,
    },
    altPromptText: {
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
        color: '#858AA0',
    },
    altPromptLink: {
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
        color: PRIMARY,
    },
    orRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 20,
        paddingHorizontal: 6,
    },
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E6E8EE',
    },
    orText: {
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        color: '#9EA3B4',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 18,
        marginBottom: 28,
    },
    socialButton: {
        width: 64,
        height: 64,
        borderRadius: 12,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E7E9F1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialIcon: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
    termsText: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#8D91A3',
        lineHeight: 22,
        marginHorizontal: 10,
    },
    termsLink: {
        fontFamily: 'Poppins-SemiBold',
        color: '#444',
    },
});

export default ResetScreen;