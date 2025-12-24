import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Alert,
} from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import SuccessModal from '../../components/SuccessModal';

type Props = NativeStackScreenProps<RootStackParamList, 'OTP'>;

const PRIMARY = '#2853AF';

const OTPScreen = ({ navigation }: Props) => {
    const insets = useSafeAreaInsets();
    const [otpCode, setOtpCode] = useState('');
    const otpRef = useRef<any>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (code: string) => {
        const digits = code.replace(/\D/g, '').slice(0, 4);
        setOtpCode(digits);
    };

    useEffect(() => {
        const checkClipboard = async () => {
            const text = await Clipboard.getString();
            if (/^\d{4}$/.test(text)) {
                setOtpCode(text);
                otpRef.current?.focus?.();
                setShowSuccess(true); 
            }
        };
        checkClipboard();
    }, []);

    const handleContinue = () => {
        console.log('OTP Code:', otpCode); 
        if (otpCode.length !== 4) {
            Alert.alert('Error', 'Please enter the complete OTP');
            return;
        }
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

                <Text style={styles.title}>Enter OTP</Text>
                <Text style={styles.subtitle}>
                    We have just sent you 4 digit code via your email{'\n'}example@gmail.com
                </Text>

                {/* OTP Input Fields */}
                <View style={styles.otpSection}>
                    <OtpInputs
                        ref={otpRef}
                        numberOfInputs={4}
                         handleChange={setOtpCode} 
                        value={otpCode}
                        style={styles.otpInputsWrapper}
                        inputContainerStyles={styles.otpInputContainer}
                        inputStyles={styles.customOtpInput}
                        focusStyles={styles.otpInputFocused}
                        autofillFromClipboard
                    />
                </View>

                {/* Continue Button */}
                <TouchableOpacity style={styles.ctaButton} onPress={handleContinue}>
                    <Text style={styles.ctaText}>Continue</Text>
                </TouchableOpacity>

                {/* Resend Code */}
                <View style={styles.resendRow}>
                    <Text style={styles.resendText}>Didn't receive code?</Text>
                    <TouchableOpacity onPress={() => Alert.alert('Resend', 'OTP resent to your email')} activeOpacity={0.8}>
                        <Text style={styles.resendLink}>Resend Code</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <SuccessModal
                visible={showSuccess}
                title="Success"
                message={'Your OTP has been verified successfully!'}
                onPress={() => {
                    setShowSuccess(false);
                    navigation.replace('Reset');
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
        paddingVertical: 16,
        paddingBottom: 28,
        justifyContent: 'center',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Poppins-Bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#7B7F8B',
        marginBottom: 32,
        lineHeight: 20,
    },
    otpSection: {
        marginBottom: 32,
    },
    otpInputsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    otpInputContainer: {
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#D6DDE7',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    customOtpInput: {
        width: 60,
        height: 60,
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        color: '#000',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    otpInputFocused: {
        borderColor: PRIMARY,
    },
    ctaButton: {
        backgroundColor: PRIMARY,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 20,
    },
    ctaText: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Poppins-SemiBold',
    },
    resendRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
    },
    resendText: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#7B7F8B',
    },
    resendLink: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: PRIMARY,
    },
});

export default OTPScreen;