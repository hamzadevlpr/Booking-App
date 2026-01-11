import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from '../../App';
import SuccessModal from '../../components/SuccessModal';
import { ResetStyles } from './style';

type Props = NativeStackScreenProps<RootStackParamList, 'Reset'>;

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
        <View style={[ResetStyles.container, { paddingTop: insets.top }]}>
            <StatusBar barStyle="dark-content" />

            <ScrollView contentContainerStyle={ResetStyles.scrollContent}>
                {/* Header */}
                <TouchableOpacity style={ResetStyles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={ResetStyles.title}>Create a New Password</Text>
                <Text style={ResetStyles.subtitle}>
                    Enter your new password below to reset your account password.
                </Text>

                {/* Form */}
                <View style={ResetStyles.fieldWrapper}>
                    <Text style={ResetStyles.label}>Password</Text>
                    <View style={ResetStyles.passwordContainer}>
                        <TextInput
                            style={ResetStyles.passwordInput}
                            placeholder="Enter your password"
                            placeholderTextColor="#999"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            style={ResetStyles.eyeButton}
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
                <View style={ResetStyles.fieldWrapper}>
                    <Text style={ResetStyles.label}>New Password</Text>
                    <View style={ResetStyles.passwordContainer}>
                        <TextInput
                            style={ResetStyles.passwordInput}
                            placeholder="Enter your new password"
                            placeholderTextColor="#999"
                            secureTextEntry={!showNewPassword}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <TouchableOpacity
                            style={ResetStyles.eyeButton}
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
                <TouchableOpacity style={ResetStyles.ctaButton} onPress={handleSignUp}>
                    <Text style={ResetStyles.ctaText}>Reset Password</Text>
                </TouchableOpacity>
                <View style={ResetStyles.altPromptRow}>
                    <Text style={ResetStyles.altPromptText}>Remember your password?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')} activeOpacity={0.8}>
                        <Text style={ResetStyles.altPromptLink}>Sign In</Text>
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


export default ResetScreen;