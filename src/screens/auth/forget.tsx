import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    Alert,
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
import { authBaseStyles } from './style';

type Props = NativeStackScreenProps<RootStackParamList, 'Forget'>;

const ForgetScreen = ({ navigation }: Props) => {
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('');

    const handleSignUp = () => {
        if (!email) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        // Add your signup logic here
        navigation.replace('Main');
    };

    return (
        <View style={[authBaseStyles.container, { paddingTop: insets.top }]}>
            <StatusBar barStyle="dark-content" />

            <ScrollView contentContainerStyle={authBaseStyles.scrollContent}>
                {/* Header */}
                <TouchableOpacity style={authBaseStyles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={authBaseStyles.title}>Reset Password</Text>
                <Text style={authBaseStyles.subtitle}> 
                    Enter your email address below to receive a link to reset your password.
                </Text>

                {/* Form */}
                <View style={authBaseStyles.formContainer}>
                    {/* Email */}
                    <View style={authBaseStyles.fieldWrapper}>
                        <Text style={authBaseStyles.label}>E-mail</Text>
                        <TextInput
                            style={authBaseStyles.input}
                            placeholder="Enter your email"
                            placeholderTextColor="#999"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                </View>

                {/* Create Account Button */}
                <TouchableOpacity style={authBaseStyles.ctaButton} onPress={handleSignUp}>
                    <Text style={authBaseStyles.ctaText}>Reset Password</Text>
                </TouchableOpacity>
                <View style={authBaseStyles.altPromptRow}>
                    <Text style={authBaseStyles.altPromptText}>Remember your password?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')} activeOpacity={0.8}>
                        <Text style={authBaseStyles.altPromptLink}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default ForgetScreen;