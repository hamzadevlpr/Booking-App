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
import { authBaseStyles } from './style';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUpScreen = ({ navigation }: Props) => {
    const insets = useSafeAreaInsets();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState(false);


    const handleGoogleSignIn = async () => {
        setSocialLoading(true);
        try {
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();

            // Create a Firebase credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign in with Firebase
            const userCredential = await auth().signInWithCredential(googleCredential);

            console.log('Firebase User:', userCredential.user);

            // Navigate after successful login
            navigation.replace('Main');

        } catch (error: any) {
            console.log('Google Sign-In error:', error);
            Alert.alert('Error', 'Google Sign-In failed');
        } finally {
            setSocialLoading(false);
        }
    };

    const handleFacebookSignIn = async () => {
        setSocialLoading(true);
        try {
            // Launch Facebook login
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
                console.log('User cancelled the login');
                setSocialLoading(false);
                return;
            }

            // Get Facebook access token
            const data = await AccessToken.getCurrentAccessToken();
            if (!data) throw new Error('Failed to get access token');

            // Create Firebase credential
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

            // Sign in with Firebase
            const userCredential = await auth().signInWithCredential(facebookCredential);

            console.log('Firebase User:', userCredential.user);

            // Navigate to Main screen
            navigation.replace('Main');
        } catch (error) {
            console.log('Facebook Sign-In error:', error);
            Alert.alert('Error', 'Facebook Sign-In failed');
        } finally {
            setSocialLoading(false);
        }
    };

    const handleSignUp = async () => {
        setLoading(true);
        try {
            // await api.signup({ fullName, email, password });
            setTimeout(() => {
                navigation.replace('Main');
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

                <Text style={authBaseStyles.title}>Create Account</Text>
                <Text style={authBaseStyles.subtitle}>
                    Please fill the form to create an account
                </Text>

                {/* Form */}
                <View style={authBaseStyles.formContainer}>
                    {/* Full Name */}
                    <View style={authBaseStyles.fieldWrapper}>
                        <Text style={authBaseStyles.label}>Full Name</Text>
                        <TextInput
                            style={authBaseStyles.input}
                            placeholder="Enter your name"
                            placeholderTextColor="#999"
                            value={fullName}
                            onChangeText={setFullName}
                        />
                    </View>

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
                                placeholderTextColor="#999"
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
                                    color="#000"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Create Account Button */}
                <LoadingButton
                    title="Sign Up"
                    loading={loading}
                    onPress={handleSignUp}
                    style={authBaseStyles.ctaButton}
                />
                <View style={authBaseStyles.altPromptRow}>
                    <Text style={authBaseStyles.altPromptText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')} activeOpacity={0.8}>
                        <Text style={authBaseStyles.altPromptLink}>Sign In</Text>
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
                    <TouchableOpacity style={authBaseStyles.socialButton} onPress={handleFacebookSignIn} disabled={socialLoading}>
                        {socialLoading ? (
                            <ActivityIndicator color="#000" />
                        ) : (   
                            <Image
                                style={authBaseStyles.socialIcon}
                                source={{ uri: 'https://img.icons8.com/color/48/facebook-new.png' }}
                            />
                        )}
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

export default SignUpScreen;