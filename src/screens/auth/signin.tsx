import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    StatusBar,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingButton from '../../components/LoadingButton';
import { authBaseStyles, signInStyles } from './style';
import { COLORS } from '../../theme/theme';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignInScreen = ({ navigation }: Props) => {
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const [socialLoading, setSocialLoading] = useState(false);


    GoogleSignin.configure({
        webClientId: '725265368829-nk8khhrb0oof47ttnnkmurjr4fsnem74.apps.googleusercontent.com',
        offlineAccess: false,
    });

    const handleGoogleSignIn = async () => {
        setSocialLoading(true);
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('User Info:', userInfo);

            // Example: navigate after success
            navigation.replace('Main');
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User cancelled the login flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Sign in in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play services not available');
            } else {
                console.log('Some other error:', error);
                Alert.alert('Error', 'Google Sign-In failed');
            }
        } finally {
            setSocialLoading(false);
        }
    };

    const handleSignIn = async () => {
        setLoading(true);
        try {
            // await api.login({ email, password });
            setTimeout(() => {
                navigation.replace('OTP');
            }, 1500);
        } catch (err) {
            Alert.alert('Error', 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[authBaseStyles.container, { paddingTop: insets.top }]}>
            <StatusBar barStyle="dark-content" />

            <ScrollView contentContainerStyle={authBaseStyles.scrollContent}>
                {/* Header */}
                <TouchableOpacity style={authBaseStyles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={authBaseStyles.title}>Let's Sign You In</Text>
                <Text style={authBaseStyles.subtitle}>
                    Welcome back, you've been missed!
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

                    {/* Password */}
                    <View style={authBaseStyles.fieldWrapper}>
                        <Text style={authBaseStyles.label}>Password</Text>
                        <View style={authBaseStyles.passwordContainer}>
                            <TextInput
                                style={authBaseStyles.passwordInput}
                                placeholder="Enter your password"
                                placeholderTextColor={COLORS.MUTED}
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity
                                style={authBaseStyles.eyeButton}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Icon
                                    name={showPassword ? 'eye-off' : 'eye-off-outline'}
                                    size={20}
                                    color={COLORS.TEXT}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Remember Me / Forgot Password */}
                <View style={signInStyles.rememberRow}>
                    <TouchableOpacity
                        style={signInStyles.rememberLeft}
                        onPress={() => setRememberMe(!rememberMe)}
                        activeOpacity={0.7}
                    >
                        <View style={[signInStyles.rememberCircle, rememberMe && signInStyles.rememberCircleChecked]}>
                            {rememberMe && <View style={signInStyles.rememberCircleInner} />}
                        </View>
                        <Text style={signInStyles.rememberText}>Remember Me</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Forget')}
                        activeOpacity={0.8}
                    >
                        <Text style={signInStyles.forgotText}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>

                {/* Create Account Button */}
                <View style={authBaseStyles.ctaButton}>
                    <LoadingButton
                        title="Sign In"
                        loading={loading}
                        onPress={handleSignIn}
                    />
                </View>

                <View style={authBaseStyles.altPromptRow}>
                    <Text style={authBaseStyles.altPromptText}>Don’t have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')} activeOpacity={0.8}>
                        <Text style={authBaseStyles.altPromptLink}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                {/* Social Login */}
                <View style={authBaseStyles.orRow}>
                    <View style={authBaseStyles.orLine} />
                    <Text style={authBaseStyles.orText}>Or Sign In with</Text>
                    <View style={authBaseStyles.orLine} />
                </View>

                <View style={authBaseStyles.socialContainer}>
                    <TouchableOpacity
                        style={authBaseStyles.socialButton}
                        onPress={handleGoogleSignIn}
                        disabled={socialLoading}
                    >
                        {socialLoading ? (
                            <ActivityIndicator color="#000" />
                        ) : (
                            <Image
                                style={authBaseStyles.socialIcon}
                                source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }}
                            />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={authBaseStyles.socialButton}>
                        <Image
                            style={authBaseStyles.socialIcon}
                            source={{ uri: 'https://img.icons8.com/ios-filled/50/mac-os.png' }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={authBaseStyles.socialButton}>
                        <Image
                            style={authBaseStyles.socialIcon}
                            source={{ uri: 'https://img.icons8.com/color/48/facebook-new.png' }}
                        />
                    </TouchableOpacity>
                </View>

                {/* Terms */}
                <Text style={authBaseStyles.termsText}>
                    By signing up you agree to our{' '}
                    <Text style={authBaseStyles.termsLink}>Terms</Text>
                    {'\n'}and <Text style={authBaseStyles.termsLink}>Conditions of Use</Text>
                </Text>
            </ScrollView>
        </View>
    );
};


export default SignInScreen;